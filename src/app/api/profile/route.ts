import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { CreateProfileDto } from "./dtos/create-profile-dto";

export const GET = async (
  _req: NextRequest,
  res: NextResponse,
) => {
  return getAllProfiles(res);
}

const getAllProfiles = async (res: NextResponse) => {
  try {

    const profiles = await prisma.profile.findMany();

    return NextResponse.json(
      {
        message: "Profiles fetching successfully.",
        profiles: profiles,
        status: res.status || 200,
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error while fetching profiles.",
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
    const newProfile: CreateProfileDto = await req.json();

    const existingProfile = await prisma.profile.findUnique({
      where: {
        permissions: newProfile.permissions
      }
    });

    if (existingProfile)
      throw new Error(`Permission has been granted for use in another profile. Permissions: '${existingProfile.permissions}'`);

    const { id: newProfileId } = await prisma.profile.create({ data: newProfile });

    return NextResponse.json(
      {
        message: "Profile Created successfully.",
        profile: {
          id: newProfileId,
          name: newProfile.name,
          description: newProfile.description,
          permissions: newProfile.permissions
        },
        status: res.status || 200,
      },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error?.message || "Error creating profile.",
        error,
        status: res.status || 500,
      }
    );
  }
}