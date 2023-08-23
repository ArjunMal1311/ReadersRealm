import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

interface Params {
    reviewId?: string;
}

export async function DELETE(request: Request, { params }: { params: Params }) {
    const currentUser = await getCurrentUser();


    try {
        if (!currentUser) {
            return NextResponse.error();
        }

        const { reviewId } = params;

        if (!reviewId || typeof reviewId !== 'string') {
            throw new Error('Invalid ID');
        }

        await prisma.review.delete({
            where: {
                id: reviewId,
                userId: currentUser.id
            }
        });

        return NextResponse.json({ success: true });

    } catch (error) {
        return NextResponse.error()
    }
}
