import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Head, Link, useForm } from "@inertiajs/react";
import { FaApple, FaGoogle, FaFacebookF } from "react-icons/fa";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <>
            <Head title="Log in" />
            <div className="min-h-screen flex items-center justify-center bg-muted">
                <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-lg overflow-hidden">
                    {/* LEFT COLUMN - FORM */}
                    <div className="p-8">
                        <CardHeader className="p-0 mb-6">
                            <CardTitle className="text-2xl font-bold">
                                Welcome
                            </CardTitle>
                            <CardDescription>Login</CardDescription>
                        </CardHeader>

                        {status && (
                            <div className="mb-4 text-sm font-medium text-green-600">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-4">
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    autoComplete="username"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-1">
                                <div className="flex justify-between">
                                    <Label htmlFor="password">Password</Label>
                                    {canResetPassword && (
                                        <Link
                                            href={route("password.request")}
                                            className="text-sm text-muted-foreground hover:underline"
                                        >
                                            Forgot your password?
                                        </Link>
                                    )}
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    autoComplete="current-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                                {errors.password && (
                                    <p className="text-sm text-red-500">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="remember"
                                    checked={data.remember}
                                    onCheckedChange={(checked) =>
                                        setData("remember", Boolean(checked))
                                    }
                                />
                                <label
                                    htmlFor="remember"
                                    className="text-sm text-muted-foreground"
                                >
                                    Remember me
                                </label>
                            </div>

                            <Button
                                type="submit"
                                className="w-full mt-2"
                                disabled={processing}
                            >
                                Login
                            </Button>

                            <div className="relative mt-6 mb-2">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t"></span>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-white px-2 text-muted-foreground">
                                        Or continue with
                                    </span>
                                </div>
                            </div>

                            <div className="text-center text-sm mt-6">
                                Don’t have an account?{" "}
                                <Link
                                    href={route("register")}
                                    className="font-medium text-primary hover:underline"
                                >
                                    Sign up
                                </Link>
                            </div>
                        </form>
                    </div>

                    {/* RIGHT COLUMN - LOGO SECTION */}
                    <div className="hidden md:flex items-center justify-center bg-green-700 text-white">
                        <div className="flex flex-col items-center justify-center text-center px-6">
                            <div className="w-28 h-28 rounded-full mb-4 overflow-hidden shadow-lg border-4 border-white bg-white">
                                <img
                                    src="/logo.png" // Update path if needed
                                    alt="Logo"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <h2 className="text-xl font-bold">
                                Inventory Management System
                            </h2>
                            <p className="text-sm mt-2 text-white">
                                Secure. Fast. Organized.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
