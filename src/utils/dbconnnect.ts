import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = "mongodb+srv://affan:i5DXSu0WRAZ4zGLK@autogear.mwjdc.mongodb.net/autogear_1?retryWrites=true&w=majority";

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

async function dbConnect() {
    mongoose
        .connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((res) => {
            console.log("Connected to server");
        })
        .catch((err) => {
            console.log(err);
        });
}

export default dbConnect;
