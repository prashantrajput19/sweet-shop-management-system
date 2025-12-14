export const errorResponse = (res, message, statusCode) => {
    return res.status(statusCode).json({ success: false, message })
}

export const successResponse = (res, message, data) => {
    return res.status(200).json({ success: true, message, data })
}