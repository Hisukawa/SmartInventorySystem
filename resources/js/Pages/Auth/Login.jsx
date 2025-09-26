import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card"; import { Input } from "@/components/ui/input"; import { Label } from "@/components/ui/label"; import { Button } from "@/components/ui/button"; import { Checkbox } from "@/components/ui/checkbox"; import { Head, Link, useForm } from "@inertiajs/react"; import axios from "axios"; import FaceCapture from "@/Components/Face-Capture-Component/FaceCapture";

export default function Login({ status, canResetPassword }) {
    
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    // 🔹 Normal email/password login
    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    // 🔹 Face login handler
    const handleFaceLogin = async (descriptor) => {
        try {
            const res = await axios.post(route("face.login"), {
                face_descriptor: descriptor,
            });

            alert("Login successful: " + res.data.user.name);

            // Optional: redirect to dashboard
            window.location.href = "/dashboard";

        } catch (err) {
            alert("Face not recognized");
        }
    };

    return (
        <>
            <Head title="Log in" />
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-lg overflow-hidden">
                    
                    {/* LEFT PANEL */}
                    <div className="hidden md:flex flex-col items-center justify-center bg-green-500 text-white p-8 relative">
                        <div className="flex space-x-4 mb-6">
                            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white bg-white shadow-md">
                                <img src="logo.png" alt="Logo 1" className="w-full h-full object-contain" />
                            </div>
                            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white bg-white shadow-md">
                                <img src="/ict.png" alt="Logo 2" className="w-full h-full object-contain" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-center">ICT INVENTORY SYSTEM MANAGEMENT</h2>
                        <p className="mt-3 text-sm opacity-90 text-center">Secure • Fast • Organized</p>
                    </div>

                    {/* RIGHT PANEL */}
                    <div className="p-8 flex flex-col justify-center">
                        <CardHeader className="p-0 mb-6">
                            <CardTitle className="text-2xl font-bold">Login Account</CardTitle>
                            <CardDescription>Please enter your details to log in</CardDescription>
                        </CardHeader>

                        {status && (
                            <div className="mb-4 text-sm font-medium text-green-600">{status}</div>
                        )}

                        <form onSubmit={submit} className="space-y-4">
                            {/* Email */}
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

                            {/* Password */}
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    autoComplete="current-password"
                                    onChange={(e) => setData("password", e.target.value)}
                                />
                                {errors.password && (
                                    <p className="text-sm text-red-500">{errors.password}</p>
                                )}
                            </div>

                            {/* Remember */}
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="remember"
                                    checked={data.remember}
                                    onCheckedChange={(checked) => setData("remember", Boolean(checked))}
                                />
                                <label htmlFor="remember" className="text-sm text-muted-foreground">Remember me</label>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="w-full mt-2 bg-green-500 hover:bg-green-600 text-white"
                                disabled={processing}
                            >
                                Login
                            </Button>

                            {/* Face Login */}
                            <div className="mt-6">
                                <h3 className="font-semibold mb-2">Login with Face</h3>
                                <FaceCapture onCapture={handleFaceLogin} />
                            </div>

                            {/* Info */}
                            <div className="text-center text-sm mt-6">
                                Don’t have an account?{" "}
                                <span className="text-gray-600">
                                    Please contact the ICT Department Chairperson to request one.
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
