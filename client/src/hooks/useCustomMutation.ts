import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient";
import { purchaseSweet, login, register, updateSweet, deleteSweet, updateStock, addSweet } from "../lib/queryFunctions";
import { registerSchema } from "../schemas/register-schema";
import type z from "zod";
import type { loginSchema } from "../schemas/login-schema";
import type { sweetSchema } from "../schemas/sweet-schema";

export const useRegisterMutation = () => {
    return useMutation({
        mutationFn: (data: z.infer<typeof registerSchema>) => {
            return register(data.name, data.email, data.password, data.role);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        }
    });
}

export const useLoginMutation = () => {
    return useMutation({
        mutationFn: (data: z.infer<typeof loginSchema>) => {
            return login(data.email, data.password);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        }
    });
}

export const usePurchaseMutation = () => {
    return useMutation({
        mutationFn: (data: { id: string, accessToken: string, quantity: number }) => {
            return purchaseSweet(data.id, data.accessToken, data.quantity);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allSweets'] });
        }
    });
}

export const useUpdateSweetMutation = () => {
    return useMutation({
        mutationFn: (data: { id: string, accessToken: string, name: string, category: string, price: number }) => {
            return updateSweet(data.id, data.accessToken, data.name, data.category, data.price);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allSweets'] });
        }
    });
}

export const useDeleteSweetMutation = () => {
    return useMutation({
        mutationFn: (data: { id: string, accessToken: string }) => {
            return deleteSweet(data.id, data.accessToken);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allSweets'] });
        }
    });
}

export const useUpdateStockMutation = () => {
    return useMutation({
        mutationFn: (data: { id: string, accessToken: string, stock: number }) => {
            return updateStock(data.id, data.accessToken, data.stock);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allSweets'] });
        }
    });
}

export const useAddSweetMutation = () => {
    return useMutation({
        mutationFn: (data: { accessToken: string } & z.infer<typeof sweetSchema>) => {
            return addSweet(data.accessToken, data.name, data.category, data.price, data.stock);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allSweets'] });
        }
    });
}
