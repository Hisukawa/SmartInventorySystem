import React, { useState, useMemo } from "react";
import { Head } from "@inertiajs/react";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
} from "@/components/ui/dialog";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
} from "@/components/ui/breadcrumb";

export default function RoomDashboard({
    room,
    equipments = [],
    systemUnits = [],
    peripherals = [],
}) {
    const [selectedItem, setSelectedItem] = useState(null);
    const [condition, setCondition] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Combine and filter items
    const filteredItems = useMemo(() => {
        let items = [...equipments, ...systemUnits, ...peripherals];

        if (filterType !== "All") {
            items = items.filter((item) => item.type === filterType);
        }

        if (searchTerm.trim() !== "") {
            const term = searchTerm.toLowerCase();
            items = items.filter((item) =>
                (
                    item.name ||
                    item.equipment_code ||
                    item.unit_code ||
                    item.peripheral_code
                )
                    .toLowerCase()
                    .includes(term)
            );
        }

        return items;
    }, [equipments, systemUnits, peripherals, filterType, searchTerm]);

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    const paginatedItems = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredItems.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredItems, currentPage]);

    const openModal = (item) => {
        setSelectedItem(item);
        setCondition(item.condition || "Good");
    };

    const closeModal = () => {
        setSelectedItem(null);
        setCondition("");
    };

    const updateCondition = async () => {
        if (!selectedItem) return;

        try {
            let endpoint =
                selectedItem.type === "Equipment"
                    ? "equipments"
                    : selectedItem.type === "System Unit"
                    ? "system-units"
                    : "peripherals";

            // ✅ fixed line (backticks for template literal)
            await axios.put(`${endpoint}/${selectedItem.id}`, { condition });

            selectedItem.condition = condition;
            closeModal();
        } catch (error) {
            console.error("Failed to update condition:", error);
        }
    };

    return (
        <>
            <Head>
                <title>{room?.room_path || "Room Dashboard"}</title>
            </Head>

            {/* Header */}
            <header className="flex h-16 items-center gap-2 px-4 border-b bg-white">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                href="/admin/rooms"
                                className="font-semibold text-foreground"
                            >
                                Dashboard
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>

            {/* Main Content */}
            <main className="m-10">
                <h1 className="text-2xl sm:text-2xl font-bold mb-4">
                    {room?.room_path || "Room"}
                </h1>

                {/* Filter & Search */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <select
                        className="border rounded p-2"
                        value={filterType}
                        onChange={(e) => {
                            setFilterType(e.target.value);
                            setCurrentPage(1);
                        }}
                    >
                        <option value="All">All Types</option>
                        <option value="Equipment">Equipment</option>
                        <option value="System Unit">System Unit</option>
                        <option value="Peripheral">Peripheral</option>
                    </select>

                    <input
                        type="text"
                        placeholder="Search by name or code..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="border rounded p-2 flex-1"
                    />
                </div>

                {/* Item Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {paginatedItems.map((item) => {
                        let conditionColor = "";
                        switch (item.condition) {
                            case "Functional":
                            case "Working":
                                conditionColor = "text-green-600";
                                break;
                            case "Under Maintenance":
                                conditionColor = "text-yellow-600";
                                break;
                            case "Defective":
                                conditionColor = "text-red-600";
                                break;
                            case "Needs Upgrade":
                                conditionColor = "text-blue-600";
                                break;
                            case "For Disposal":
                                conditionColor = "text-gray-600";
                                break;
                            default:
                                conditionColor = "text-gray-600";
                        }

                        return (
                            <Card
                                key={`${item.type}-${item.id}`}
                                className="cursor-pointer"
                                onClick={() => openModal(item)}
                            >
                                <CardContent className="mt-5">
                                    <h2 className="font-semibold text-sm sm:text-lg">
                                        {item.name ||
                                            item.equipment_code ||
                                            item.unit_code ||
                                            item.peripheral_code ||
                                            "Unnamed Item"}
                                    </h2>
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        Type: {item.type}
                                    </p>
                                    {item.room_path && (
                                        <p className="text-xs sm:text-sm text-gray-500">
                                            Room: {item.room_path}
                                        </p>
                                    )}
                                    <p
                                        className={`mt-1 font-medium text-xs sm:text-sm ${conditionColor}`}
                                    >
                                        Status: {item.condition || "Good"}
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-6 gap-2">
                        <button
                            className="px-3 py-1 border rounded disabled:opacity-50"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            Previous
                        </button>
                        <span className="px-3 py-1">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            className="px-3 py-1 border rounded disabled:opacity-50"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            Next
                        </button>
                    </div>
                )}

                {/* Modal */}
                {selectedItem && (
                    <Dialog open={!!selectedItem} onOpenChange={closeModal}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    Edit Condition -{" "}
                                    {selectedItem.name ||
                                        selectedItem.equipment_code ||
                                        selectedItem.unit_code ||
                                        selectedItem.peripheral_code ||
                                        "Unnamed Item"}
                                </DialogTitle>
                            </DialogHeader>

                            <div className="p-4">
                                <select
                                    className="border rounded p-2 w-full"
                                    value={condition}
                                    onChange={(e) =>
                                        setCondition(e.target.value)
                                    }
                                >
                                    <option value="Functional">
                                        Functional
                                    </option>
                                    <option value="Working">Working</option>
                                    <option value="Under Maintenance">
                                        Under Maintenance
                                    </option>
                                    <option value="Defective">Defective</option>
                                    <option value="Needs Upgrade">
                                        Needs Upgrade
                                    </option>
                                    <option value="For Disposal">
                                        For Disposal
                                    </option>
                                </select>
                            </div>

                            <DialogFooter>
                                <button
                                    onClick={updateCondition}
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={closeModal}
                                    className="ml-2 bg-gray-300 text-black px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                )}
            </main>
        </>
    );
}
