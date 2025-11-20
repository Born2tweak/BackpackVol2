import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        campus: true,
        image: true,
        rating: true,
        itemsSold: true,
        badges: true,
        createdAt: true,
      },
    });

    const listings = await prisma.listing.findMany({
      where: { sellerId: session.user.id },
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            rating: true,
            badges: true,
          },
        },
        favorites: {
          where: { userId: session.user.id },
          select: { userId: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const listingsWithFavorited = listings.map((listing) => ({
      ...listing,
      favorited: listing.favorites && listing.favorites.length > 0,
      favorites: undefined,
    }));

    return NextResponse.json({ user, listings: listingsWithFavorited });
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}
