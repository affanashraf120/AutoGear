import mongoose, { Schema } from "mongoose";

const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    cvc: {
        type: String,
        required: true,
    },
    expiry: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
});

export default mongoose.models.Message || mongoose.model("Message", messageSchema);
