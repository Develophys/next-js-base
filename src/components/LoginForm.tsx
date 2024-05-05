import { useForm } from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { SubmitButton } from "./Submit";
import { LoaderSpinner } from "./LoaderSpinner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const loginFormSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
  password: z.string().min(3, "Password must be at least 3 characters long"),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;

interface LoginFormProps {
  action: (data: LoginFormSchema) => Promise<void>; // eslint-disable-line
}

export const LoginForm = ({ action }: LoginFormProps) => {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(action)}
        className="flex items-center gap-2 flex-col w-full"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="h-24 w-full">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="maria@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="h-24 w-full">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="***" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton
          disabled={!isValid || isSubmitting}
          className={`
          text-gray-700
            p-2
            rounded
            w-full
            mt-4
            h-12
            flex
            justify-center
            items-center
            hover:bg-green-600
            bg-green-400
            ${!isValid && "cursor-not-allowed"}
          `}
        >
          {isSubmitting ? <LoaderSpinner /> : <>Login</>}
        </SubmitButton>
      </form>
    </Form>
  );
};
