import axios from "axios";
import { base } from "./base";

export const register = async (name: string, email: string, password: string, role: string) => {
    try {
        const response = await axios.post(`${base}/auth/register`, {
            name,
            email,
            password,
            role
        });
        if (response.status !== 200 && response.status !== 201) {
            const errorMessage = response.data?.message || 'Failed to register';
            throw new Error(errorMessage);
        }
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || error.message || 'Failed to register';
            throw new Error(errorMessage);
        } else if (error instanceof Error) {
            throw new Error(error.message || 'Failed to register');
        } else {
            throw new Error("Failed to register");
        }
    }
}

export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${base}/auth/login`, {
            email,
            password
        });
        if (response.status !== 200 && response.status !== 201) {
            const errorMessage = response.data?.message || 'Failed to login';
            throw new Error(errorMessage);
        }
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || error.message || 'Failed to login';
            throw new Error(errorMessage);
        } else if (error instanceof Error) {
            throw new Error(error.message || 'Failed to login');
        } else {
            throw new Error("Failed to login");
        }
    }
}

export const purchaseSweet = async (id: string, accessToken: string, quantity: number) => {
    try {
        const response = await axios.post(`${base}/sweets/${id}/purchase`, {
            quantity
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        if (response.status !== 200) {
            const errorMessage = response.data?.message || 'Failed to purchase sweet';
            throw new Error(errorMessage);
        }
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || error.message || 'Failed to purchase sweet';
            throw new Error(errorMessage);
        } else if (error instanceof Error) {
            throw new Error(error.message || 'Failed to purchase sweet');
        } else {
            throw new Error("Failed to purchase sweet");
        }
    }
}

export const updateSweet = async (id: string, accessToken: string, name: string, category: string, price: number) => {
    try {
        const response = await axios.put(`${base}/sweets/${id}`, {
            name,
            category,
            price,
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        if (response.status !== 200) {
            const errorMessage = response.data?.message || 'Failed to update sweet';
            throw new Error(errorMessage);
        }
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || error.message || 'Failed to update sweet';
            throw new Error(errorMessage);
        } else if (error instanceof Error) {
            throw new Error(error.message || 'Failed to update sweet');
        } else {
            throw new Error("Failed to update sweet");
        }
    }
}

export const deleteSweet = async (id: string, accessToken: string) => {
    try {
        const response = await axios.delete(`${base}/sweets/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        if (response.status !== 200) {
            const errorMessage = response.data?.message || 'Failed to delete sweet';
            throw new Error(errorMessage);
        }
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || error.message || 'Failed to delete sweet';
            throw new Error(errorMessage);
        } else if (error instanceof Error) {
            throw new Error(error.message || 'Failed to delete sweet');
        } else {
            throw new Error("Failed to delete sweet");
        }
    }
}

export const updateStock = async (id: string, accessToken: string, stock: number) => {
    try {
        const response = await axios.put(`${base}/sweets/${id}/restock`, {
            stock
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        if (response.status !== 200) {
            const errorMessage = response.data?.message || 'Failed to update stock';
            throw new Error(errorMessage);
        }
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || error.message || 'Failed to update stock';
            throw new Error(errorMessage);
        } else if (error instanceof Error) {
            throw new Error(error.message || 'Failed to update stock');
        } else {
            throw new Error("Failed to update stock");
        }
    }
}

export const addSweet = async (accessToken: string, name: string, category: string, price: number, stock: number) => {
    try {
        const response = await axios.post(`${base}/sweets`, {
            name,
            category,
            price,
            stock
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        if (response.status !== 201 && response.status !== 200) {
            const errorMessage = response.data?.message || 'Failed to add sweet';
            throw new Error(errorMessage);
        }
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || error.message || 'Failed to add sweet';
            throw new Error(errorMessage);
        } else if (error instanceof Error) {
            throw new Error(error.message || 'Failed to add sweet');
        } else {
            throw new Error("Failed to add sweet");
        }
    }
}
