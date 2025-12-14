import { MoreHorizontalIcon } from "lucide-react";
import type { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useDeleteSweetMutation, useUpdateStockMutation, useUpdateSweetMutation } from "@/hooks/useCustomMutation";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface Sweet {
    _id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
}

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
    const sweet = row.original as Sweet;

    const [name, setName] = useState<string>(sweet.name);
    const [category, setCategory] = useState<string>(sweet.category);
    const [price, setPrice] = useState<number>(sweet.price);

    const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showStockDialog, setShowStockDialog] = useState(false);
    const [addStock, setAddStock] = useState<number>(0);

    const [accessToken] = useLocalStorage<string | null>("accessToken", null);

    const deleteSweetMutation = useDeleteSweetMutation();

    const handleDelete = () => {
        const promise = deleteSweetMutation.mutateAsync({
            id: sweet._id,
            accessToken: accessToken!
        });

        toast.promise(promise, {
            loading: 'Deleting sweet...',
            success: () => {
                return 'Sweet deleted successfully!';
            },
            error: (error: any) => {
                console.error('Sweet delete error:', error);
                return error.message || 'Sweet delete failed!';
            },
        });
    }

    const updateSweetMutation = useUpdateSweetMutation();

    const handleUpdate = () => {
        const promise = updateSweetMutation.mutateAsync({
            id: sweet._id,
            accessToken: accessToken!,
            name: name,
            category: category,
            price: price,
        });

        toast.promise(promise, {
            loading: 'Updating sweet...',
            success: () => {
                return 'Sweet updated successfully!';
            },
            error: (error: any) => {
                console.error('Sweet update error:', error);
                return error.message || 'Sweet update failed!';
            },
        });

    }

    const updateStockMutation = useUpdateStockMutation();

    const handleUpdateStock = () => {
        const promise = updateStockMutation.mutateAsync({
            id: sweet._id,
            accessToken: accessToken!,
            stock: addStock,
        });

        toast.promise(promise, {
            loading: 'Updating stock...',
            success: () => {
                return 'Stock updated successfully!';
            },
            error: (error: any) => {
                console.error('Stock update error:', error);
                return error.message || 'Stock update failed!';
            },
        });
    }

    return (
        <>
            <Dialog open={showUpdateDialog} onOpenChange={setShowUpdateDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Sweet</DialogTitle>
                        <DialogDescription>
                            Update the sweet details
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label>Name</Label>
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1.5"
                            />
                        </div>
                        <div>
                            <Label>Category</Label>
                            <Input
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="mt-1.5"
                            />
                        </div>
                        <div>
                            <Label>Price</Label>
                            <Input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                                className="mt-1.5"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowUpdateDialog(false)}>Cancel</Button>
                        <Button onClick={() => {
                            handleUpdate();
                            setShowUpdateDialog(false);
                        }}>Update</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Sweet</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this sweet? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => {
                            handleDelete();
                            setShowDeleteDialog(false);
                        }}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <Dialog open={showStockDialog} onOpenChange={setShowStockDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Stock</DialogTitle>
                        <DialogDescription>
                            Add stock units to {sweet.name}. Current stock: {sweet.stock}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label>Stock to Add</Label>
                            <Input
                                type="number"
                                min="1"
                                value={addStock}
                                onChange={(e) => setAddStock(Number(e.target.value))}
                                className="mt-1.5"
                                placeholder="Enter stock quantity"
                            />
                        </div>
                        <p className="text-sm text-muted-foreground">
                            New total stock will be: <span className="font-semibold text-foreground">{Number(sweet.stock) + addStock}</span> units
                        </p>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowStockDialog(false)}>Cancel</Button>
                        <Button onClick={() => {
                            handleUpdateStock();
                            setShowStockDialog(false);
                            setAddStock(0);
                        }}>Add Stock</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
                        <MoreHorizontalIcon className="h-4 w-4" />
                        <span className="sr-only">{"Open Menu"}</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onSelect={() => setShowUpdateDialog(true)}>
                        Update
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setShowStockDialog(true)}>
                        Add Stock
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setShowDeleteDialog(true)}>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}