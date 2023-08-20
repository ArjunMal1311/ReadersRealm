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

        return (cart?.cartItems);
    } catch (error: any) {
        throw new Error(error);
    }
}