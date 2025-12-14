import { generateToken } from "../helper/generateToken.js";
import { errorResponse, successResponse } from "../helper/response.js";
import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name) {
            return errorResponse(res, "Name is required", 400)
        }

        if (!email) {
            return errorResponse(res, "Email is required", 400)
        }

        if (!password) {
            return errorResponse(res, "Password is required", 400)
        }

        if (password.length < 6) {
            return errorResponse(res, "Password must be at least 6 characters long", 400)
        }

        if (!role) {
            return errorResponse(res, "Role is required", 400)
        }

        // Only validate role if it's provided (model has default of "user")
        if (role && role !== "admin" && role !== "user") {
            return errorResponse(res, "Invalid role", 400)
        }

        const dbUser = await User.findOne({ email })

        if (dbUser) {
            return errorResponse(res, "User already exists", 400)
        }

        const hashedPassword = await bcrypt.hash(password, 10)


        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        })

        if (!user) {
            return errorResponse(res, "User registration failed", 500)
        }

        const accessToken = generateToken(user, "30m")
        const refreshToken = generateToken(user, "7d")

        const data = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            accessToken,
            refreshToken
        }

        return successResponse(res, "User registered successfully", data)

    } catch (error) {
        errorResponse(res, error.message || "Unexpected error occured", 500)
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return errorResponse(res, "Email is required", 400)
        }

        if (!password) {
            return errorResponse(res, "Password is required", 400)
        }

        const user = await User.findOne({ email })

        if (!user) {
            return errorResponse(res, "User not found", 404)
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password)

        if (!isPasswordMatched) {
            return errorResponse(res, "Either email or password is incorrect", 400)
        }

        const accessToken = generateToken(user, "30m")
        const refreshToken = generateToken(user, "7d")

        const data = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            accessToken,
            refreshToken
        }

        return successResponse(res, "User logged in successfully", data)

    } catch (error) {
        errorResponse(res, error.message || "Unexpected error occured", 500)
    }
}

export const getUserData = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)

        if (!user) {
            return errorResponse(res, "User not found", 404)
        }

        return successResponse(res, "User data fetched successfully", user)
    } catch (error) {
        errorResponse(res, error.message || "Unexpected error occured", 500)
    }
}

export const refreshAccessToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return errorResponse(res, "Refresh token is required", 400)
        }

        // Verify refresh token
        let decoded;
        try {
            decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return errorResponse(res, "Refresh token expired, please login again", 401)
            }
            return errorResponse(res, "Invalid refresh token", 401)
        }

        // Find user
        const user = await User.findById(decoded.id);

        if (!user) {
            return errorResponse(res, "User not found", 404)
        }

        // Generate new access token
        const newAccessToken = generateToken(user, "1d")

        const data = {
            accessToken: newAccessToken
        }

        return successResponse(res, "Access token refreshed successfully", data)

    } catch (error) {
        errorResponse(res, error.message || "Unexpected error occured", 500)
    }
}