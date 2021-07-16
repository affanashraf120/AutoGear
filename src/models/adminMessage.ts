import mongoose, { Schema } from "mongoose";

const adminMessageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
});

export default mongoose.models.AdminMessage || mongoose.model("AdminMessage", adminMessageSchema);
