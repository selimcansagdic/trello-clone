import { z } from "zod";

export const UpdateCardOrder = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      order: z.number(),
      title: z.string(),
      createdAt: z.date().optional(),
      updatedAt: z.date().optional(),
      listId: z.string(),
    })
  ),
  boardId: z.string(),
});
