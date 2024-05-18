import { NextAuthOptions } from 'next-auth';

import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from "next-auth/providers/credentials"

import { prisma } from "@/lib/prisma";

import { compareSync } from "bcrypt";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@email.com" },
        password: { label: "Password", type: "password", placeholder: "******" }
      },
      async authorize(credentials, req) { // eslint-disable-line 

        if (credentials?.email && credentials?.password) {
          const user = await prisma.user.findUnique({ where: { email: credentials?.email } })

          if (!user)
            throw new Error(`Invalid Email or Password.`);

          if (user && user.password) {
            if (!compareSync(credentials?.password, user.password))
              throw new Error(`Invalid Email or Password.`);

            return user;
          }

          throw new Error(`Invalid Email or Password.`);
        }

        return null
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_APP_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_APP_CLIENT_SECRET || '',
    })
  ],

  pages: {
    signIn: '/login'
  },
};
