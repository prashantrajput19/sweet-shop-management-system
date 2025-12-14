import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Calendar, Hash, ArrowLeft } from "lucide-react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { base } from "@/lib/base";
import type { Purchase } from "@/lib/interfaces";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserNav from "@/components/user-nav";
import { NoSweets } from "@/components/no-sweets";

export default function PurchasedPage() {
    const navigate = useNavigate();
    const [accessToken] = useLocalStorage<string | null>("accessToken", null);

    const { data: purchasesData, isLoading: isPurchasesLoading, isError: isPurchasesError, error } = useQuery<Purchase[] | null>({
        queryKey: ['purchases'],
        queryFn: async () => {
            const response = await axios.get(`${base}/sweets/user/purchased`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            return response.data.data;
        },
    });

    if (isPurchasesError) return <div className="p-6 text-center text-red-500">{error.message}</div>

    return (
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <UserNav />

            {purchasesData && purchasesData.length > 0 && (
                <div className="px-6">
                    <p className="text-sm text-muted-foreground">
                        Total purchases: {purchasesData.length}
                    </p>
                </div>
            )}
            {purchasesData?.length === 0 ? <NoSweets /> : (
                <div className="px-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {isPurchasesLoading ? (
                            // Skeleton Loading
                            Array.from({ length: 8 }).map((_, index) => (
                                <Card key={index} className="overflow-hidden">
                                    <CardHeader className="space-y-3">
                                        <Skeleton className="h-6 w-3/4" />
                                        <Skeleton className="h-4 w-1/2" />
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div className="flex justify-between">
                                            <Skeleton className="h-4 w-1/4" />
                                            <Skeleton className="h-4 w-1/3" />
                                        </div>
                                        <div className="flex justify-between">
                                            <Skeleton className="h-4 w-1/4" />
                                            <Skeleton className="h-4 w-1/3" />
                                        </div>
                                        <Skeleton className="h-4 w-full" />
                                    </CardContent>
                                </Card>
                            ))
                        ) : purchasesData && purchasesData.length > 0 ? purchasesData.map((purchase) => {
                            const isPopulated = typeof purchase.sweetId !== 'string';
                            const sweetName = isPopulated ? (purchase.sweetId as any).name : 'Unknown Sweet';
                            const sweetCategory = isPopulated ? (purchase.sweetId as any).category : 'N/A';

                            return (
                                <Card key={purchase._id}>
                                    <CardHeader className="space-y-1 pb-4">
                                        <div className="flex items-start justify-between">
                                            <div className="space-y-1 flex-1">
                                                <CardTitle className="text-xl font-bold">
                                                    {sweetName}
                                                </CardTitle>
                                                <CardDescription className="flex items-center gap-1.5 text-sm">
                                                    <ShoppingBag className="h-3.5 w-3.5" />
                                                    {sweetCategory}
                                                </CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-primary/5 to-transparent border border-primary/10">
                                            <span className="text-sm font-medium text-muted-foreground">Quantity</span>
                                            <span className="text-lg font-bold text-primary flex items-center gap-1">
                                                <Hash className="h-4 w-4" />
                                                {purchase.quantity}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-muted/50 to-transparent border border-border/50">
                                            <span className="text-sm font-medium text-muted-foreground">Total Price</span>
                                            <span className="text-lg font-bold text-green-600">
                                                ₹{(purchase.price * purchase.quantity).toString()}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t">
                                            <Calendar className="h-3.5 w-3.5" />
                                            <span>
                                                {new Date(purchase.createdAt).toLocaleDateString('en-IN', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        }) : (
                            <Card className="col-span-full">
                                <CardContent className="flex flex-col items-center justify-center py-12">
                                    <ShoppingBag className="h-16 w-16 text-muted-foreground/50 mb-4" />
                                    <p className="text-lg font-semibold text-muted-foreground mb-2">No purchases yet</p>
                                    <p className="text-sm text-muted-foreground/70">Start purchasing sweets from the dashboard!</p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}