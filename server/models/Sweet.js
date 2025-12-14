import mongoose from "mongoose";

const sweetsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        default: 10,
        required: true
    }
}, {
    timestamps: true
})

export default mongoose.model("Sweet", sweetsSchema)