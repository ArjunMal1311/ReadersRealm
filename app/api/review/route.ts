import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();


    try {
        if (!currentUser) {
            return NextResponse.error();
        }

        const body = await request.json();
        const { rating, comment, productId } = body;

        const existingReview = await prisma.review.findFirst({
            where: {
                userId: currentUser.id,
                bookId: productId
            }
        });

        if (existingReview) {
            return NextResponse.json({ error: "User has already reviewed this product." });
        }

        const review = await prisma.review.create({
            data: {
                rating: parseInt(rating, 10),
                comment,
                userId: currentUser.id,
                bookId: productId
            }
        });

        return NextResponse.json(review);
    } catch (error) {
        return NextResponse.error();
    }

}
