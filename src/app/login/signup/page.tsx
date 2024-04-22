"use client";
import { useRouter } from "next/navigation";

import { ChevronLeft } from "lucide-react";

import { ToastAction } from "@radix-ui/react-toast";

import SignUpForm, { SignUpFormSchema } from "@/components/SignUpForm";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

export default function SignUp() {
  const router = useRouter();

  const { toast } = useToast();

  const createUserAction = async (form: SignUpFormSchema) => {
    const newUser = {
      name: form.name,
      cpf: form.cpf,
      type: form.type,
      email: form.email,
      password: form.password,
    };

    const res = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    const response = await res?.json();

    if (response?.status !== 200) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Error: " + response.message,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
        duration: 8000,
      });

      return;
    }

    router.push("/home");
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <div className="flex items-center mb-8">
            <Button
              variant="outline"
              size="icon"
              onClick={() => router.push("/login")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h1 className="flex-grow text-3xl text-center">Sign up</h1>
          </div>

          <SignUpForm action={createUserAction}></SignUpForm>

          <div className="text-center text-sm text-grey-dark mt-4">
            By signing up, you agree to the{" "}
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Privacy Policy
            </a>
          </div>
        </div>

        <div className="text-grey-dark mt-6">
          Already have an account?
          <a
            className="no-underline border-b border-blue text-blue"
            href="../login/"
          >
            Log in
          </a>
          .
        </div>
      </div>
    </div>
  );
}
