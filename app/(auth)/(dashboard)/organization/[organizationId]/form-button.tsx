import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export const FormButton = () => {
  const { pending } = useFormStatus();
  return (
  <Button disabled={pending} type="submit" className="flex flex-col items-center w-64 mt-4">
    Submit
    </Button>
    );
  
};
