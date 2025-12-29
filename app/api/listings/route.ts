import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db as prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    const { userId } = await auth();

    const where: any = { status: 'active' };
    if (category && category !== 'all') {
      where.category = category;
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const listings = await prisma.listing.findMany({
      where,
      include: {
        seller: {
          select: { name: true },
        },
        favorites: userId ? {
          where: {
            user: { clerkId: userId },
          },
        } : false,
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    const listingsWithFavorited = listings.map((listing: any) => ({
      ...listing,
      favorited: listing.favorites?.length > 0,
      favorites: undefined,
    }));

    return NextResponse.json(listingsWithFavorited);
  } catch (error) {
    console.error('Failed to fetch listings:', error);
    return NextResponse.json({ error: 'Failed to fetch listings' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      const clerkUser = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        },
      }).then(res => res.json());

      user = await prisma.user.create({
        data: {
          clerkId: userId,
          email: clerkUser.email_addresses?.[0]?.email_address || '',
          name: `${clerkUser.first_name || ''} ${clerkUser.last_name || ''}`.trim() || 'Student',
          imageUrl: clerkUser.image_url,
        },
      });
    }

    const body = await request.json();
    const { title, description, price, category, condition, location, images } = body;

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        category,
        condition,
        location,
        images: JSON.stringify(images || []),
        sellerId: user.id,
      },
    });

    return NextResponse.json(listing);
  } catch (error) {
    console.error('Failed to create listing:', error);
    return NextResponse.json({ error: 'Failed to create listing' }, { status: 500 });
  }
}
