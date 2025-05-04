"use server";

import User from "@/lib/modals/user.modal";
import{connect} from "@/lib/db";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createUser(user: any) {

    try {
        await connect();
        const newUser = await User.create(user);
        return JSON.parse(JSON.stringify(newUser));
    } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Failed to create user");
    }
        
}