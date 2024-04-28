"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { SubmitButton } from "./Submit";
import { LoaderSpinner } from "./LoaderSpinner";

import Errors from "./Errors";

const loginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(3, "Password must be at least 3 characters long"),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;

interface LoginFormProps {
  action: (data: LoginFormSchema) => void;
}

export const LoginForm = ({ action }: LoginFormProps) => {
  const { register, handleSubmit, formState, getValues } =
    useForm<LoginFormSchema>({
      resolver: zodResolver(loginFormSchema),
    });

  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);

  const handleBlur = (field: "email" | "password") => {
    if (field === "email") setTouchedEmail(true);
    else setTouchedPassword(true);
  };

  const getErrorsFormatted = (field: "email" | "password") => {
    const values = getValues();
    const res = loginFormSchema.safeParse(values);

    if (!res.success) {
      const errors = res.error.format();

      if (Array.isArray(errors[field]?._errors)) return errors[field]?._errors;
    }

    if (field === "email" && touchedEmail) {
      setTouchedEmail(false);
      return [];
    }

    setTouchedPassword(false);
    return [];
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(action)}
        className="flex items-center gap-2 flex-col w-full"
      >
        <div className="w-full h-20">
          <label className="block text-sm text-gray-600">E-mail</label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className={`w-full p-2 rounded shadow mt-1 text-gray-500`}
            onBlur={() => handleBlur("email")}
          />
          {touchedEmail && <Errors errors={getErrorsFormatted("email")} />}
        </div>
        <div className="w-full h-20">
          <label className="block text-sm text-gray-600 mt-2">Password</label>
          <input
            type="password"
            id="password"
            {...register("password")}
            className={`w-full p-2 rounded shadow mt-1 text-gray-500`}
            onBlur={() => handleBlur("password")}
          />
          {touchedPassword && (
            <Errors errors={getErrorsFormatted("password")} />
          )}
        </div>

        <SubmitButton
          disabled={!formState.isValid || formState.isSubmitting}
          className={`
          text-white 
          p-2 
          rounded 
          w-full 
          mt-4 
          h-12 
          flex 
          justify-center 
          items-center
          hover:bg-green-600
          ${
            !formState.isValid || formState.isSubmitting
              ? "bg-green-400 text-gray-700"
              : "bg-green-500 text-black"
          }
          `}
        >
          {formState.isSubmitting ? <LoaderSpinner /> : <>Login</>}
        </SubmitButton>
      </form>
    </>
  );
};
