import { NextAuthOptions } from 'next-auth';

import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from "next-auth/providers/credentials"

import { User } from '@prisma/client';

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
          const user = await prisma.user.findUnique({
            where: { email: credentials?.email },
            include: {
              profiles: true,
              courses: true
            }
          })

          if (!user)
            throw new Error(`Invalid Email or Password.`);

          if (user && user.password) {
            if (!compareSync(credentials?.password, user.password))
              throw new Error(`Invalid Email or Password.`);

            const userToSend = {
              id: user.id,
              email: user.email,
              name: user.name,
              cpfCnpj: user.cpfCnpj,
              type: user.type,
              profiles: user.profiles,
              courses: user.courses,
            };

            return userToSend;
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
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && token.user) {
        session.user = token.user as User;
      }
      return session;
    },
  }
};
