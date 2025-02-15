import { model, models, Schema } from "mongoose";

export interface User extends Document {
    ClerkId: string,
    email: string,
    username: string,
    photo: string,
    firstname: string,
    lastname: string,
    planId: number,
    creditBalance: number
}

const UserSchema = new Schema({
    ClerkId: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true},
    username: { type: String, required: true, unique: true},
    photo: { type: String },
    firstname: { type: String, required: true},
    lastname: { type: String },
    planId: { type: Number, default: 1 },
    creditBalance: { type: Number, default: 10 }
})

const User = models?.User || model("User", UserSchema)

export default User;