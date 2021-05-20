import mongoose, { Schema, Document } from "mongoose";

const productSchema = new mongoose.Schema({
    make: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    version: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    excerpt: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    //Transaction
    price: {
        type: Number,
        required: true,
    },
    transactionType: {
        type: String,
        required: true,
    },
    terms: {
        type: Number,
    },
    interval: {
        type: String,
    },
    //Engine
    mileage: {
        type: Number,
        required: true,
    },
    engineType: {
        type: String,
        required: true,
    },
    engineDisplacement: {
        type: Number,
        required: true,
    },
    transmission: {
        type: String,
        required: true,
    },
    //Physical
    assembly: {
        type: String,
        required: true,
    },
    bodyType: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
    //Region
    registeredCity: {
        type: String,
        required: true,
    },
    province: {
        type: String,
        required: true,
    },
    //Others
    rating: {
        type: Number,
        required: true,
    },
    reviews: {
        type: [Schema.Types.ObjectId],
        required: true,
    },
    sellerId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    badges: {
        type: [String],
        required: true,
    },
    isFeatured: {
        type: Boolean,
        required: true,
    },
    isApproved: {
        type: Boolean,
        required: true,
    },
    isInspected: {
        type: Boolean,
        required: true,
    },
    customFields: {
        type: Schema.Types.Mixed,
    },
    postedDate: {
        type: String,
        required: true,
    },
});

export default mongoose.models.Product || mongoose.model("Product", productSchema);
