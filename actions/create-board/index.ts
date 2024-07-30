// "use server";
// import { createSafeAction } from "@/lib/create-safe-action";
// import { db } from "@/lib/prismadb";
// import { auth } from "@clerk/nextjs/server";
// import { revalidatePath } from "next/cache";
// import { CreateBoard } from "./schema";
// import { InputType, ReturnType } from "./types";

// const handler = async (data: InputType): Promise<ReturnType> => {
//   const { userId, orgId } = auth();

//   if (!userId || !orgId) {
//     return {
//       error: "Unauthorized",
//     };
//   }

//   const { title, image } = data;

//   const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] = image.split("|");

//   if (!imageId || !imageThumbUrl || !imageFullUrl || !imageLinkHTML || !imageUserName) {
//     return {
//       error: "Missing fields. Faild to create board.",
//     };
//   }

//   let board;
//   try {
//     board = await db.board.create({
//       data: {
//         title,
//         orgId,
//         imageId,
//         imageThumbUrl,
//         imageFullUrl,
//         imageUserName,
//         imageLinkHTML,
//       },
//     });

//     revalidatePath(`api/board/${board.id}`);
//     return { data: board };
//   } catch (error) {
//     return {
//       error: "Failed to create.",
//     };
//   }
// };

// export const createBoard = createSafeAction(CreateBoard, handler);

"use server";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { CreateBoard } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title, image } = data;

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

    // Güncellenmiş revalidatePath yolu
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
