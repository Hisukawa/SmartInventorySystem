import { Head, useForm } from "@inertiajs/react";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/Components/AdminComponents/app-sidebar";
import React, { useState } from "react";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";

export default function EditUser({ user }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || "",
        email: user.email || "",
        password: "",
        password_confirmation: "",
        role: user.role || "guest",
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("admin.users.update", user.id));
    };

    return (
        <>
            <SidebarProvider>
                <Head>
                    <title>User Management</title>
                </Head>
                <AppSidebar />
                <SidebarInset>
                    {/* Header */}
                    <header className="flex h-16 items-center gap-2 px-4 border-b bg-white">
                        <SidebarTrigger />
                        <Separator
                            orientation="vertical"
                            className="h-6 mx-3"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink
                                        href="/admin/users"
                                        aria-current="page"
                                    >
                                        User Lists
                                    </BreadcrumbLink>

                                    <BreadcrumbSeparator />
                                    <BreadcrumbLink
                                        href={`/admin/users/${user.id}/edit`}
                                        aria-current="page"
                                        className="font-semibold text-foreground"
                                    >
                                        Edit User
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </header>

                    <main>
                        <Head title="Edit User" />
                        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                            <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
                                <CardHeader className="p-0 mb-6">
                                    <CardTitle className="text-2xl font-bold">
                                        Edit User
                                    </CardTitle>
                                    <CardDescription>
                                        Update user details below
                                    </CardDescription>
                                </CardHeader>

                                <form onSubmit={submit} className="space-y-4">
                                    {/* Name */}
                                    <div className="space-y-1">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            name="name"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            required
                                        />
                                        {errors.name && (
                                            <p className="text-sm text-red-500">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-1">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            required
                                        />
                                        {errors.email && (
                                            <p className="text-sm text-red-500">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    {/* Password */}
                                    <div className="space-y-1">
                                        <Label htmlFor="password">
                                            Password
                                        </Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter new password (leave empty to keep current)"
                                        />
                                        {errors.password && (
                                            <p className="text-sm text-red-500">
                                                {errors.password}
                                            </p>
                                        )}
                                    </div>

                                    {/* Confirm Password */}
                                    <div className="space-y-1">
                                        <Label htmlFor="password_confirmation">
                                            Confirm Password
                                        </Label>
                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            placeholder="Re-enter new password to confirm"
                                            onChange={(e) =>
                                                setData(
                                                    "password_confirmation",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {errors.password_confirmation && (
                                            <p className="text-sm text-red-500">
                                                {errors.password_confirmation}
                                            </p>
                                        )}
                                    </div>

                                    {/* Role */}
                                    <div className="space-y-1">
                                        <Label htmlFor="role">
                                            Select Role
                                        </Label>
                                        <select
                                            id="role"
                                            name="role"
                                            value={data.role}
                                            onChange={(e) =>
                                                setData("role", e.target.value)
                                            }
                                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                            required
                                        >
                                            <option value="admin">Admin</option>
                                            <option value="faculty">
                                                Faculty
                                            </option>
                                            <option value="technician">
                                                Technician
                                            </option>
                                            <option value="guest">Guest</option>
                                        </select>
                                        {errors.role && (
                                            <p className="text-sm text-red-500">
                                                {errors.role}
                                            </p>
                                        )}
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full mt-2 bg-green-500 hover:bg-green-600 text-white"
                                        disabled={processing}
                                    >
                                        Update User
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}
