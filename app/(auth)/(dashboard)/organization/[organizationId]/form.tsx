"use client";

import { createBoard } from "@/actions/create-board";
import { useAction } from "@/hooks/use-action";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";
import FormErrors from "@/components/form/form-errors";

export const Form = () => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data, "Board created successfully");
    },
    onError: (error) => {
      console.error(error, "Error creating board");
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    console.log({ title });

    execute({ title });
  };

  return (
    <form action={onSubmit}>
      <div className="flex flex-col space-y-2 ">
        <FormInput label="Board Title" id="title" errors={fieldErrors} />
      </div>
      <FormSubmit variant="primary" className="mt-2">
        Save
      </FormSubmit>
    </form>
  );
};
