import prisma from "@/app/libs/prismadb";
import { getCurrentUser } from "./getCurrentUser";

export default async function getUserReview() {
    const user = await getCurrentUser();

    if (!user) {
        return null;
    }

    try {
        const review = await prisma.review.findMany({
            where: {
                userId: user.id
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