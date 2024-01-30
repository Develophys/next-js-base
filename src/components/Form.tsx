"use client";

import React, { PropsWithChildren } from "react";
import { useFormState } from "react-dom";

type HTMLFormProps = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;

type FormProps = PropsWithChildren<
  Omit<HTMLFormProps, "action"> & {
    action: (prevState: any, formData: FormData) => Promise<any>;
  }
>;

export function Form(props: FormProps) {
  const [state, formAction] = useFormState(props.action, { message: null });

  return (
    <form {...props} action={formAction}>
      {props.children}

      {state?.error && (
        <div className="bg-red-400 text-white rounded p-2 my-3">
          {state.error}
        </div>
      )}
    </form>
  );
}
