"use server";

import { db } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { revalidatePath } from "next/cache";
import { UpdateCard } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized.",
    };
  }

  const { id, boardId, ...values } = data;
  let card;

  try {
    card = await db.card.update({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
      data: {
        ...values,
      },
    });
  } catch (error) {
    return {
      error: "Failedto update",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return {
    data: card,
  };
};
export const updateCard = createSafeAction(UpdateCard, handler);
