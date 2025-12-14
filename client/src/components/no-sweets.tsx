import { Card, CardContent } from "./ui/card";
import { Package } from "lucide-react";

export function NoSweets() {
    return (
        <Card className="col-span-full mx-4 md:mx-6">
            <CardContent className="flex flex-col items-center justify-center py-12">
                <Package className="h-16 w-16 text-muted-foreground/50 mb-4" />
                <p className="text-lg font-semibold text-muted-foreground mb-2">No sweets found</p>
                <p className="text-sm text-muted-foreground/70">Try adjusting your search or filter.</p>
            </CardContent>
        </Card>
    )
}