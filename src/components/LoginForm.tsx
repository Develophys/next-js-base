import { useForm } from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { SubmitButton } from "./Submit";
import { LoaderSpinner } from "./LoaderSpinner";

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;

interface LoginFormProps {
  action: (data: LoginFormSchema) => void;
}

export const LoginForm = ({ action }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(action)}
      className="flex items-center gap-2 flex-col w-full"
    >
      <div className="w-full">
        <label className="block text-sm text-gray-600">E-mail</label>
        <input
          type="email"
          id="email"
          {...register("email")}
          className="w-full p-2 rounded shadow mt-1 text-gray-500"
        />
      </div>
      <div className="w-full">
        <label className="block text-sm text-gray-600 mt-2">Password</label>
        <input
          type="password"
          id="password"
          {...register("password")}
          className="w-full p-2 rounded shadow mt-1 text-gray-500"
        />
      </div>

      <SubmitButton
        disabled={!isValid || isSubmitting}
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
            !isValid || isSubmitting
              ? "bg-green-400 text-gray-700"
              : "bg-green-500 text-black"
          }
          `}
      >
        {isSubmitting ? <LoaderSpinner /> : <>Login</>}
      </SubmitButton>
    </form>
  );
};
