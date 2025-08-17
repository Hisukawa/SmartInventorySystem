import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/Components/AdminComponents/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useForm as useInertiaForm, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import { Input } from "@/components/ui/input";
import { Menu } from "@headlessui/react";

import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";

import {
    SidebarProvider,
    SidebarInset,
    SidebarTrigger,
} from "@/components/ui/sidebar";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const CONDITION_OPTIONS = [
    { label: "Functional", color: "bg-green-500" },
    { label: "Defective", color: "bg-red-500" },
    { label: "Under Maintenance", color: "bg-yellow-500" },
    { label: "Needs Upgrade", color: "bg-blue-500" },
    { label: "For Disposal", color: "bg-gray-500" },
];

export default function EquipmentsPage({ equipments, rooms }) {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedEquipment, setSelectedEquipment] = useState(null);
    const itemsPerPage = 10;

    const { delete: destroy } = useInertiaForm();

    // Filters
    const [roomFilter, setRoomFilter] = useState("All Rooms");
    const [typeFilter, setTypeFilter] = useState("All Types");
    const [conditionFilter, setConditionFilter] = useState("All Conditions");

    const uniqueRooms = [
        "All Rooms",
        ...new Set(equipments.map((e) => e.room?.room_number || "N/A")),
    ];

    const uniqueTypes = [
        "All Types",
        ...new Set(equipments.map((e) => e.type || "N/A")),
    ];

    const uniqueConditions = [
        "All Conditions",
        ...new Set(equipments.map((e) => e.condition || "N/A")),
    ];

    const filteredEquipments = useMemo(() => {
        return equipments.filter((eq) => {
            const codeMatch = eq.equipment_code
                .toLowerCase()
                .includes(search.toLowerCase());
            const roomMatch = eq.room?.room_number
                ?.toLowerCase()
                .includes(search.toLowerCase());

            const matchesFilters =
                (roomFilter === "All Rooms" ||
                    eq.room?.room_number === roomFilter) &&
                (typeFilter === "All Types" || eq.type === typeFilter) &&
                (conditionFilter === "All Conditions" ||
                    eq.condition === conditionFilter);

            return (codeMatch || roomMatch) && matchesFilters;
        });
    }, [equipments, search, roomFilter, typeFilter, conditionFilter]);

    const totalPages = Math.ceil(filteredEquipments.length / itemsPerPage);
    const paginatedEquipments = filteredEquipments.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const getConditionColor = (value) => {
        const match = CONDITION_OPTIONS.find(
            (opt) => opt.label.toLowerCase() === value.toLowerCase()
        );
        return match ? match.color : "bg-muted";
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 items-center gap-2 px-4 border-b bg-white">
                    <SidebarTrigger />
                    <Separator orientation="vertical" className="h-6 mx-3" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#" aria-current="page">
                                    Assets
                                </BreadcrumbLink>
                                <BreadcrumbSeparator />
                                <BreadcrumbLink
                                    href="/equipments"
                                    aria-current="page"
                                    className="font-semibold text-foreground"
                                >
                                    Equipment List
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>

                <main className="w-full px-6 py-4">
                    <h1 className="text-2xl font-semibold mb-4">Equipments</h1>

                    {/* Search & Add */}
                    <div className="flex justify-between items-center mb-4 gap-2">
                        <Input
                            placeholder="Search Equipment Code..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="text-sm sm:text-base px-2 sm:px-3 py-1 sm:py-2 flex-1 max-w-xs"
                        />

                        <Button
                            className="text-sm sm:text-base px-3 py-1 sm:py-2"
                            onClick={() =>
                                router.visit("/equipments/addequipment")
                            }
                        >
                            Add Equipment
                        </Button>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto rounded-lg border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="px-2 py-1">
                                        #
                                    </TableHead>
                                    <TableHead className="px-2 py-1">
                                        Equipment Code
                                    </TableHead>

                                    <TableHead className="px-2 py-1">
                                        <select
                                            className="w-full border rounded px-2 py-1 text-xs"
                                            value={roomFilter}
                                            onChange={(e) =>
                                                setRoomFilter(e.target.value)
                                            }
                                        >
                                            {uniqueRooms.map((room) => (
                                                <option key={room} value={room}>
                                                    {room}
                                                </option>
                                            ))}
                                        </select>
                                    </TableHead>

                                    <TableHead className="px-2 py-1">
                                        <select
                                            className="w-full border rounded px-2 py-1 text-xs"
                                            value={typeFilter}
                                            onChange={(e) =>
                                                setTypeFilter(e.target.value)
                                            }
                                        >
                                            {uniqueTypes.map((type) => (
                                                <option key={type} value={type}>
                                                    {type}
                                                </option>
                                            ))}
                                        </select>
                                    </TableHead>

                                    <TableHead className="px-2 py-1">
                                        <select
                                            className="w-full border rounded px-2 py-1 text-xs"
                                            value={conditionFilter}
                                            onChange={(e) =>
                                                setConditionFilter(
                                                    e.target.value
                                                )
                                            }
                                        >
                                            {uniqueConditions.map((cond) => (
                                                <option key={cond} value={cond}>
                                                    {cond}
                                                </option>
                                            ))}
                                        </select>
                                    </TableHead>

                                    <TableHead className="px-2 py-1 text-center">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedEquipments.length > 0 ? (
                                    paginatedEquipments.map((eq, index) => (
                                        <TableRow key={eq.id}>
                                            <TableCell>
                                                {(currentPage - 1) *
                                                    itemsPerPage +
                                                    index +
                                                    1}
                                            </TableCell>
                                            <TableCell>
                                                {eq.equipment_code}
                                            </TableCell>
                                            <TableCell>
                                                {eq.room?.room_number || "N/A"}
                                            </TableCell>
                                            <TableCell>{eq.type}</TableCell>
                                            <TableCell>
                                                {eq.condition && (
                                                    <div className="mt-1 text-sm flex items-center gap-2">
                                                        <span
                                                            className={cn(
                                                                "inline-block w-3 h-3 rounded-full",
                                                                getConditionColor(
                                                                    eq.condition
                                                                )
                                                            )}
                                                        />
                                                        <span className="capitalize">
                                                            {eq.condition}
                                                        </span>
                                                    </div>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {/* Large screens: show buttons */}
                                                <div className="hidden sm:flex gap-2 justify-center">
                                                    <Button
                                                        size="sm"
                                                        variant="secondary"
                                                        onClick={() =>
                                                            router.visit(
                                                                `/equipments/view/${eq.equipment_code}`
                                                            )
                                                        }
                                                    >
                                                        View
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="secondary"
                                                        onClick={() =>
                                                            setSelectedEquipment(
                                                                eq
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() =>
                                                            handleDelete(eq)
                                                        }
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>

                                                {/* Small screens: show 3-dot menu */}
                                                <div className="flex sm:hidden justify-center">
                                                    <Menu
                                                        as="div"
                                                        className="relative inline-block text-left"
                                                    >
                                                        <Menu.Button className="p-2 rounded hover:bg-gray-100">
                                                            <svg
                                                                className="w-5 h-5"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z" />
                                                            </svg>
                                                        </Menu.Button>
                                                        <Menu.Items className="absolute right-0 mt-2 w-32 origin-top-right bg-white border rounded shadow-lg focus:outline-none z-10">
                                                            <Menu.Item>
                                                                {({
                                                                    active,
                                                                }) => (
                                                                    <button
                                                                        className={`${
                                                                            active
                                                                                ? "bg-gray-100"
                                                                                : ""
                                                                        } w-full text-left px-3 py-2 text-sm`}
                                                                        onClick={() =>
                                                                            router.visit(
                                                                                `/equipments/view/${eq.equipment_code}`
                                                                            )
                                                                        }
                                                                    >
                                                                        View
                                                                    </button>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({
                                                                    active,
                                                                }) => (
                                                                    <button
                                                                        className={`${
                                                                            active
                                                                                ? "bg-gray-100"
                                                                                : ""
                                                                        } w-full text-left px-3 py-2 text-sm`}
                                                                        onClick={() =>
                                                                            setSelectedEquipment(
                                                                                eq
                                                                            )
                                                                        }
                                                                    >
                                                                        Edit
                                                                    </button>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({
                                                                    active,
                                                                }) => (
                                                                    <button
                                                                        className={`${
                                                                            active
                                                                                ? "bg-gray-100"
                                                                                : ""
                                                                        } w-full text-left px-3 py-2 text-sm text-red-600`}
                                                                        onClick={() =>
                                                                            handleDelete(
                                                                                eq
                                                                            )
                                                                        }
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                )}
                                                            </Menu.Item>
                                                        </Menu.Items>
                                                    </Menu>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={6}
                                            className="text-center py-4"
                                        >
                                            No matching equipments found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2">
                        <span className="text-sm text-muted-foreground">
                            Page {currentPage} of {totalPages}
                        </span>
                        <div className="flex gap-2">
                            <Button
                                size="sm"
                                variant="outline"
                                disabled={currentPage === 1}
                                onClick={() =>
                                    setCurrentPage((prev) => prev - 1)
                                }
                            >
                                Previous
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                disabled={currentPage === totalPages}
                                onClick={() =>
                                    setCurrentPage((prev) => prev + 1)
                                }
                            >
                                Next
                            </Button>
                        </div>
                    </div>

                    {/* Edit Modal */}
                    {selectedEquipment && (
                        <EditEquipmentModal
                            equipment={selectedEquipment}
                            rooms={rooms}
                            onClose={() => setSelectedEquipment(null)}
                        />
                    )}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
