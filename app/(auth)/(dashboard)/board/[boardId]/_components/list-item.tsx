"use client";

import { ListWithCards } from "@/types";
import { ListHeader } from "./list-header";

interface ListItemProps {
  index: number;
  data: ListWithCards;
}

export const ListItem = ({ data, index }: ListItemProps) => {
  return (
    <li className="shrink-0 h-full w-[272px] select-none">
      <div className="w-full rounded-md bg-[#f1f2f4] text-black shadow-md pb-2">
        <ListHeader data={data} />
      </div>
    </li>
  );
};
