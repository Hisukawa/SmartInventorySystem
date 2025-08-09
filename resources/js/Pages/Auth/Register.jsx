import {
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        agree: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <>
            <Head title="Register" />
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-lg overflow-hidden">

                    {/* LEFT PANEL - IMAGE & TITLE */}
                    <div className="hidden md:flex flex-col items-center justify-center bg-green-500 text-white p-8 relative">
                        <div className="flex space-x-4 mb-6">
                            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white bg-white shadow-md">
                                <img
                                    src="logo.png"
                                    alt="Logo 1"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white bg-white shadow-md">
                                <img
                                    src="ict.png"
                                    alt="Logo 2"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-center">
                            ICT INVENTORY SYSTEM MANAGEMENT
                        </h2>
                        <p className="mt-3 text-sm opacity-90 text-center">
                            Secure • Fast • Organized
                        </p>
                    </div>

                    {/* RIGHT PANEL - REGISTER FORM */}
                    <div className="p-8 flex flex-col justify-center">
                        <CardHeader className="p-0 mb-6">
                            <CardTitle className="text-2xl font-bold">
                                Create Account
                            </CardTitle>
                            <CardDescription>
                                Fill in your details to sign up
                            </CardDescription>
                        </CardHeader>

                        <form onSubmit={submit} className="space-y-4">
                            <div className="space-y-1">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    autoComplete="name"
                                    onChange={(e) => setData("name", e.target.value)}
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-500">{errors.name}</p>
                                )}
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    autoComplete="username"
                                    onChange={(e) => setData("email", e.target.value)}
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500">{errors.email}</p>
                                )}
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    autoComplete="new-password"
                                    onChange={(e) => setData("password", e.target.value)}
                                />
                                {errors.password && (
                                    <p className="text-sm text-red-500">{errors.password}</p>
                                )}
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="password_confirmation">Confirm Password</Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData("password_confirmation", e.target.value)
                                    }
                                />
                                {errors.password_confirmation && (
                                    <p className="text-sm text-red-500">{errors.password_confirmation}</p>
                                )}
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="agree"
                                    checked={data.agree}
                                    onCheckedChange={(checked) =>
                                        setData("agree", Boolean(checked))
                                    }
                                />
                                <label htmlFor="agree" className="text-sm text-muted-foreground">
                                    I agree to the terms & conditions
                                </label>
                            </div>

                            <Button
                                type="submit"
                                className="w-full mt-2 bg-green-500 hover:bg-green-600 text-white"
                                disabled={processing}
                            >
                                Register
                            </Button>

                            <div className="text-center text-sm mt-6">
                                Already have an account?{" "}
                                <Link
                                    href={route("login")}
                                    className="font-medium text-green-600 hover:underline"
                                >
                                    Login
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
