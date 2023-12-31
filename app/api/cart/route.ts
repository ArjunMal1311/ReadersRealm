import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";


export async function PATCH(request: Request) {
    const currentUser = await getCurrentUser()

    if (!currentUser) return NextResponse.error()

    const body = await request.json()
    const { id, quantity } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });


    try {
        const existingCartItemIndex = currentUser.cartItems.findIndex(item => item.id === id);

        if (existingCartItemIndex !== -1) {
            const updatedCartItems = [...currentUser.cartItems];
            updatedCartItems[existingCartItemIndex].quantity = quantity;

            await prisma.user.update({
                where: { id: currentUser.id },
                data: { cartItems: { set: updatedCartItems } },
            });

            return NextResponse.json({ message: "CartItem quantity updated successfully" });
        } else {
            const newCartItem = { id, quantity };
            const updatedCartItems = [...currentUser.cartItems, newCartItem];

            await prisma.user.update({
                where: { id: currentUser.id },
                data: { cartItems: { set: updatedCartItems } },
            });

            return NextResponse.json({ message: "CartItem added successfully" });
        }
    } catch (error) {
        console.error("Error adding cart item:", error);
        return NextResponse.error();
    }

}