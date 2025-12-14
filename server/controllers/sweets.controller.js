import { errorResponse, successResponse } from "../helper/response.js";
import Sweet from "../models/Sweet.js";
import User from "../models/User.js";

export const addNewSweet = async (req, res) => {
    try {
        const { name, category, price, stock } = req.body;

        if (!name || !category || !price || !stock) {
            return errorResponse(res, "All fields are required", 400)
        }

        const dbSweet = await Sweet.findOne({ name });

        if (dbSweet) {
            return errorResponse(res, 'Sweet already exists', 400)
        }

        const sweet = await Sweet.create({
            name,
            category,
            price,
            stock: stock || 10
        })

        if (!sweet) {
            return errorResponse(res, "Sweet creation failed", 500)
        }

        return successResponse(res, "Sweet created successfully", sweet)
    } catch (error) {
        // Handle MongoDB duplicate key error
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            const value = error.keyValue[field];
            return errorResponse(res, `A sweet with ${field} "${value}" already exists`, 400);
        }
        return errorResponse(res, error.message || "Unexpected error occured", 500)
    }
}

export const getAllSweets = async (req, res) => {
    try {
        const sweets = await Sweet.find({})

        if (sweets.length === 0) {
            return errorResponse(res, "No sweets found", 404)
        }

        return successResponse(res, "Sweets fetched successfully", sweets)
    } catch (error) {
        errorResponse(res, error.message || "Unexpected error occured", 500)
    }
}

export const searchSweets = async (req, res) => {
    try {
        const userId = req.user.id;

        const { q } = req.query;

        if (!q || typeof q !== 'string' || q.trim() === '') {
            return errorResponse(res, "Search query is required", 400)
        }

        const sweets = await Sweet.find({ name: { $regex: q, $options: "i" } })

        if (sweets.length === 0) {
            return errorResponse(res, "No sweets found", 404)
        }

        return successResponse(res, "Sweets fetched successfully", sweets)
    } catch (error) {
        errorResponse(res, error.message || "Unexpected error occured", 500)
    }
}


export const updateSweetById = async (req, res) => {
    try {
        const userId = req.user.id;

        const { id } = req.params;

        const { name, category, price } = req.body;

        const dbSweet = await Sweet.findById(id)

        if (!dbSweet) {
            return errorResponse(res, "Sweet not found", 404)
        }

        // Build update object with only changed fields
        const updateData = {};

        if (name && dbSweet.name !== name) {
            updateData.name = name;
        }

        if (category && dbSweet.category !== category) {
            updateData.category = category;
        }

        if (price && dbSweet.price !== price) {
            updateData.price = price;
        }

        // If no fields changed, return error
        if (Object.keys(updateData).length === 0) {
            return errorResponse(res, "No changes detected", 400)
        }

        const sweet = await Sweet.findByIdAndUpdate(id,
            updateData,
            {
                new: true,
                runValidators: true
            }
        )

        if (!sweet) {
            return errorResponse(res, "Sweet update failed", 500)
        }

        return successResponse(res, "Sweet updated successfully", sweet)
    } catch (error) {
        // Handle MongoDB duplicate key error
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            const value = error.keyValue[field];
            return errorResponse(res, `A sweet with ${field} "${value}" already exists`, 400);
        }
        return errorResponse(res, error.message || "Unexpected error occured", 500)
    }
}

export const deleteSweetById = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId)

        if (user.role !== "admin") {
            return errorResponse(res, "Unauthorized, only admin can access", 401)
        }

        const { id } = req.params;

        const sweet = await Sweet.findByIdAndDelete(id, { new: true })

        if (!sweet) {
            return errorResponse(res, "Sweet not found", 404)
        }

        return successResponse(res, "Sweet deleted successfully", sweet)
    } catch (error) {
        errorResponse(res, error.message || "Unexpected error occured", 500)
    }
}