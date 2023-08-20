import prisma from "@/app/libs/prismadb";
import { getCurrentUser } from "./getCurrentUser";


export default async function getBooks() {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return null;
        }

        const books = await prisma.book.findMany({
            where: {
                userId: user.id
            }
        });

        const safeBooks = books.map((listing: any) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }))

        return safeBooks;
    } catch (error: any) {
        throw new Error(error);
    }
}