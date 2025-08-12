import { Head, usePage } from "@inertiajs/react";
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

export default function ShowUser({ user }) {
    return (
        <SidebarProvider>
            <Head>
                <title>User Management</title>
            </Head>
            <AppSidebar />
            <SidebarInset>
                {/* Header */}
                <header className="flex h-16 items-center gap-2 px-4 border-b bg-white">
                    <SidebarTrigger />
                    <Separator orientation="vertical" className="h-6 mx-3" />
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
                                    href="/admin/users"
                                    aria-current="page"
                                    className="font-semibold text-foreground"
                                >
                                    User's Profile
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>

                <main className="mt-10">
                    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
                        <Head title={`${user.name} - Profile`} />

                        <div className="flex flex-col items-center space-y-4">
                            <img
                                src={user.picture || "/logo.png"} // assumes `picture` field
                                alt={user.name}
                                className="w-32 h-32 rounded-full object-cover border"
                            />
                            <h1 className="text-xl font-bold">{user.name}</h1>
                            <p className="text-gray-600">
                                {user.role || "N/A"}
                            </p>
                        </div>

                        {/* <div className="mt-6 text-center">
                            <Button asChild>
                                <a href={route("admin.users.index")}>
                                    Back to Users
                                </a>
                            </Button>
                        </div> */}
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
