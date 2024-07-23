"use server";

import { db } from "@/lib/prismadb";
import { revalidatePath } from "next/cache";

export async function deleteBoard(id: string) {
  await db.board.delete({
    where: {
      id,
    },
  });

  revalidatePath("/organization/org_2iQ7qLje7DESW85DpgyPR1bqaK0");
}
