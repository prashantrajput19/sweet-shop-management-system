import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    sweetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sweet",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
})

export default mongoose.model("Purchase", purchaseSchema)

