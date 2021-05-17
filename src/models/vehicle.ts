import mongoose, { Schema } from "mongoose"

const vehicleSchema = new mongoose.Schema({
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    engine: {
        type: String,
        required: true
    },
    year: {
        type: Schema.Types.Mixed,
        required: true
    }
})

export default mongoose.models.Vehicle || mongoose.model('Vehicle', vehicleSchema)