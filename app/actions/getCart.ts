import prisma from "@/app/libs/prismadb";
import { getCurrentUser } from "./getCurrentUser";
import { NextResponse } from "next/server";

export default async function getCart() {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return null;
        }

        const cart = await prisma.user.findUnique({
            where: {
                id: user.id
            }
        });

        const cartItemIds = cart.cartItems.map(item => item.id);

        const books = await prisma.book.findMany({
            where: {
                id: {
                    in: cartItemIds
                }
            }
        });

        const cartItemsWithBookInfo = cart.cartItems.map(cartItem => {
            const associatedBook = books.find(book => book.id === cartItem.id);

            if (associatedBook) {
                return {
                    bookName: associatedBook,
                    quantity: cartItem.quantity
                }
            }
        });

        return cartItemsWithBookInfo;

    } catch (error: any) {
        throw new Error(error);
    }
}
