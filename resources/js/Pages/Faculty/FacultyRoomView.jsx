import React, { useState } from "react";
import { usePage, Link, Head } from '@inertiajs/react';   // ✅ added Link
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import FacultyRoomSidebar from "@/Components/FacultyComponents/faculty-room-view-sidebar";

export default function FacultyRoomView({ room, equipments, systemUnits, peripherals }) {
    const { auth } = usePage().props;
    const [activeSection, setActiveSection] = useState("system-units");

    return (
        <>
            <Head title={`Room - ${room.room_number}`} />
            <div className="flex h-screen">
                {/* Sidebar */}
                <FacultyRoomSidebar
                    room={room}
                    active={activeSection}
                    user={auth.user}
                    onSelect={setActiveSection}
                />

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {activeSection === "system-units" && (
                        <Card>
                            <CardHeader>
                                <CardTitle>System Units</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {systemUnits.length > 0 ? (
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Unit Code</TableHead>
                                                <TableHead>Condition</TableHead>
                                                <TableHead>Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {systemUnits.map((unit) => (
                                                <TableRow key={unit.id}>
                                                    <TableCell>{unit.name}</TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            variant={
                                                                unit.condition === "Good"
                                                                    ? "success"
                                                                    : "destructive"
                                                            }
                                                        >
                                                            {unit.condition}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                      
                                                        <Link
                                                            href={route("faculty.units.show", {
                                                                room: room.id,
                                                                unit: unit.id,
                                                            })}
                                                        >
                                                            <Button size="sm" variant="outline">
                                                                View
                                                            </Button>
                                                        </Link>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                ) : (
                                    <p className="text-sm text-muted-foreground">
                                        No system units found in this room.
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {/* Peripherals */}
                    {activeSection === "peripherals" && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Peripherals</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {peripherals.length > 0 ? (
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Peripheral Code</TableHead>
                                                <TableHead>Condition</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {peripherals.map((peripheral) => (
                                                <TableRow key={peripheral.id}>
                                                    <TableCell>{peripheral.name}</TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            variant={
                                                                peripheral.condition === "Good"
                                                                    ? "success"
                                                                    : "destructive"
                                                            }
                                                        >
                                                            {peripheral.condition}
                                                        </Badge>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                ) : (
                                    <p className="text-sm text-muted-foreground">
                                        No peripherals found in this room.
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {/* Equipments */}
                    {activeSection === "equipments" && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Equipments</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {equipments.length > 0 ? (
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Equipment Code</TableHead>
                                                <TableHead>Condition</TableHead>
                                                <TableHead>Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {equipments.map((eq) => (
                                                <TableRow key={eq.id}>
                                                    <TableCell>{eq.name}</TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            variant={
                                                                eq.condition === "Good"
                                                                    ? "success"
                                                                    : "destructive"
                                                            }
                                                        >
                                                            {eq.condition}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button size="sm" variant="outline">
                                                            Report Issue
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                ) : (
                                    <p className="text-sm text-muted-foreground">
                                        No equipment found in this room.
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </>
    );
}
