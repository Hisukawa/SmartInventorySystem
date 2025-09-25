import { Head, usePage, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/Components/AdminComponents/app-sidebar";
import React, { useState, useMemo } from "react";
import Notification from "@/Components/AdminComponents/Notification";

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

import { Input } from "@/components/ui/input"; // ✅ Fix: Import Input
import Swal from "sweetalert2"; // ✅ Fix: Import Swal for delete confirmation

export default function UserManagement({ users }) {
    const { props } = usePage();
    const currentUserId = props.auth.user.id;

    // ✅ State for search + pagination
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // ✅ Filter users based on search input
    const filteredUsers = useMemo(() => {
        return users.filter(
            (user) =>
                user.name.toLowerCase().includes(search.toLowerCase()) ||
                user.email.toLowerCase().includes(search.toLowerCase())
        );
    }, [users, search]);

    // ✅ Pagination
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage) || 1;
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // ✅ Handle Enter key in search
    const handleSearchKey = (e) => {
        if (e.key === "Enter") {
            setCurrentPage(1);
        }
    };

    // ✅ Delete user
    const handleDelete = (id) => {
        router.delete(route("admin.users.destroy", id), {
            onSuccess: () => {
                console.log("User deleted successfully");
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };

    return (
        <SidebarProvider>
            <Head>
                <title>User Management</title>
            </Head>
            <AppSidebar />
            <SidebarInset>
                {/* Fixed content header inside the main area */}
                <header className="sticky top-0 z-20 bg-white border-b px-6 py-3">
                    <div className="flex items-center gap-2">
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
                                        className="font-semibold text-foreground"
                                    >
                                        User Lists
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <div className="flex-1" />
                        <Notification />
                    </div>
                </header>

                <main className="w-full px-6 py-4">
                    <h1 className="text-2xl font-semibold mb-4">
                        User Management
                    </h1>

                    {/* Search + Add User */}
                    <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-between mb-4">
                        <div className="flex gap-2 items-center">
                            <Input
                                placeholder="Search Name or Email"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setCurrentPage(1);
                                }}
                                onKeyDown={handleSearchKey}
                                className="w-64"
                            />
                        </div>

                        <Button asChild     className="text-sm sm:text-base px-3 py-1 sm:py-2 bg-[hsl(142,31%,51%)] hover:bg-[hsl(142,31%,45%)] text-white font-medium">
                            <a href={route("register")}>Register User</a>
                        </Button>
                    </div>

                    {/* Table with rounded corners & clean UI */}
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <Table className="w-full">
                            <TableHeader>
                               <TableRow className="bg-[hsl(142,34%,85%)] text-[hsl(142,34%,25%)] hover:bg-[hsl(142,34%,80%)]">
                                    <TableHead className="w-12 px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                        #
                                    </TableHead>
                                    <TableHead className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                        Name
                                    </TableHead>
                                    <TableHead className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                        Email
                                    </TableHead>
                                    <TableHead className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                        Role
                                    </TableHead>
                                    <TableHead className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wide text-center">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {paginatedUsers.length > 0 ? (
                                    paginatedUsers.map((user, index) => (
                                        <TableRow
                                            key={user.id}
                                            className="hover:bg-gray-50 even:bg-gray-50/50 transition-colors"
                                        >
                                            <TableCell className="px-4 py-3 text-sm text-gray-700">
                                                {(currentPage - 1) *
                                                    itemsPerPage +
                                                    index +
                                                    1}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-sm font-medium text-gray-900">
                                                {user.name}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-sm text-gray-700">
                                                {user.email}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-sm capitalize text-gray-700">
                                                {user.role}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-center">
                                                {user.id !== currentUserId && (
                                                    <div className="flex justify-center gap-2">
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="px-3"
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
                                                            className="px-3"
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
                                                            className="px-3"
                                                            onClick={() => {
                                                                Swal.fire({
                                                                    title: `Delete ${user.name}?`,
                                                                    text: "This action cannot be undone!",
                                                                    icon: "warning",
                                                                    showCancelButton: true,
                                                                    confirmButtonColor:
                                                                        "#d33",
                                                                    cancelButtonColor:
                                                                        "#3085d6",
                                                                    confirmButtonText:
                                                                        "Yes, delete it!",
                                                                }).then(
                                                                    (
                                                                        result
                                                                    ) => {
                                                                        if (
                                                                            result.isConfirmed
                                                                        ) {
                                                                            handleDelete(
                                                                                user.id
                                                                            );
                                                                            Swal.fire(
                                                                                "Deleted!",
                                                                                `${user.name} has been deleted.`,
                                                                                "success"
                                                                            );
                                                                        }
                                                                    }
                                                                );
                                                            }}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </div>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={5}
                                            className="text-center py-6 px-4 text-gray-500"
                                        >
                                            No users found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
