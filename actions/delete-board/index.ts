"use server";

import { db } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { revalidatePath } from "next/cache";
import { DeleteBoard } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";
import { redirect } from "next/navigation";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { decreaseAvailableCount } from "@/lib/org-limit";
import { checkSubscription } from "@/lib/subscription";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized.",
    };
  }

  const isPro = await checkSubscription();

  const { id } = data;
  let board;

  try {
    board = await db.board.delete({
      where: {
        id,
        orgId,
      },
    });

    if (!isPro) {
      await decreaseAvailableCount();
    }

    await createAuditLog({
      entityId: board.id,
      entityTitle: board.title,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.CREATE,
    });
  } catch (error) {
    return {
      error: "Failedto delete",
    };
  }

  revalidatePath(`/organization/${orgId}`);
  redirect("/organization/[orgId]");
};
export const deleteBoard = createSafeAction(DeleteBoard, handler);
