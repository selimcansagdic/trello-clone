"use server";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { CreateBoard } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } =  auth();

  if (!userId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title } = data;

  let board;
  try {
    board = await db.board.create({
      data: {
        title,
      },
    });

    revalidatePath(`api/boards/${board.id}`);
    return { data: board };
  } catch (error) {
    return {
      error: "Failed to create.",
    };
  }
};

export const createBoard = createSafeAction(CreateBoard, handler);
