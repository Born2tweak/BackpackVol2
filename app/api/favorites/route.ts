import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db as prisma } from '@/lib/db';

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json([]);
    }

    const favorites = await prisma.favorite.findMany({
      where: { userId: user.id },
      include: {
        listing: {
          include: {
            seller: {
              select: { name: true },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const listings = favorites.map((f: any) => ({
      ...f.listing,
      favorited: true,
    }));

    return NextResponse.json(listings);
  } catch (error) {
    console.error('Failed to fetch favorites:', error);
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { listingId } = await request.json();

    const favorite = await prisma.favorite.create({
      data: {
        userId: user.id,
        listingId,
      },
    });

    return NextResponse.json(favorite);
  } catch (error) {
    console.error('Failed to add favorite:', error);
    return NextResponse.json({ error: 'Failed to add favorite' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { listingId } = await request.json();

    await prisma.favorite.delete({
      where: {
        userId_listingId: {
          userId: user.id,
          listingId,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to remove favorite:', error);
    return NextResponse.json({ error: 'Failed to remove favorite' }, { status: 500 });
  }
}
