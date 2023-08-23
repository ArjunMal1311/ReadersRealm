import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/app/libs/prismadb';
import { getCurrentUser } from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    try {
        const body = await request.json();
        const { shippingInfo, orderItems, paymentInfo, itemsPrice, orderStatus } = body;

        const order = await prisma.order.create({
            data: {
                shippingInfo,
                orderItems,
                paymentInfo,
                paidAt: new Date(),
                itemsPrice,
                orderStatus,
                userId: currentUser.id,
            },
        });

        return NextResponse.json(order);

    } catch (error) {
        console.error('Error submitting order:', error);
        return NextResponse.error();
    }
}
