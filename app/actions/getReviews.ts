import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { getCurrentUser } from "./getCurrentUser";

interface Params {
    bookId?: string;
}

export default async function getReviews(params: Params) {
    try {
        const { bookId } = params;

        const review = await prisma.review.findMany({
            where: {
                bookId: bookId
            }
        });

        if (!review) {
            return null;
        }

        return review
    } catch (error: any) {
        throw new Error(error);
    }
}