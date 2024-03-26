import { NextRequest, NextResponse } from "next/server";

import { sign } from 'jsonwebtoken'

import { compareSync } from "bcrypt";

import { prisma } from "@/lib/prisma";

export const POST = async (
  req: NextRequest,
) => {
  try {

    const { email: emailToCheck, password: passwordToCheck } = await req.json();

    let token = '';

    if (emailToCheck && passwordToCheck) {
      const user = await prisma.user.findUnique({ where: { email: emailToCheck } })

      if (!user)
        throw new Error(`Invalid Email or Password.`);

      if (user && user.password) {
        if (!compareSync(passwordToCheck, user.password))
          throw new Error(`Invalid Email or Password.`);

        token = sign(
          {
            id: user.id, email: user.email, name: user.name
          },
          "__strong__secret__",
          {
            expiresIn: "1h",
          }
        );
      }
    }

    return NextResponse.json(
      {
        message: "Login successful.",
        data: token,
        status: 200,
      },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error?.message || "Login failed.",
        error,
        status: error.status || 500,
      }
    );
  }
}