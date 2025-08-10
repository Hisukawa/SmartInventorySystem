import { useForm, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Swal from "sweetalert2";
import { Separator } from "@/components/ui/separator";
import { Head } from "@inertiajs/react";
import { AppSidebar } from "@/components/app-sidebar";

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

export default function AddRoomPage() {
    const { data, setData, post, processing, errors } = useForm({
        room_number: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post("/admin/rooms", {
            preserveScroll: true,
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    title: "Room added successfully!",
                    timer: 1500,
                    showConfirmButton: false,
                });
                router.visit("/admin/rooms"); // Go back to list after success
            },
        });
    };

    return (
        <SidebarProvider>
            <Head>
                <title>Dashboard</title>
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
                                <BreadcrumbLink href="/admin/rooms">
                                    Room Lists
                                </BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    href={`/admin/rooms/create`}
                                    aria-current="page"
                                    className="font-semibold text-foreground"
                                >
                                    View Unit
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>

                {/* Content */}
                <main>
                    <div className="max-w-lg mx-auto mt-10">
                        <h1 className="text-xl font-bold mb-4">Add New Room</h1>
                        <form onSubmit={submit} className="space-y-4">
                            <Input
                                placeholder="e.g. 101"
                                value={data.room_number}
                                onChange={(e) =>
                                    setData("room_number", e.target.value)
                                }
                            />
                            {errors.room_number && (
                                <p className="text-sm text-red-500">
                                    {errors.room_number}
                                </p>
                            )}
                            <Button type="submit" disabled={processing}>
                                Add Room
                            </Button>
                        </form>
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
