import mongoose, { Schema } from "mongoose";

const messageSchema = new mongoose.Schema({
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
    sellerId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    productId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
});

export default mongoose.models.Message || mongoose.model("Message", messageSchema);
