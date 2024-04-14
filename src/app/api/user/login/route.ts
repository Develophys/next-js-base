import { NextRequest, NextResponse } from "next/server";

import { sign } from 'jsonwebtoken'
import { compareSync } from "bcrypt";

import { prisma } from "@/lib/prisma";

import { AuthBffResponse } from "@/models/auth-bff-response";

export const POST = async (
  req: NextRequest,
) => {
  try {

    const { email: emailToCheck, password: passwordToCheck } = await req.json();

    if (emailToCheck && passwordToCheck) {
      const user = await prisma.user.findUnique({ where: { email: emailToCheck } })

      if (!user)
        throw new Error(`Invalid Email or Password.`);

      if (user && user.password) {
        if (!compareSync(passwordToCheck, user.password))
          throw new Error(`Invalid Email or Password.`);


        const token = sign(
          {
            id: user.id, email: user.email, name: user.name
          },
          "__strong__secret__",
          {
            expiresIn: '1h',
          }
        );

        return NextResponse.json<AuthBffResponse>(
          {
            message: "Login successful.",
            data: token,
            status: 200,
          },
        );
      }

      throw new Error(`Invalid Email or Password.`);
    }

    throw new Error(`Invalid Email or Password.`);

  } catch (error: any) {
    return NextResponse.json<AuthBffResponse>(
      {
        message: error?.message || "Login failed.",
        error,
        status: error.status || 500,
      }
    );
  }
}