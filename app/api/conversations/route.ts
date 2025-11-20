import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { listingId, sellerId } = await request.json();

    if (!listingId || !sellerId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
      select: { sellerId: true },
    });

    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }

    if (listing.sellerId !== sellerId) {
      return NextResponse.json(
        { error: 'Seller does not own this listing' },
        { status: 403 }
      );
    }

    if (session.user.id === sellerId) {
      return NextResponse.json(
        { error: 'Cannot message yourself' },
        { status: 400 }
      );
    }

    const existingConversation = await prisma.conversation.findFirst({
      where: {
        listingId,
        participants: {
          some: { id: session.user.id },
        },
      },
    });

    if (existingConversation) {
      return NextResponse.json(existingConversation);
    }

    const conversation = await prisma.conversation.create({
      data: {
        listingId,
        participants: {
          connect: [{ id: session.user.id }, { id: sellerId }],
        },
      },
    });

    return NextResponse.json(conversation);
  } catch (error) {
    console.error('Failed to create conversation:', error);
    return NextResponse.json(
      { error: 'Failed to create conversation' },
      { status: 500 }
    );
  }
}
