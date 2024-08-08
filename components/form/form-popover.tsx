"use client";
import { toast } from "sonner";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAction } from "@/hooks/use-action";
import { createBoard } from "@/actions/create-board";
import { FormInput } from "./form-input";
import { FormSubmit } from "./form-submit";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { ElementRef, useRef } from "react";
import { FormPicker } from "./form-picker";
import { useRouter } from "next/navigation";
import { useProModal } from "@/hooks/use-pro-modal";

interface FormPopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "bottom" | "top";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

export const FormPopover = ({ children, side = "bottom", align, sideOffset = 0 }: FormPopoverProps) => {
  const proModal = useProModal();

  const router = useRouter();
  const closeRef = useRef<ElementRef<"button">>(null);
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      toast.success("Board Created!");
      closeRef.current?.click();
      router.push(`/board/${data.id}`);
    },
    onError: (error) => {
      toast.error(error);
      proModal.onOpen();
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;

    console.log({ image });

    execute({ title, image });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent align={align} className="w-80 pt-3" side={side} sideOffset={sideOffset}>
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">Create Board</div>
        <PopoverClose ref={closeRef} asChild>
          <Button variant="ghost" className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600">
            <X className="h-3 w-3" />
          </Button>
        </PopoverClose>
        <form action={onSubmit} className="space-y-4">
          <div className="space-y-4">
            <FormPicker id="image" errors={fieldErrors} />
            <FormInput id="title" label="Board title" type="text" errors={fieldErrors} />
            <FormSubmit className="w-full">Create</FormSubmit>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};
