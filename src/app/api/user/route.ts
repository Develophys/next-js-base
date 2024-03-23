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
        status: res.status || 200,
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error while fetching users",
        error,
        status: res.status || 500,
      }
    );
  }
};

export const POST = async (
  req: NextRequest,
  res: NextResponse,
) => {
  try {

    const newUser = await req.json();

    const existingUser = await prisma.user.findUnique({
      where: {
        email: newUser.email
      }
    });

    if (existingUser)
      throw new Error(`Email '${existingUser.email}' already exists.`);

    await prisma.user.create({
      data: newUser
    });

    return NextResponse.json(
      {
        message: "User Created",
        data: newUser,
        status: res.status || 200,
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error creating user",
        error,
        status: res.status || 500,
      }
    );
  }
}
