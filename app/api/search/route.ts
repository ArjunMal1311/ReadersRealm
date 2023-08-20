import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const queryParams = new URLSearchParams(request.url.split("?")[1]);

        var titleValue = queryParams.get("title") || '';
        var authorValue = queryParams.get("author") || '';
        var descriptionValue = queryParams.get("description") || '';
        var category = queryParams.get("category") || '';

        let query: any = {};

        if (category) {
            query.category = category;
        }

        if (titleValue) {
            query.title = {
                contains: titleValue,
                mode: "insensitive"
            };
        }

        if (authorValue) {
            query.author = {
                contains: authorValue,
                mode: "insensitive"
            };
        }

        if (descriptionValue) {
            query.description = {
                contains: descriptionValue,
                mode: "insensitive"
            };
        }

        const minPrice = queryParams.get("minPrice");
        const maxPrice = queryParams.get("maxPrice");

        if (minPrice !== null && maxPrice !== null) {
            query.price = {
                gte: parseInt(minPrice),
                lte: parseInt(maxPrice)
            };
        } else if (minPrice !== null) {
            query.price = {
                gte: parseInt(minPrice)
            };
        } else if (maxPrice !== null) {
            query.price = {
                lte: parseInt(maxPrice)
            };
        }

        const book = await prisma.book.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        });

        const safeListings = book.map((book) => ({
            ...book,
            createdAt: book.createdAt.toISOString(),
        }));

        return NextResponse.json(safeListings);

    } catch (error: any) {
        throw new Error(error);
    }
}
