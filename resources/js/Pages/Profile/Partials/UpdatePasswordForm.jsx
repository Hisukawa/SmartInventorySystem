import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { useRef, useState } from "react";
import { toast } from "sonner"; // ✅ Import Sonner
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"; // ✅ Eye icons

export default function UpdatePasswordForm({ className = "" }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();
    const confirmPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    // State for showing passwords
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const updatePassword = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                toast.success("Password updated successfully!");
            },
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current.focus();
                }

                toast.error("Failed to update password.");
            },
        });
    };

    const inputWithToggle = (
        ref,
        value,
        onChange,
        type,
        show,
        setShow,
        placeholder,
        autoComplete
    ) => (
        <div className="relative">
            <TextInput
                ref={ref}
                value={value}
                onChange={onChange}
                type={show ? "text" : type}
                placeholder={placeholder}
                className="mt-1 block w-full pr-10"
                autoComplete={autoComplete}
            />
            <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setShow(!show)}
            >
                {show ? (
                    <EyeSlashIcon className="w-5 h-5" />
                ) : (
                    <EyeIcon className="w-5 h-5" />
                )}
            </button>
        </div>
    );

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Update Password
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Ensure your account is using a long, random password to stay
                    secure.
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                {/* Current Password */}
                <div>
                    <InputLabel
                        htmlFor="current_password"
                        value="Current Password"
                    />

                    {inputWithToggle(
                        currentPasswordInput,
                        data.current_password,
                        (e) => setData("current_password", e.target.value),
                        "password",
                        showCurrent,
                        setShowCurrent,
                        "Enter current password",
                        "current-password"
                    )}

                    <InputError
                        message={errors.current_password}
                        className="mt-2"
                    />
                </div>

                {/* New Password */}
                <div>
                    <InputLabel htmlFor="password" value="New Password" />

                    {inputWithToggle(
                        passwordInput,
                        data.password,
                        (e) => setData("password", e.target.value),
                        "password",
                        showNew,
                        setShowNew,
                        "Enter new password",
                        "new-password"
                    )}

                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Confirm Password */}
                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />

                    {inputWithToggle(
                        confirmPasswordInput,
                        data.password_confirmation,
                        (e) => setData("password_confirmation", e.target.value),
                        "password",
                        showConfirm,
                        setShowConfirm,
                        "Confirm new password",
                        "new-password"
                    )}

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>
                </div>
            </form>
        </section>
    );
}
