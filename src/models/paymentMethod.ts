import mongoose, { Schema } from "mongoose";

const PaymentMethod = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
        unique: true,
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
        unique: true,
    },
});

export default mongoose.models.PaymentMethod || mongoose.model("PaymentMethod", PaymentMethod);
