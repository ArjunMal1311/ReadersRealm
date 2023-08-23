import prisma from "@/app/libs/prismadb";
import { getCurrentUser } from "./getCurrentUser";

export default async function getAllOrders() {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return null;
        }

        const orders = await prisma.order.findMany({
            where: {
                userId: user.id
            }
        });

        const safeOrders = orders.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }))

        return safeOrders;
    } catch (error: any) {
        throw new Error(error);
    }
}