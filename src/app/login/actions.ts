import { signIn } from "next-auth/react";

import { LoginFormSchema } from "@/components/LoginForm";

export const loginAction = async (form: LoginFormSchema) => {
  const res = await signIn("credentials", {
    email: form.email,
    password: form.password,
    redirect: false,
  });

  if (!res?.ok) {
    // show toast with error
    return;
  }
};
