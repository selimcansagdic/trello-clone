"use server";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { CreateBoard } from "./schema";
import { InputType, ReturnType } from "./types";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { incrementAvailableCount, hasAvaliableCount } from "@/lib/org-limit";
import { checkSubscription } from "@/lib/subscription";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const canCreate = await hasAvaliableCount();
  const isPro = await checkSubscription();

  if (!canCreate && !isPro) {
    return {
      error: "You have reached your limit of free boards. Please upgrade  to create more.",
    };
  }

  const { title, image } = data;

  const existingBoard = await db.board.findFirst({
    where: {
      title,
      orgId,
    },
  });

  if (existingBoard) {
    return {
      error: "A board with the same title already exists.",
    };
  }

  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] = image.split("|");

  if (!imageId || !imageThumbUrl || !imageFullUrl || !imageLinkHTML || !imageUserName) {
    return {
      error: "Missing fields. Failed to create board.",
    };
  }

  let board;
  try {
    board = await db.board.create({
      data: {
        title,
        orgId,
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageUserName,
        imageLinkHTML,
      },
    });
    if (!isPro) {
      await incrementAvailableCount();
    }
    await createAuditLog({
      entityId: board.id,
      entityTitle: board.title,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.CREATE,
    });
  } catch (error) {
    return {
      error: `Failed to create. `,
    };
  }
  revalidatePath(`/board/${board.id}`);
  return {
    data: board,
  };
};

export const createBoard = createSafeAction(CreateBoard, handler);
