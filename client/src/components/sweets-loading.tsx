import { Card, CardContent, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export function SweetsLoading() {
    return (
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
                    <Skeleton className="h-10 w-full" />
                </CardContent>
            </Card>
        ))
    )
}