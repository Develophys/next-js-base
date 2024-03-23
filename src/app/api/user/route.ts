import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const GET = async (
  _req: NextRequest,
  res: NextResponse,
) => {
  return getAllUsers(res);
}

const getAllUsers = async (res: NextResponse) => {
  try {

    const users = await prisma.user.findMany();

    return NextResponse.json(
      {
        message: "Ok",
        data: users,
        status: res.status,
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error",
        error,
        status: res.status,
      }
    );
  }
};