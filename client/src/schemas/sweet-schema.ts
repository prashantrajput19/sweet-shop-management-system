import { z } from "zod"

export const sweetSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    category: z.string().min(2, {
        message: "Category must be at least 2 characters.",
    }),
    price: z.coerce.number().min(1, {
        message: "Price must be at least 1.",
    }),
    stock: z.coerce.number().min(0, {
        message: "Stock must be at least 0.",
    }),
})
