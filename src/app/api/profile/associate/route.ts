import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { decode } from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import { AssociateProfileToUserDto } from '../dtos/associate-profile-to-user-dto';

const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    include: { profiles: true },
    where: { email },
  });
};

const handleRequest = async (
  req: NextRequest,
  res: NextResponse,
  operation: 'associate' | 'disassociate'
) => {
  try {
    const userToken = headers().get('usertoken');

    if (!userToken)
      throw new Error('Token is required.');

    const { email } = decode(userToken) as { email: string };
    const userToUpdate = await getUserByEmail(email);

    if (!userToUpdate)
      throw new Error('User not found.');

    const { profilesIds }: AssociateProfileToUserDto = await req.json();

    if (profilesIds.length === 0)
      throw new Error('Invalid profilesIds.');

    const profiles = await prisma.profile.findMany({
      where: { id: { in: profilesIds } },
    });

    if (!profiles || profiles.length === 0)
      throw new Error('Invalid profilesIds.');

    const profilesToConnect = profiles.filter(profile => (
      operation === 'associate' && !userToUpdate.profiles.find(p => p.id === profile.id)
    ));

    const profilesToRemove = profiles.filter(profile => (
      operation === 'disassociate' && userToUpdate.profiles.some(p => p.id === profile.id)
    ));

    if ((operation === 'associate' && profilesToConnect.length === 0) ||
      (operation === 'disassociate' && profilesToRemove.length === 0))
      throw new Error(`Invalid profile IDs or profiles already ${operation === 'associate' ? 'associated' : 'disassociated'} with this user.`);

    const updatedUser = await prisma.user.update({
      where: { email: userToUpdate.email },
      data: {
        profiles: {
          [operation === 'associate' ? 'connect' : 'disconnect']: operation === 'associate' ?
            profilesToConnect.map(profile => ({ id: profile.id })) :
            profilesToRemove.map(profile => ({ id: profile.id })),
        },
      },
    });

    return NextResponse.json({
      message: `Profile(s) ${operation === 'associate' ? 'associated' : 'disassociated'} with user ${updatedUser.name} successfully.`,
      profiles: operation === 'associate' ? profilesToConnect : profilesToRemove,
      status: res.status || 200,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error?.message || `Error ${operation === 'associate' ? 'associating' : 'disassociating'} profiles.`,
      error,
      status: res.status || 500,
    });
  }
};

export const POST = async (
  req: NextRequest,
  res: NextResponse,
) => {
  return handleRequest(req, res, 'associate');
};

export const DELETE = async (
  req: NextRequest,
  res: NextResponse,
) => {
  return handleRequest(req, res, 'disassociate');
};
