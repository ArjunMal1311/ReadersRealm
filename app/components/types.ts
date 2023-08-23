import { Book, Order, Review, User } from "@prisma/client";

export type SafeReview = Review
export type SafeOrder = Order

export type SafeUser = Omit<User, "createdAt" | "updatedAt" | "emailVerified"> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
};

export type SafeListing = Omit<Book, "createdAt"> & {
    createdAt: string;
};

export type BookData = {
    bookName: SafeListing;
    quantity: number;
};