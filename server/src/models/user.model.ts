import { Schema, model } from 'mongoose';
import { UserInterface } from '../interfaces/user.interface';
import bcrypt from "bcryptjs";

const userSchema = new Schema<UserInterface>(
    {
        name: {
            type: String,
            required: true,
            minLength: [3, 'Name must be at least 3 characters long.'],
            maxLength: [50, 'Name must be at most 50 characters long.'],
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/\S+@\S+\.\S+/, 'Please use a valid email address.'],
        },
        password: {
            type: String,
            required: true,
            minLength: [6, 'Password must be at least 6 characters long.'],
        },
        role: {
            type: String,
            enum: ["admin", "sales"],
            default: "sales",
        }
    }, 
    { timestamps: true }
);

userSchema.pre('save', async function() {
    this.password = await bcrypt.hash(this.password, 14);
});

const User = model<UserInterface>('User', userSchema);

export default User;