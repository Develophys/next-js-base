import { signIn } from "next-auth/react";

import { LoginFormSchema } from "@/schemas/login-schema";

export const loginAction = async (form: LoginFormSchema) => {
  const res = await signIn("credentials", {
    email: form.email,
    password: form.password,
    redirect: false,
  });

  return res;
};
