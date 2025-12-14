import Sweet from "../models/Sweet.js";
import User from "../models/User.js";
import Purchase from "../models/Purchase.js";
import { errorResponse, successResponse } from "../helper/response.js";

export const purchase = async (req, res) => {
    try {
        const { id } = req.params;

        const sweet = await Sweet.findById(id)

        if (!sweet) {
            return errorResponse(res, "Sweet not found", 404)
        }

        if (sweet.stock <= 0) {
            return errorResponse(res, "Sweet is out of stock", 400)
        }

        const { quantity } = req.body;

        if (!quantity) {
            return errorResponse(res, "Quantity is required", 400)
        }

        if (quantity > sweet.stock) {
            return errorResponse(res, "Quantity is greater than stock", 400)
        }

        const newPurchase = await Purchase.create({
            sweetId: sweet._id,
            userId: req.user.id,
            quantity: quantity,
            price: sweet.price
        })

        if (!newPurchase) {
            return errorResponse(res, "Purchase failed", 500)
        }

        sweet.stock -= quantity;
        await sweet.save();

        return successResponse(res, "Sweet purchased successfully")

    } catch (error) {
        return errorResponse(res, error.message || "Unexpected error occured", 500)
    }
}

export const restock = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId)

        if (user.role !== "admin") {
            return errorResponse(res, "Unauthorized, only admin can access", 401)
        }

        const { stock } = req.body;

        if (!stock) {
            return errorResponse(res, "Stock is required", 400)
        }

        if (stock > 10000) {
            return errorResponse(res, "Stock cannot be greater than 10000", 400)
        }

        const { id } = req.params;

        const sweet = await Sweet.findById(id)

        if (!sweet) {
            return errorResponse(res, "Sweet not found", 404)
        }

        const updatedSweet = await Sweet.findByIdAndUpdate(id,
            {
                stock
            },
            {
                new: true
            },
            {
                runValidators: true
            }
        )

        if (!updatedSweet) {
            return errorResponse(res, "Sweet restocked failed", 404)
        }

        return successResponse(res, "Sweet restocked successfully")
    } catch (error) {
        return errorResponse(res, error.message || "Unexpected error occured", 500)
    }
}


export const userPurchased = async (req, res) => {
    try {
        const userId = req.user.id;

        const purchases = await Purchase.find({ userId }).populate("sweetId");

        return successResponse(res, "Purchases fetched successfully", purchases)
    } catch (error) {
        return errorResponse(res, error.message || "Unexpected error occured", 500)
    }
}