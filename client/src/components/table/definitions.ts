import { CheckCircleIcon, XCircleIcon, Candy, Cookie, Cake, Star } from "lucide-react";

export const usersStatus = [
    {
        value: "active",
        label: "Active",
        icon: CheckCircleIcon,
    },
    {
        value: "inactive",
        label: "Inactive",
        icon: XCircleIcon,
    },
];

export const usersRole = [
    {
        value: "client",
        label: "Client",
    },
    {
        value: "provider",
        label: "Provider",
    },
];

export const sweetCategories = [
    {
        value: "Traditional",
        label: "Traditional",
        icon: Star,
    },
    {
        value: "Milk-based",
        label: "Milk-based",
        icon: Candy,
    },
    {
        value: "Fried",
        label: "Fried",
        icon: Cookie,
    },
    {
        value: "Dessert",
        label: "Dessert",
        icon: Cake,
    },
    {
        value: "Bengali",
        label: "Bengali",
        icon: Candy,
    },
    {
        value: "Dry Fruits",
        label: "Dry Fruits",
        icon: Star,
    },
];