import { revalidatePath } from "next/cache";
import User from "../database/models/user.model";
import { connectDB } from "../database/mongoose";
import { handleError } from "../utils";

// Create user 
export async function createUser(user: CreateUserParams){
    try {
        await connectDB();

        const newUser = await User.create(user);

        return JSON.parse(JSON.stringify(newUser));
    } catch (error) {
        handleError(error);
    }
}
// Read user 
export async function getUserById(userId: string) {
    try {
        await connectDB()

        const user = await User.findOne({userId})

        if (!user) throw new Error('User not found');

        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        handleError(error);
    }
}
// Update user 
export async function updateUser(clerkId: string, user: CreateUserParams){
    try {
        await connectDB();

        const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
            new: true,
        })

        if (!updatedUser) throw new Error('User update failed')

        return JSON.parse(JSON.stringify(updatedUser))
    } catch (error) {
        handleError(error);
    }
}
// Delete user
export async function DeleteUser(clerkId: string){
    try {
        await connectDB()

        const userToDelete = await User.findOne({ clerkId })

        if (!userToDelete) throw new Error('User not found')

        const DeletedUser = await User.findByIdAndDelete(userToDelete._id);
        revalidatePath("/");

        return DeletedUser ? JSON.parse(JSON.stringify(DeletedUser)) : null;
    } catch (error) {
        handleError(error);
    }
}
// Use Credits 
export async function updateCredits(userId: string, creditFee: number){
    try {
        await connectDB()

        const updatedUserCredit = await User.findOneAndUpdate(
            { _id: userId },
            {$inc: { creditBalance: creditFee }},
            { new: true }
        )
    } catch (error) {
        handleError(error)
    }
}
