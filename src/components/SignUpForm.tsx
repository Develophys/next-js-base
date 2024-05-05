import { ChangeEvent } from "react";

import { useForm } from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { SignUpFormSchema, signUpFormSchema } from "@/schemas/login-schema";

import { USER_TYPE } from "@/enums";

import { SubmitButton } from "./Submit";
import { LoaderSpinner } from "./LoaderSpinner";

import { Input } from "./ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ScrollArea } from "./ui/scroll-area";
import { formatCpfCnpj } from "@/lib/utils";

interface SignUpFormProps {
  action: (data: SignUpFormSchema) => void; // eslint-disable-line
}

export default function SignUpForm({ action }: SignUpFormProps) {
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      confirmPassword: "",
      cpfCnpj: "",
      email: "",
      password: "",
      type: USER_TYPE.STUDENT,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const cpfCnpjMask = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const formattedValue = formatCpfCnpj(value);

    form.setValue("cpfCnpj", formattedValue);
  };

  return (
    <ScrollArea className="h-[450px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(action)}
          className="flex items-center gap-2 flex-col w-full p-4 "
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="h-24 w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Maria da Silva"
                    {...field}
                    value={field.value}
                    className={`${
                      form.formState.errors.name && "border-red-400"
                    }`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cpfCnpj"
            render={({ field }) => (
              <FormItem className="h-24 w-full">
                <FormLabel>CPF/CNPJ</FormLabel>
                <FormControl onChange={cpfCnpjMask}>
                  <Input
                    placeholder="111.111.111-11"
                    {...field}
                    className={`${
                      form.formState.errors.cpfCnpj && "border-red-400"
                    }`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="h-24 w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="maria@email.com"
                    {...field}
                    className={`${
                      form.formState.errors.email && "border-red-400"
                    }`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="h-24 w-full">
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      className={`${
                        form.formState.errors.type && "border-red-400"
                      }`}
                    >
                      <SelectItem value={USER_TYPE.TEACHER}>Teacher</SelectItem>
                      <SelectItem value={USER_TYPE.STUDENT}>Student</SelectItem>
                    </SelectContent>
                  </Select>
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
                  <Input
                    placeholder="***"
                    {...field}
                    type="password"
                    className={`${
                      form.formState.errors.password && "border-red-400"
                    }`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="h-24 w-full">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="***"
                    {...field}
                    type="password"
                    className={`${
                      form.formState.errors.confirmPassword && "border-red-400"
                    }`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <SubmitButton
            disabled={isSubmitting}
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
      </Form>
    </ScrollArea>
  );
}
