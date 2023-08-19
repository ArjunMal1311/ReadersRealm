import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
    const currentUser = await getCurrentUser()

    if (!currentUser) return NextResponse.error()

    const body = await request.json()
    const { category, title, author, description, imageUrl, price, stock } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });

    const book = await prisma.book.create({
        data: { category, title, author, description, imageUrl, price: parseInt(price, 10), stock: parseInt(stock, 10), userId: currentUser.id }
    })

    return NextResponse.json(book);

}