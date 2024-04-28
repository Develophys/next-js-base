import { useForm } from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { SubmitButton } from "./Submit";
import { LoaderSpinner } from "./LoaderSpinner";
import { USER_TYPE } from "@/enums";

const signUpFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  confirmEmail: z.string().email(),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/),
  password: z.string().min(3),
  type: z.nativeEnum(USER_TYPE),
});

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;

interface SignUpFormProps {
  action: (data: SignUpFormSchema) => void; // eslint-disable-line
}

export default function SignUpForm({ action }: SignUpFormProps) {
  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(action)}
      className="flex items-center gap-2 flex-col w-full"
    >
      <div className="w-full">
        <label className="block text-sm text-gray-600">Name</label>
        <input
          type="name"
          id="name"
          {...register("name")}
          className="w-full p-2 rounded shadow mt-1 text-gray-500"
          placeholder="Maria da Silva"
        />
      </div>
      <div className="w-full">
        <label className="block text-sm text-gray-600 mt-2">CPF</label>
        <input
          type="cpf"
          id="cpf"
          {...register("cpf")}
          className="w-full p-2 rounded shadow mt-1 text-gray-500"
          placeholder="xxx.xxx.xxx-xx"
        />
      </div>
      <div className="w-full">
        <label className="block text-sm text-gray-600 mt-2">Type</label>
        <input
          type="type"
          id="type"
          {...register("type")}
          className="w-full p-2 rounded shadow mt-1 text-gray-500"
          placeholder="Teacher"
        />
      </div>
      <div className="w-full">
        <label className="block text-sm text-gray-600 mt-2">E-mail</label>
        <input
          type="email"
          id="email"
          {...register("email")}
          className="w-full p-2 rounded shadow mt-1 text-gray-500"
          placeholder="maria@email.com"
        />
      </div>
      <div className="w-full">
        <label className="block text-sm text-gray-600 mt-2">
          Confirm E-mail
        </label>
        <input
          type="confirmEmail"
          id="confirmEmail"
          {...register("confirmEmail")}
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
          placeholder="***"
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
        {isSubmitting ? <LoaderSpinner /> : <>Create Account</>}
      </SubmitButton>
    </form>
  );
}
