import jwt from "jsonwebtoken";

export const generateToken = (user, expiresIn) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn })
}