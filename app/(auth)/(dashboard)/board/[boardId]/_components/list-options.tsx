"use client";

import { List } from "@prisma/client";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, X } from "lucide-react";

interface ListOptionsProps {
  data: List;
  onAddCard: () => void;
}

export const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2 " variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start" className="px-0 pt-3 pb-3">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">List actions</div>
        <PopoverClose asChild>
          <Button className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600" variant="ghost">
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
};

export default ListOptions;
