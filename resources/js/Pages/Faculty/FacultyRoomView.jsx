import React from "react";
import { Head } from "@inertiajs/react";
import { AppSidebar } from "@/Components/AdminComponents/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ====================================================
//      has an error try to fix it or remove it
// ====================================================
// import { Badge } from "@/components/ui/badge";
// ====================================================

import { Button } from "@/components/ui/button";

export default function FacultyRoomView({ room }) {
    return (
        <>
            <Head title={`Room - ${room.room_number}`} />
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <div className="p-6 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>{room.room_name}</CardTitle>
                                <p className="text-sm text-muted-foreground">
                                    Department: {room.department}
                                </p>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    <strong>Room Code:</strong> {room.room_path}
                                </p>
                                <p>
                                    <strong>Location:</strong>{" "}
                                    {room.location ?? "N/A"}
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Equipments</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {room.equipments.length > 0 ? (
                                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                        {room.equipments.map((eq) => (
                                            <div
                                                key={eq.id}
                                                className="border p-4 rounded-lg"
                                            >
                                                <h3 className="font-semibold">
                                                    {eq.equipment_name}
                                                </h3>
                                                <Badge
                                                    variant={
                                                        eq.condition ===
                                                        "Working"
                                                            ? "success"
                                                            : "destructive"
                                                    }
                                                    className="mt-1"
                                                >
                                                    {eq.condition}
                                                </Badge>
                                                <div className="mt-2">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                    >
                                                        Report Issue
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground">
                                        No equipment found in this room.
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}
