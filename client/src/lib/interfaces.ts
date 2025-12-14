export interface Sweet {
    _id: string;
    userId: string;
    name: string;
    category: string;
    price: Number;
    stock: Number;
    createdAt: Date;
    updatedAt: Date
}

export interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt: Date;
    updatedAt: Date
}

export interface Purchase {
    _id: string;
    userId: string;
    sweetId: string | Sweet;
    quantity: number;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}
