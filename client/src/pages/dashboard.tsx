import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Package, ShoppingCart } from "lucide-react";
import { usePurchaseMutation } from "@/hooks/useCustomMutation";
import useLocalStorage from "@/hooks/useLocalStorage";
import { base } from "@/lib/base";
import type { Sweet, User } from "@/lib/interfaces";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useMemo, useState } from "react";
import UserNav from "@/components/user-nav";
import { SweetsLoading } from "@/components/sweets-loading";
import { NoSweets } from "@/components/no-sweets";

export default function DashboardPage() {

    const [accessToken, setAccessToken] = useLocalStorage<string | null>("accessToken", null);
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState<string>("all");


    const { data: sweetsData, isLoading: isSweetsLoading, isError: isSweetsError, error } = useQuery<Sweet[] | null>({
        queryKey: ['allSweets'],
        queryFn: async () => {
            const url = searchQuery
                ? `${base}/sweets/search?q=${encodeURIComponent(searchQuery)}`
                : `${base}/sweets`;


            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            return response.data.data;
        },
    });

    const purchaseSweetMutation = usePurchaseMutation();

    const handleSweetPurchase = (id: string) => {
        const data = {
            id,
            accessToken: accessToken!,
            quantity: 1
        };

        const promise = purchaseSweetMutation.mutateAsync(data);

        toast.promise(promise, {
            loading: 'Purchasing sweet...',
            success: () => {
                return 'Sweet purchased successfully!';
            },
            error: (error: any) => {
                console.error('Sweet purchase error:', error);
                return error.message || 'Sweet purchase failed!';
            },
        });
    }

    const categories = useMemo(() => {
        if (!sweetsData) return [];
        const uniqueCategories = [...new Set(sweetsData.map(sweet => sweet.category))];
        return uniqueCategories;
    }, [sweetsData]);

    const filteredSweets = useMemo(() => {
        if (!sweetsData) return [];

        if (categoryFilter === "all") {
            return sweetsData;
        }

        return sweetsData.filter(sweet => sweet.category === categoryFilter);
    }, [sweetsData, categoryFilter]);

    if (isSweetsError) return <div className="p-6 text-center text-red-500">{error.message}</div>


    return (
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <UserNav />

            {/* Search and Filter Section */}
            <div className="px-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col gap-4 md:flex-row md:items-center flex-1">
                    <Input
                        placeholder="Search sweets by name or category..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="md:max-w-sm"
                    />
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                        <SelectTrigger className="md:w-[200px]">
                            <SelectValue placeholder="Filter by category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                    {category}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                {filteredSweets && (
                    <p className="text-sm text-muted-foreground">
                        Showing {filteredSweets.length} of {sweetsData?.length || 0} sweets
                    </p>
                )}
            </div>

            <div className="px-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {isSweetsLoading ? (
                        // Skeleton Loading
                        <SweetsLoading />
                    ) : filteredSweets && filteredSweets.length > 0 ? filteredSweets.map((sweet) => (
                        <Card
                            key={sweet._id}
                        >
                            <CardHeader className="space-y-1 pb-4">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1 flex-1">
                                        <CardTitle className="text-xl font-bold">
                                            {sweet.name}
                                        </CardTitle>
                                        <CardDescription className="flex items-center gap-1.5 text-sm">
                                            <Package className="h-3.5 w-3.5" />
                                            {sweet.category}
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className={"space-y-4"}>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-primary/5 to-transparent border border-primary/10">
                                        <span className="text-sm font-medium text-muted-foreground">Price</span>
                                        <span className="text-lg font-bold text-primary">
                                            ₹{sweet.price.toString()}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-muted/50 to-transparent border border-border/50">
                                        <span className="text-sm font-medium text-muted-foreground">Stock</span>
                                        <span className={`text-lg font-bold ${Number(sweet.stock) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            {sweet.stock.toString()} units
                                        </span>
                                    </div>
                                </div>
                                <Button
                                    onClick={() => handleSweetPurchase(sweet._id)}
                                    disabled={Number(sweet.stock) === 0}
                                    className="w-full cursor-pointer"
                                    size="lg"
                                >
                                    <ShoppingCart className="mr-2 h-4 w-4" />
                                    {Number(sweet.stock) === 0 ? 'Out of Stock' : 'Purchase Now'}
                                </Button>
                            </CardContent>
                        </Card>
                    )) : (
                        <NoSweets />
                    )}
                </div>
            </div>
        </div>
    );
}