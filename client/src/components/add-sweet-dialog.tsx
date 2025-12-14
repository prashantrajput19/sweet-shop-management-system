import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAddSweetMutation } from "@/hooks/useCustomMutation"
import { useUser } from "@/contexts/UserContext"
import { sweetSchema } from "@/schemas/sweet-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

export function AddSweetDialog() {
    const [open, setOpen] = useState(false)
    const { user } = useUser()
    const addSweetMutation = useAddSweetMutation()

    // Explicitly infer the type
    type SweetFormValues = z.infer<typeof sweetSchema>

    const form = useForm<SweetFormValues>({
        resolver: zodResolver(sweetSchema) as any,
        defaultValues: {
            name: "",
            category: "",
            price: 0,
            stock: 0,
        },
    })

    async function onSubmit(data: z.infer<typeof sweetSchema>) {
        if (!user) {
            toast.error("You must be logged in to add a sweet")
            return
        }

        const token = window.localStorage.getItem("accessToken")?.replace(/"/g, '');

        if (!token) {
            toast.error("Authentication error. Please login again.")
            return;
        }

        try {
            await addSweetMutation.mutateAsync({
                ...data,
                accessToken: token
            })
            toast.success("Sweet added successfully")
            setOpen(false)
            form.reset()
        } catch (error: any) {
            console.error(error)
            toast.error(error.message || "Failed to add sweet")
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Sweet
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Sweet</DialogTitle>
                    <DialogDescription>
                        Add a new sweet to the inventory. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Rasgulla" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Bengali" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price (₹)</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="20" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="stock"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Initial Stock</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="100" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={addSweetMutation.isPending}>
                            {addSweetMutation.isPending ? "Adding..." : "Save changes"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
