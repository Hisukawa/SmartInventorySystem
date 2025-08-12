import { Head, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/Components/AdminComponents/app-sidebar";
import React, { useState } from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
} from "@/components/ui/breadcrumb";

import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";

export default function UserManagement({ users }) {
    const { props } = usePage();
    const currentUserId = props.auth.user.id;

    const handleDelete = (id) => {
        if (confirm("Are you sure?")) {
            destroy(route("admin.users.destroy", id));
        }
    };

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
                                    className="font-semibold text-foreground"
                                >
                                    User Lists
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>

                <main>
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-2xl font-bold">
                                User Management
                            </h1>
                            <Button asChild>
                                <a href={route("register")}>Register User</a>
                            </Button>
                        </div>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.role}</TableCell>
                                        <TableCell className="space-x-2">
                                            {user.id !== currentUserId && (
                                                <>
                                                    <Button
                                                        size="sm"
                                                        variant="secondary"
                                                        asChild
                                                    >
                                                        <a
                                                            href={route(
                                                                "admin.users.show",
                                                                user.id
                                                            )}
                                                        >
                                                            View
                                                        </a>
                                                    </Button>

                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        asChild
                                                    >
                                                        <a
                                                            href={route(
                                                                "admin.users.edit",
                                                                user.id
                                                            )}
                                                        >
                                                            Edit
                                                        </a>
                                                    </Button>

                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() =>
                                                            handleDelete(
                                                                user.id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </Button>
                                                </>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
