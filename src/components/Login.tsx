"use client";
import { signIn } from "next-auth/react";

import { useRouter } from "next/navigation";

import { LoginForm, LoginFormSchema } from "./LoginForm";
import { SignInGithubButton } from "./SignInGithubButton";

export const LoginComponent = () => {
  const router = useRouter();

  const loginAction = async (form: LoginFormSchema) => {
    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (!res?.ok) {
      // show toast with error
      return;
    }

    router.push("/products");
  };

  return (
    <div className="bg-white p-8 rounded shadow w-96">
      <h2 className="text-2xl mb-4 text-black">Sign-In</h2>

      <LoginForm action={loginAction} />

      <div className="flex justify-center mt-2">
        <SignInGithubButton />
      </div>
    </div>
  );
};
