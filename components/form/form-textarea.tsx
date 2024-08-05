"use client";

import { KeyboardEventHandler, forwardRef } from "react";
import {cn} from "@/lib/utils";
import { Label } from "@/components/ui/label"; 
import { Textarea } from "@/components/ui/textarea";
import { FormErrors } from "@/components/form/form-errors";
import { useFormStatus } from "react-dom";

interface FormTextareaProps {
    id: string;
    name?: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    errors?: Record<string, string[] | undefined>;
    className?: string;
    onBlur?: () => void;
    onClick?: () => void;
    onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>;
    defaultValue?: string;
  }
  
export   const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
    (
      {
        id,
        label,
        placeholder,
        required,
        disabled,
        errors,
        onBlur,
        onClick,
        onKeyDown,
        className,
        defaultValue,
      }, ref) => {

const {pending} = useFormStatus();

        return (
            <div className="space-y-2 w-full">
              <div className="space-y-1 w-full">
                {label ? ( 
                  <Label
                    htmlFor={id}
                    className="text-sm font-semibold text-neutral-700"
                  >
                    {label}
                  </Label>
                ) : null}
                <Textarea
                onKeyDown={onKeyDown}
                onBlur={onBlur}
                onClick={onClick}
                ref={ref}
                required={required}
                placeholder={placeholder}
                name={id}
                  id={id}
                  disabled={pending || disabled}
                  className={cn(
                    "resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm",
                    className
                  )}
                  aria-describedby={`${id}-error`}
                  defaultValue={defaultValue}
                />
              </div>
              <FormErrors errors={errors} id={id} />
            </div>
          );
        }
      );
      
      FormTextarea.displayName = "FormTextarea";
      
      export default FormTextarea;