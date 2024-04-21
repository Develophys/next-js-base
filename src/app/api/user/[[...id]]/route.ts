import { NextRequest, NextResponse } from "next/server";

import { hashSync } from 'bcrypt'

import { prisma } from "@/lib/prisma";

import { SALT } from "@/constants";

import { IUser } from "@/models/user";

import { UserCreateDto } from "../dtos/create-user-dto";

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
        type: true,
        courses: true,
        profiles: true
      },
    });

    return NextResponse.json(
      {
        message: "Users fetching successfully.",
        users: users,
        status: res.status || 200,
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error while fetching users.",
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
    const newUser: UserCreateDto = await req.json();

    const existingUser = await prisma.user.findUnique({
      where: {
        email: newUser.email
      }
    });

    if (existingUser)
      throw new Error(`User email '${existingUser.email}' already exists.`);

    const data: IUser = {
      ...newUser,
      password: hashSync(newUser.password, SALT),
    }

    const { id: newUserId } = await prisma.user.create({ data });

    return NextResponse.json(
      {
        message: "User Created successfully.",
        user: {
          name: newUser.name,
          email: newUser.email,
          type: newUser.type,
          id: newUserId
        },
        status: res.status || 200,
      },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error?.message || "Error creating user.",
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
        message: "User Deleted successfully.",
        status: res.status || 200,
      },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error?.message || "Error deleted user.",
        error,
        status: res.status || 500,
      }
    );
  }
}

export const PUT = async (
  req: NextRequest,
  res: NextResponse,
) => {
  try {

    const userIdToUpdate = req.url.split('user/').pop();

    const updateUserData = await req.json();

    const existingUser = await prisma.user.findUnique({
      where: {
        id: userIdToUpdate,
      }
    });

    if (!existingUser)
      throw new Error(`User not found.`);

    if (!updateUserData)
      throw new Error(`Invalid User values.`);

    await prisma.user.update({
      where: { id: userIdToUpdate },
      data: {
        name: updateUserData.name,
        email: updateUserData.email,
        password: updateUserData.password
          ? hashSync(updateUserData.password, SALT)
          : existingUser.password,
      },
    });

    return NextResponse.json(
      {
        message: "User Updated successfully.",
        user: {
          name: updateUserData.name,
          email: updateUserData.email
        },
        status: res.status || 200,
      },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error?.message || "Error update user.",
        error,
        status: res.status || 500,
      }
    );
  }
}