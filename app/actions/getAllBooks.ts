import prisma from "@/app/libs/prismadb";


export default async function getAllBooks() {
    try {
        const books = await prisma.book.findMany({});

        const safeBooks = books.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }))

        return safeBooks;
    } catch (error: any) {
        throw new Error(error);
    }
}