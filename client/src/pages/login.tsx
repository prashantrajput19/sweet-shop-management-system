import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type z from "zod"
import { useLoginMutation } from "../hooks/useCustomMutation"
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
import { loginSchema } from "@/schemas/login-schema"
import { useUser } from "@/contexts/UserContext"

export default function LoginPage() {
    const navigate = useNavigate();

    const { login } = useUser();
    // Removed local useLocalStorage hooks as they are now handled in UserContext

    const registerForm = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const loginMutation = useLoginMutation();

    const onSubmit = async (data: z.infer<typeof loginSchema>) => {
        try {
            const result = await loginMutation.mutateAsync(data);

            // Set tokens via context
            login(result.data.accessToken, result.data.refreshToken);

            toast.success('User logged in successfully!');

            // Small delay to ensure localStorage is updated before navigation
            setTimeout(() => {
                navigate('/dashboard');
            }, 100);
        } catch (error: any) {
            console.error('User login error:', error);
            toast.error(error.message || 'User login failed!');
        }
    }

    return (
        <div className="flex flex-col gap-2 items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold">Login</h1>
            <Form {...registerForm}>
                <form onSubmit={registerForm.handleSubmit(onSubmit)} className="space-y-4 w-full max-w-sm">
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
                    <Button type="submit" className="w-full">Login</Button>
                </form>
            </Form>
            <p className="text-sm text-muted-foreground mt-2">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary hover:underline font-medium">
                    Register here
                </Link>
            </p>
        </div>
    )
}