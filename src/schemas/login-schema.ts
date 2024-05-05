import { z } from "zod";

import { USER_TYPE } from "@/enums";

export const baseFormSchema = z.object({
  email: z.string({
    required_error: 'Email is required.',
  }).email().trim().toLowerCase(),
  password: z.string().min(3, "Password must be at least 3 characters long"),
});

export type LoginFormSchema = z.infer<typeof baseFormSchema>;

export const signUpFormSchema = z.object({
  name: z.string({
    required_error: 'Name is required.',
  }).min(6, 'Name must be at least 6 characters.'),
  cpfCnpj: z
    .string({
      required_error: 'CPF/CNPJ is required.',
    })
    .refine((doc) => {
      const replacedDoc = doc.replace(/\D/g, '');
      return replacedDoc.length >= 11;
    }, 'CPF/CNPJ must contain at least 11 characters')
    .refine((doc) => {
      const replacedDoc = doc.replace(/\D/g, '');
      return replacedDoc.length <= 14;
    }, 'CPF/CNPJ must contain at least 14 characters'),
  type: z.nativeEnum(USER_TYPE),
  confirmPassword: z.string().min(3, "Password must be at least 3 characters long"),
})
  .merge(baseFormSchema)
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords does not match'
  });

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;
