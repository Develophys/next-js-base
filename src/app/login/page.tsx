"use client";
import { useRouter } from "next/navigation";

import { LoginForm, LoginFormSchema } from "@/components/LoginForm";
import { SignInGithubButton } from "@/components/SignInGithubButton";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { loginAction } from "./actions";

function LoginPage() {
  const router = useRouter();

  const handleLoginAction = async (form: LoginFormSchema) => {
    await loginAction(form);

    router.push("/home");
  };

  return (
    <div className="m-2 h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-2xl mb-4 text-black">Sign-In</h2>

        <LoginForm action={handleLoginAction} />

        <div className="flex flex-col items-center mt-3">
          <span className="text-gray-500">OR</span>
        </div>

        <div className="flex justify-center mt-2">
          <SignInGithubButton />
        </div>

        <div className="flex flex-col items-center mt-4">
          <Separator />
          <div className="mt-2 flex items-center gap-2">
            <span className="text-gray-500 ">New here?</span>
            <Button
              className="
              h-8 
              bg-transparent 
              text-black 
              hover:bg-transparent 
              hover:text-zinc-600"
              onClick={() => router.push("/login/signup")}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
