import mongoose, { Schema, model } from "mongoose";
import { IUser } from "~/interfaces/api/userServices";

const UserSchema = new Schema<IUser>({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        unique: true,
        required: true,
    },
    // Address
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    postCode: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    isPaymentMethod: {
        type: Boolean,
        required: true,
    },
    // Limit
});

export default mongoose.models.User || model<IUser>("User", UserSchema);
