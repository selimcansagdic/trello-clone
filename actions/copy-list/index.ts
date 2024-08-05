// "use server";

// import { db } from "@/lib/prismadb";
// import { auth } from "@clerk/nextjs/server";
// import { InputType, ReturnType } from "./types";
// import { revalidatePath } from "next/cache";
// import { CopyList } from "./schema";
// import { createSafeAction } from "@/lib/create-safe-action";

// const handler = async (data: InputType): Promise<ReturnType> => {
//   const { userId, orgId } = auth();
//   if (!userId || !orgId) {
//     return {
//       error: "Unauthorized.",
//     };
//   }

//   const { title, id, boardId } = data;
//   let list;

//   try {
//     list = await db.list.update({
//       where: {
//         id,
//         boardId,
//         board: {
//           orgId,
//         },
//       },
//       data: {
//         title,
//       },
//     });
//   } catch (error) {
//     return {
//       error: "Failedto update",
//     };
//   }

//   revalidatePath(`/board/${boardId}`);
//   return {
//     data: list,
//   };
// };
// export const updateList = createSafeAction(UpdateList, handler);


"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/prismadb";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CopyList } from "./schema";


const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized.",
    };
  }

  const { id,boardId} = data;
  let list;
  
  try {
    const listToCopy = await db.list.findUnique({
      where: {
        boardId,
        id,
        board: {
          orgId,
        },
      },
      include: {
       
cards: true,
       
      },
    });
    if (!listToCopy) {
      return {
        error: "List not found.",
      };
    }

    const lastList = await db.list.findFirst({
 where:{boardId},
  orderBy:{order:"desc"},
  select:{order:true}
      });
const newOrder = lastList ? lastList.order + 1 : 0;

list = await db.list.create({
  data: {
    boardId: listToCopy.boardId,
    title: ` ${listToCopy.title}-Copy`,
    order: newOrder,
    cards: {
      createMany: {
        data: listToCopy.cards.map((card) => ({
          title: card.title,
          order: card.order, 
          description: card.description,
  }
        )),
      },
    },
  },  
  include: {
    cards: true,
  },
});


   
  } catch (error) {
    return {
      error: "Failed to copy list.",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: list };
};

export const copyList = createSafeAction(CopyList, handler);