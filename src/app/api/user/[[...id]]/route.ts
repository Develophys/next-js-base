import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

import { genSaltSync, hashSync } from 'bcrypt'

const prisma = new PrismaClient()

const salt = genSaltSync(10);

export const GET = async (
  _req: NextRequest,
  res: NextResponse,
) => {
  return getAllUsers(res);
}

const getAllUsers = async (res: NextResponse) => {
  try {

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return NextResponse.json(
      {
        message: "Ok",
        users: users,
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
      data: {
        ...newUser,
        password: hashSync(newUser.password, salt),
      },
    });

    return NextResponse.json(
      {
        message: "User Created",
        user: {
          name: newUser.name,
          email: newUser.email
        },
        status: res.status || 200,
      },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error?.message || "Error creating user",
        error,
        status: res.status || 500,
      }
    );
  }
}

export const DELETE = async (
  req: NextRequest,
  res: NextResponse,
) => {
  try {

    const id = req.url.split('user/').pop();

    if (id) {
      const existingUser = await prisma.user.findUnique({
        where: {
          id: id,
        }
      });

      if (!existingUser)
        throw new Error(`User whit ID not exists.`);

      await prisma.user.delete({
        where: {
          email: existingUser.email
        }
      });
    }

    return NextResponse.json(
      {
        message: "User Deleted",
        status: res.status || 200,
      },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error?.message || "Error deleted user",
        error,
        status: res.status || 500,
      }
    );
  }
}
