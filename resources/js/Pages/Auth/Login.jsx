import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Head, Link, useForm } from "@inertiajs/react";
import axios from "axios";

// Helper to decode Base64URL → Uint8Array
function base64urlToUint8Array(base64url) {
  if (!base64url || typeof base64url !== "string") {
    throw new Error("Expected base64url string.");
  }
  const padding = "=".repeat((4 - (base64url.length % 4)) % 4);
  const base64 = (base64url + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  return Uint8Array.from([...raw].map((c) => c.charCodeAt(0)));
}


// Helper to encode ArrayBuffer → Base64URL
function arrayBufferToBase64Url(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}

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

// ... (rest of the code) ...

// 🔹 WebAuthn Login with multiple authenticat
const loginWithDevice = async () => {
    try {
        const { data: options } = await axios.post("/webauthn/login/options", {
            email: data.email,
        });

        // Defensive checks and error handling from backend
        if (options.error) {
            alert(options.error); // Display specific error message from the backend
            return;
        }

        if (!options || !options.challenge) {
            console.error("Bad login/options response:", options);
            alert("Failed to get WebAuthn login options. No challenge received.");
            return;
        }

        const allowCreds = Array.isArray(options.allowCredentials) ? options.allowCredentials : [];
        if (allowCreds.length === 0) {
            alert("No registered WebAuthn device found for this user. Please register a device first.");
            return;
        }

        // Decode fields
        options.challenge = base64urlToUint8Array(options.challenge);
        options.allowCredentials = allowCreds.map((cred) => ({
            ...cred,
            id: base64urlToUint8Array(cred.id),
        }));

        // (Optional) you can keep these, but they aren't required by WebAuthn for get()
        const publicKeyOptions = {
            ...options,
            // authenticatorSelection only applies to `create()`, not `get()`.
            // Keeping it here doesn't break, but it's not necessary.
            userVerification: "preferred",
        };

        const assertion = await navigator.credentials.get({ publicKey: publicKeyOptions });

        const credential = {
            id: assertion.id,
            rawId: arrayBufferToBase64Url(assertion.rawId),
            type: assertion.type,
            response: {
                clientDataJSON: arrayBufferToBase64Url(assertion.response.clientDataJSON),
                authenticatorData: arrayBufferToBase64Url(assertion.response.authenticatorData),
                signature: arrayBufferToBase64Url(assertion.response.signature),
                userHandle: assertion.response.userHandle
                    ? arrayBufferToBase64Url(assertion.response.userHandle)
                    : null,
            },
        };

        const res = await axios.post("/webauthn/login", {
            email: data.email,
            credential,
        });

        if (res.data?.success) {
            window.location.href = "/faculty/dashboard";
        } else {
            alert(res.data?.message || "Login failed.");
        }
    } catch (err) {
        console.error(err);
        // Surface backend errors clearly
        const msg = err.response?.data?.message || err.response?.data?.error || err.message;
        alert(`WebAuthn login failed: ${msg}`);
    }
};

// ... (rest of the code) ...



    return (
        <>
            <Head title="Log in" />
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-lg overflow-hidden">
                    {/* LEFT PANEL */}
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
                                    src="/ict.png"
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

                    {/* RIGHT PANEL - LOGIN FORM */}
                    <div className="p-8 flex flex-col justify-center">
                        <CardHeader className="p-0 mb-6">
                            <CardTitle className="text-2xl font-bold">
                                Login Account
                            </CardTitle>
                            <CardDescription>
                                Please enter your details to log in
                            </CardDescription>
                        </CardHeader>

                        {status && (
                            <div className="mb-4 text-sm font-medium text-green-600">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-4">
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
                                <div className="flex justify-between">
                                    <Label htmlFor="password">Password</Label>
                                </div>
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
                                className="w-full mt-2 bg-green-500 hover:bg-green-600 text-white"
                                disabled={processing}
                            >
                                Login
                            </Button>

                            <Button
                                type="button"
                                className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white"
                                onClick={loginWithDevice}
                            >
                                Login with Device
                            </Button>

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
