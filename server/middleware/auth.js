import { errorResponse } from "../helper/response.js"
import jwt from "jsonwebtoken"

export const authMiddleware = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return errorResponse(res, "No token provided", 401)
        }

        const token = req.headers.authorization.split(" ")[1]
        if (!token) {
            return errorResponse(res, "Unauthorized, login to use this feature", 401)
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decodedToken
        next()
    } catch (error) {
        // Handle JWT specific errors with 401 status
        if (error.name === 'TokenExpiredError') {
            return errorResponse(res, "Access token expired", 401)
        }
        if (error.name === 'JsonWebTokenError') {
            return errorResponse(res, "Invalid token", 401)
        }
        return errorResponse(res, error.message || "Unexpected error occured", 500)
    }
}