import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
});

export default mongoose.models.Subscription || mongoose.model("Subscription", subscriptionSchema);
