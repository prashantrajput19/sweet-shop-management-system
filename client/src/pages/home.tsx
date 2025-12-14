import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, Users, Search, Package, Shield, Database, Check } from "lucide-react"
import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
            {/* Hero Section */}
            <section className="container mx-auto px-4 py-20 md:py-32">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 pb-6 text-balance bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                        Sweet Shop Management System
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
                        A full-stack solution with secure authentication, intelligent inventory management, and powerful admin
                        controls. Built for modern sweet shops.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="text-lg px-8">
                            <Link to="/register">
                                Get Started
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
                            <Link to="/login">
                                View Features
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="container mx-auto px-4 py-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Everything you need to manage your sweet shop efficiently
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    <Card className="border-2 hover:border-primary/50 transition-colors">
                        <CardContent className="p-6">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                <Shield className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">User Authentication</h3>
                            <p className="text-muted-foreground">
                                Secure register and login system powered by JWT tokens for safe access control
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-2 hover:border-primary/50 transition-colors">
                        <CardContent className="p-6">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                <Package className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Inventory Management</h3>
                            <p className="text-muted-foreground">
                                Comprehensive sweet inventory tracking with real-time stock updates and alerts
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-2 hover:border-primary/50 transition-colors">
                        <CardContent className="p-6">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                <Search className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Search & Filter</h3>
                            <p className="text-muted-foreground">
                                Advanced search capabilities to quickly find sweets by name, category, or price
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-2 hover:border-primary/50 transition-colors">
                        <CardContent className="p-6">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                <ShoppingBag className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Purchase & Stock Control</h3>
                            <p className="text-muted-foreground">
                                Seamless purchase flow with automatic stock deduction and inventory management
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-2 hover:border-primary/50 transition-colors">
                        <CardContent className="p-6">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                <Users className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Admin Dashboard</h3>
                            <p className="text-muted-foreground">
                                Powerful admin interface for complete control over inventory and user management
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-2 hover:border-primary/50 transition-colors">
                        <CardContent className="p-6">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                <Database className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">RESTful API</h3>
                            <p className="text-muted-foreground">
                                Modern API-driven architecture for scalable and maintainable backend operations
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="container mx-auto px-4 py-20 bg-muted/30">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">Get started in four simple steps</p>
                </div>
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                            1
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Register / Login</h3>
                        <p className="text-muted-foreground">Create your account or login securely with your credentials</p>
                    </div>

                    <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                            2
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Browse & Search</h3>
                        <p className="text-muted-foreground">Explore the complete catalog of sweets with powerful filters</p>
                    </div>

                    <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                            3
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Purchase or Manage</h3>
                        <p className="text-muted-foreground">Make purchases or manage inventory with ease</p>
                    </div>

                    <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                            4
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Admin Controls</h3>
                        <p className="text-muted-foreground">Add, update, delete, or restock items from admin panel</p>
                    </div>
                </div>
            </section>

            {/* Role-Based Access Section */}
            <section className="container mx-auto px-4 py-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Role-Based Access</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">Different capabilities for users and administrators</p>
                </div>
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="border-2">
                        <CardContent className="p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-lg bg-chart-1/10 flex items-center justify-center">
                                    <Users className="w-6 h-6 text-chart-1" />
                                </div>
                                <h3 className="text-2xl font-bold">User Capabilities</h3>
                            </div>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-chart-1 shrink-0 mt-0.5" />
                                    <span>Register and login with secure authentication</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-chart-1 shrink-0 mt-0.5" />
                                    <span>Browse complete sweet inventory catalog</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-chart-1 shrink-0 mt-0.5" />
                                    <span>Search and filter sweets by multiple criteria</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-chart-1 shrink-0 mt-0.5" />
                                    <span>Purchase sweets with automatic stock updates</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-chart-1 shrink-0 mt-0.5" />
                                    <span>View detailed product information and pricing</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="border-2 bg-primary/5">
                        <CardContent className="p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-lg bg-chart-2/10 flex items-center justify-center">
                                    <Shield className="w-6 h-6 text-chart-2" />
                                </div>
                                <h3 className="text-2xl font-bold">Admin Capabilities</h3>
                            </div>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-chart-2 shrink-0 mt-0.5" />
                                    <span>Full access to admin dashboard panel</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-chart-2 shrink-0 mt-0.5" />
                                    <span>Add new sweets to the inventory system</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-chart-2 shrink-0 mt-0.5" />
                                    <span>Update existing sweet details and pricing</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-chart-2 shrink-0 mt-0.5" />
                                    <span>Delete sweets from inventory permanently</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-chart-2 shrink-0 mt-0.5" />
                                    <span>Restock inventory and manage stock levels</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-chart-2 shrink-0 mt-0.5" />
                                    <span>Monitor all transactions and user activity</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Technology Stack Section */}
            <section className="container mx-auto px-4 py-20 bg-muted/30">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Technology Stack</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">Built with modern, industry-standard technologies</p>
                </div>
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div>
                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-chart-1"></span>
                                Frontend Technologies
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                <span className="px-4 py-2 bg-card border-2 border-border rounded-lg font-medium hover:border-primary/50 transition-colors">
                                    React
                                </span>
                                <span className="px-4 py-2 bg-card border-2 border-border rounded-lg font-medium hover:border-primary/50 transition-colors">
                                    Tailwind CSS
                                </span>
                                <span className="px-4 py-2 bg-card border-2 border-border rounded-lg font-medium hover:border-primary/50 transition-colors">
                                    JavaScript
                                </span>
                                <span className="px-4 py-2 bg-card border-2 border-border rounded-lg font-medium hover:border-primary/50 transition-colors">
                                    JSX
                                </span>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-chart-2"></span>
                                Backend Technologies
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                <span className="px-4 py-2 bg-card border-2 border-border rounded-lg font-medium hover:border-primary/50 transition-colors">
                                    RESTful API
                                </span>
                                <span className="px-4 py-2 bg-card border-2 border-border rounded-lg font-medium hover:border-primary/50 transition-colors">
                                    JWT Authentication
                                </span>
                                <span className="px-4 py-2 bg-card border-2 border-border rounded-lg font-medium hover:border-primary/50 transition-colors">
                                    PostgreSQL / MongoDB
                                </span>
                                <span className="px-4 py-2 bg-card border-2 border-border rounded-lg font-medium hover:border-primary/50 transition-colors">
                                    Node.js
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call To Action Section */}
            <section className="container mx-auto px-4 py-20">
                <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-primary/10 to-chart-2/10 rounded-2xl p-12 border-2 border-primary/20">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">Ready to Transform Your Sweet Shop?</h2>
                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Join hundreds of sweet shops already using our system to streamline their operations and boost sales
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="text-lg px-8">
                            Login
                        </Button>
                        <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
                            Register
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t bg-muted/50">
                <div className="container mx-auto px-4 py-12">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-3">Sweet Shop Management</h3>
                            <p className="text-muted-foreground text-sm">
                                A comprehensive full-stack solution for managing your sweet shop inventory, sales, and operations
                                efficiently.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-3">Quick Links</h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                        Documentation
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                        API Reference
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                        GitHub
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-3">Contact</h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                        Support
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                        Email Us
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                        Contact Form
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
                        <p>&copy; 2025 Sweet Shop Management System. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}