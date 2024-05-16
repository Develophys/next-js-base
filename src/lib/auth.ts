import { NextAuthOptions } from 'next-auth';

import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from "next-auth/providers/credentials"

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
        const user = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        }).then(async res => await res.json());


        if (user && user.status !== 500) {
          return user;
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