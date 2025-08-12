import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/Components/AdminComponents/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import AddUnitModal from "@/Pages/SystemUnits/Modal/AddUnitModal";
import EditUnitModal from "@/Pages/SystemUnits/Modal/EditUnitModal";
import { useForm as useInertiaForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import { router } from "@inertiajs/react";
import { Input } from "@/components/ui/input";

import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import QRCode from "react-qr-code";
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

export default function UnitsPage({ units, rooms }) {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUnit, setSelectedUnit] = useState(null); // 👈 for modal
    const itemsPerPage = 10;

    const { delete: destroy } = useInertiaForm(); // ✅ correct usage

    const [roomFilter, setRoomFilter] = useState("All Rooms");
    const [processorFilter, setProcessorFilter] = useState("All Processors");
    const [ramFilter, setRamFilter] = useState("All RAM");
    const [storageFilter, setStorageFilter] = useState("All Storage");
    const [gpuFilter, setGpuFilter] = useState("All GPU");
    const [motherboardFilter, setMotherboardFilter] =
        useState("All Motherboards");
    const [conditionFilter, setConditionFilter] = useState("All Conditions");

    const uniqueRooms = [
        "All Rooms",
        ...new Set(units.map((u) => u.room?.room_number || "N/A")),
    ];
    const uniqueProcessors = [
        "All Processors",
        ...new Set(units.map((u) => u.processor || "N/A")),
    ];
    const uniqueRAM = ["All RAM", ...new Set(units.map((u) => u.ram || "N/A"))];
    const uniqueStorage = [
        "All Storage",
        ...new Set(units.map((u) => u.storage || "N/A")),
    ];
    const uniqueGPU = ["All GPU", ...new Set(units.map((u) => u.gpu || "N/A"))];
    const uniqueMotherboards = [
        "All Motherboards",
        ...new Set(units.map((u) => u.motherboard || "N/A")),
    ];
    const uniqueConditions = [
        "All Conditions",
        ...new Set(units.map((u) => u.condition || "N/A")),
    ];

    // Get unique dropdown options
    const uniqueValues = (key) => {
        return [...new Set(units.map((u) => u[key]).filter(Boolean))];
    };

    // Filter logic
    const filteredUnits = useMemo(() => {
        return units.filter((unit) => {
            const codeMatch = unit.unit_code
                .toLowerCase()
                .includes(search.toLowerCase());
            const roomMatch = unit.room?.room_number
                ?.toLowerCase()
                .includes(search.toLowerCase());

            const matchesFilters =
                (roomFilter === "All Rooms" ||
                    unit.room?.room_number === roomFilter) &&
                (processorFilter === "All Processors" ||
                    unit.processor === processorFilter) &&
                (ramFilter === "All RAM" || unit.ram === ramFilter) &&
                (storageFilter === "All Storage" ||
                    unit.storage === storageFilter) &&
                (gpuFilter === "All GPU" || unit.gpu === gpuFilter) &&
                (motherboardFilter === "All Motherboards" ||
                    unit.motherboard === motherboardFilter) &&
                (conditionFilter === "All Conditions" ||
                    unit.condition === conditionFilter);

            return (codeMatch || roomMatch) && matchesFilters;
        });
    }, [
        units,
        search,
        roomFilter,
        processorFilter,
        ramFilter,
        storageFilter,
        gpuFilter,
        motherboardFilter,
        conditionFilter,
    ]);

    const totalPages = Math.ceil(filteredUnits.length / itemsPerPage);
    const paginatedUnits = filteredUnits.slice(
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
                                    href="/units"
                                    aria-current="page"
                                    className="font-semibold text-foreground"
                                >
                                    System Unit Lists
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>

                <main className="w-full px-6 py-4">
                    <h1 className="text-2xl font-semibold mb-4">
                        System Units
                    </h1>

                    {/* Search and Add Unit */}
                    <div className="flex justify-between items-center mb-4">
                        <Input
                            placeholder="Search Unit Code..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="mb-4 w-full sm:w-1/3"
                        />

                        <AddUnitModal rooms={rooms} />
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="h-10">
                                    <TableHead className="px-2 py-1">
                                        #
                                    </TableHead>
                                    <TableHead className="px-2 py-1">
                                        Unit Code
                                    </TableHead>

                                    <TableHead className="px-2 py-1">
                                        <select
                                            className="border rounded px-1 pr-7 py-0.5 text-xs"
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
                                            className="border rounded px-1 py-0.5 text-xs"
                                            value={processorFilter}
                                            onChange={(e) =>
                                                setProcessorFilter(
                                                    e.target.value
                                                )
                                            }
                                        >
                                            {uniqueProcessors.map((proc) => (
                                                <option key={proc} value={proc}>
                                                    {proc}
                                                </option>
                                            ))}
                                        </select>
                                    </TableHead>

                                    <TableHead className="px-2 py-1">
                                        <select
                                            className="border rounded px-1 py-0.5 text-xs"
                                            value={ramFilter}
                                            onChange={(e) =>
                                                setRamFilter(e.target.value)
                                            }
                                        >
                                            {uniqueRAM.map((ram) => (
                                                <option key={ram} value={ram}>
                                                    {ram}
                                                </option>
                                            ))}
                                        </select>
                                    </TableHead>

                                    <TableHead className="px-2 py-1">
                                        <select
                                            className="border rounded px-1 py-0.5 text-xs"
                                            value={storageFilter}
                                            onChange={(e) =>
                                                setStorageFilter(e.target.value)
                                            }
                                        >
                                            {uniqueStorage.map((store) => (
                                                <option
                                                    key={store}
                                                    value={store}
                                                >
                                                    {store}
                                                </option>
                                            ))}
                                        </select>
                                    </TableHead>

                                    <TableHead className="px-2 py-1">
                                        <select
                                            className="border rounded px-1 py-0.5 text-xs"
                                            value={gpuFilter}
                                            onChange={(e) =>
                                                setGpuFilter(e.target.value)
                                            }
                                        >
                                            {uniqueGPU.map((gpu) => (
                                                <option key={gpu} value={gpu}>
                                                    {gpu}
                                                </option>
                                            ))}
                                        </select>
                                    </TableHead>

                                    <TableHead className="px-2 py-1">
                                        <select
                                            className="border rounded px-1 py-0.5 text-xs"
                                            value={motherboardFilter}
                                            onChange={(e) =>
                                                setMotherboardFilter(
                                                    e.target.value
                                                )
                                            }
                                        >
                                            {uniqueMotherboards.map((mb) => (
                                                <option key={mb} value={mb}>
                                                    {mb}
                                                </option>
                                            ))}
                                        </select>
                                    </TableHead>

                                    <TableHead className="px-2 py-1">
                                        <select
                                            className="border rounded px-1 py-0.5 text-xs"
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
                                {paginatedUnits.length > 0 ? (
                                    paginatedUnits.map((unit, index) => (
                                        <TableRow key={unit.id}>
                                            <TableCell>
                                                {(currentPage - 1) *
                                                    itemsPerPage +
                                                    index +
                                                    1}
                                            </TableCell>
                                            <TableCell>
                                                {unit.unit_code}
                                            </TableCell>
                                            <TableCell>
                                                ROOM{" "}
                                                {unit.room?.room_number ||
                                                    "N/A"}
                                            </TableCell>
                                            <TableCell>
                                                {unit.processor}
                                            </TableCell>
                                            <TableCell>{unit.ram}</TableCell>
                                            <TableCell>
                                                {unit.storage}
                                            </TableCell>
                                            <TableCell>{unit.gpu}</TableCell>
                                            <TableCell>
                                                {unit.motherboard}
                                            </TableCell>
                                            <TableCell>
                                                {unit.condition && (
                                                    <div className="mt-1 text-sm flex items-center gap-2">
                                                        <span
                                                            className={cn(
                                                                "inline-block w-3 h-3 rounded-full",
                                                                getConditionColor(
                                                                    unit.condition
                                                                )
                                                            )}
                                                        />
                                                        <span className="capitalize">
                                                            {unit.condition}
                                                        </span>
                                                    </div>
                                                )}
                                            </TableCell>
                                            {/* <TableCell>
                                                <div className="w-20 h-20">
                                                    <QRCode
                                                        value={`${window.location.origin}/equipment/${unit.unit_code}`}
                                                        size={64}
                                                    />
                                                </div>
                                            </TableCell> */}
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="secondary"
                                                        onClick={() =>
                                                            router.visit(
                                                                `/system-units/view/${unit.unit_code}`
                                                            )
                                                        }
                                                    >
                                                        View
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="secondary"
                                                        onClick={() =>
                                                            setSelectedUnit(
                                                                unit
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() => {
                                                            Swal.fire({
                                                                title: `Delete ${unit.unit_code}?`,
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
                                                                (result) => {
                                                                    if (
                                                                        result.isConfirmed
                                                                    ) {
                                                                        destroy(
                                                                            `/system-units/${unit.id}`
                                                                        );
                                                                        Swal.fire(
                                                                            "Deleted!",
                                                                            `Unit ${unit.unit_code} has been deleted.`,
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
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={10}
                                            className="text-center py-4"
                                        >
                                            No matching units found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-between items-center mt-4">
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

                    {/* Edit Modal Rendered Outside Table */}
                    {selectedUnit && (
                        <EditUnitModal
                            unit={selectedUnit}
                            rooms={rooms}
                            onClose={() => setSelectedUnit(null)}
                        />
                    )}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
