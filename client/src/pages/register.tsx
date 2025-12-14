import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema } from "../schemas/register-schema"
import type z from "zod"
import { useRegisterMutation } from "../hooks/useCustomMutation"
import { toast } from 'sonner';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "../components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../components/ui/form"
import { Input } from "../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import useLocalStorage from "@/hooks/useLocalStorage"
import { useUser } from "@/contexts/UserContext"

export default function RegisterPage() {
    const navigate = useNavigate();

    const { login } = useUser();
    // const [, setAccessToken] = useLocalStorage<string | null>("accessToken", null);
    // const [, setRefreshToken] = useLocalStorage<string | null>("refreshToken", null);

    const registerForm = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            role: "user" as "admin" | "user"
        }
    })

    const registerMutation = useRegisterMutation();

    const onSubmit = async (data: z.infer<typeof registerSchema>) => {
        try {
            const result = await registerMutation.mutateAsync(data);

            // Set tokens via context
            login(result.data.accessToken, result.data.refreshToken);

            toast.success('User registered successfully!');

            // Small delay to ensure localStorage is updated before navigation
            setTimeout(() => {
                navigate('/dashboard');
            }, 100);
        } catch (error: any) {
            console.error('User registration error:', error);
            toast.error(error.message || 'User registration failed!');
        }
    }

    return (
        <div className="flex flex-col gap-2 items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold">Register</h1>
            <Form {...registerForm}>
                <form onSubmit={registerForm.handleSubmit(onSubmit)} className="space-y-4 w-full max-w-sm">
                    <FormField
                        control={registerForm.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={registerForm.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="john@example.com" type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={registerForm.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="******" type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={registerForm.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Role</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl className="w-full">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a role" className="w-full" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="user">User</SelectItem>
                                        <SelectItem value="admin">Admin</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full">Register</Button>
                </form>
            </Form>
            <p className="text-sm text-muted-foreground mt-2">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline font-medium">
                    Login here
                </Link>
            </p>
        </div>
    )
}