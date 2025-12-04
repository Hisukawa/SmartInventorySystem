import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/Components/AdminComponents/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { router } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import Notification from "@/Components/AdminComponents/Notification";
import EditEquipmentModalPage from "./EditEquipmentPage";
import { Filter as FilterIcon, X, Printer } from "lucide-react";
import QRCode from "react-qr-code";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Menu } from "@headlessui/react";
import { Eye, Edit2, Trash2, MoreVertical } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactDOMServer from "react-dom/server.browser";
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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// ✅ Condition Colors
const CONDITION_COLORS = {
    Working: "bg-green-200 text-green-800",
    "Not Working": "bg-red-200 text-red-800",
    "Intermittent Issue": "bg-yellow-200 text-yellow-800",
    "Needs Cleaning": "bg-blue-200 text-blue-800",
    "For Replacement": "bg-orange-200 text-orange-800",
    "For Disposal": "bg-gray-200 text-gray-800",
    Condemned: "bg-black text-white",
    "Minor Damage": "bg-yellow-200 text-yellow-800",
    "Needs Repair": "bg-red-200 text-red-800",
    "Intermittent Connectivity": "bg-yellow-200 text-yellow-800",
    "No Signal": "bg-red-200 text-red-800",
    "Needs Configuration": "bg-blue-200 text-blue-800",
    Expired: "bg-red-300 text-red-900",
    "Needs Refill": "bg-blue-200 text-blue-900",
    Rusting: "bg-orange-200 text-orange-900",
    "To Be Diagnosed": "bg-blue-100 text-blue-700",
};

function EquipmentsFilter({ filters, filterOptions, onApplyFilters }) {
    const [selectedField, setSelectedField] = useState("");
    const [selectedValue, setSelectedValue] = useState("");

    const handleValueChange = (value) => {
        const newValue = value === "all" ? "" : value;
        setSelectedValue(newValue);

        if (selectedField === "type")
            onApplyFilters({ ...filters, type: newValue });
        else if (selectedField === "condition")
            onApplyFilters({ ...filters, condition: newValue });
        else if (selectedField === "room")
            onApplyFilters({ ...filters, room_id: newValue });
    };

    const handleReset = () => {
        setSelectedField("");
        setSelectedValue("");
        onApplyFilters({ type: "", condition: "", room_id: "" });
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]">
                    <FilterIcon className="h-4 w-4" /> {/* <-- add this */}
                    Filters
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72">
                <div className="flex flex-col gap-3">
                    <Select
                        value={selectedField}
                        onValueChange={(val) => {
                            setSelectedField(val);
                            setSelectedValue("");
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select filter field" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="type">Type</SelectItem>
                            <SelectItem value="condition">Condition</SelectItem>
                            <SelectItem value="room">Room</SelectItem>
                        </SelectContent>
                    </Select>

                    {selectedField === "type" && (
                        <Select
                            value={selectedValue || "all"}
                            onValueChange={handleValueChange}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                {filterOptions.types.map((t) => (
                                    <SelectItem key={t} value={t}>
                                        {t}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}

                    {selectedField === "condition" && (
                        <Select
                            value={selectedValue || "all"}
                            onValueChange={handleValueChange}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Condition" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                {filterOptions.conditions.map((c) => (
                                    <SelectItem key={c} value={c}>
                                        {c}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}

                    {selectedField === "room" && (
                        <Select
                            value={selectedValue || "all"}
                            onValueChange={handleValueChange}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Room" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                {Object.entries(filterOptions.rooms).map(
                                    ([id, num]) => (
                                        <SelectItem key={id} value={id}>
                                            Room {num}
                                        </SelectItem>
                                    )
                                )}
                            </SelectContent>
                        </Select>
                    )}

                    {(selectedField || selectedValue) && (
                        <div className="flex justify-end">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={handleReset}
                                className="flex items-center gap-1 text-red-600 hover:bg-red-50"
                            >
                                Reset
                            </Button>
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default function EquipmentsPage({
    equipments,
    existingRooms,
    filters = {},
}) {
    const [downloadPanelOpen, setDownloadPanelOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [selectedEquipments, setSelectedEquipments] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const handleRoomChange = (roomId) => {
        setSelectedRoom(roomId);
        setSelectedEquipments([]);
        setSelectAll(false);
    };

    // Select or deselect all equipments in room
    const toggleSelectAll = () => {
        if (selectAll) {
            setSelectedEquipments([]);
        } else if (selectedRoom) {
            const roomEquipments = equipments
                .filter((e) => e.room_id === selectedRoom)
                .map((e) => e.id);
            setSelectedEquipments(roomEquipments);
        }
        setSelectAll(!selectAll);
    };

    // Toggle single equipment selection
    const toggleEquipment = (id) => {
        setSelectedEquipments((prev) =>
            prev.includes(id) ? prev.filter((eid) => eid !== id) : [...prev, id]
        );
    };

    // Download QR codes for selected equipments
    const downloadSelectedEquipmentQR = async () => {
        if (selectedEquipments.length === 0) {
            alert("Select at least one equipment.");
            return;
        }

        const selected = equipments.filter((e) =>
            selectedEquipments.includes(e.id)
        );
        const zip = new JSZip();

        for (const e of selected) {
            const qrValue = `${window.location.origin}/equipment/${e.equipment_code}`;
            const svgString = ReactDOMServer.renderToString(
                <QRCode value={qrValue} size={256} />
            );

            const blob = new Blob([svgString], { type: "image/svg+xml" });
            const url = URL.createObjectURL(blob);
            const img = new Image();

            await new Promise((resolve) => {
                img.onload = () => {
                    const padding = 20;
                    const textHeight = 50;
                    const canvas = document.createElement("canvas");
                    canvas.width = img.width + padding * 2;
                    canvas.height = img.height + padding * 2 + textHeight;
                    const ctx = canvas.getContext("2d");

                    ctx.fillStyle = "#fff";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);

                    ctx.drawImage(img, padding, padding);

                    ctx.fillStyle = "#000";
                    ctx.font = "bold 18px Arial";
                    ctx.textAlign = "center";
                    ctx.fillText(
                        `Room ${e.room?.room_number} - ${e.equipment_code}`,
                        canvas.width / 2,
                        img.height + padding + 30
                    );

                    canvas.toBlob((canvasBlob) => {
                        zip.file(`${e.equipment_code}.png`, canvasBlob);
                        resolve();
                    }, "image/png");
                };
                img.src = url;
            });

            URL.revokeObjectURL(url);
        }

        zip.generateAsync({ type: "blob" }).then((content) => {
            saveAs(content, "Equipment_QR_Codes.zip");
        });
    };

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [activeFilters, setActiveFilters] = useState({});
    const itemsPerPage = 10;

    const filterOptions = useMemo(() => {
        const uniq = (arr) => [...new Set(arr.filter(Boolean))].sort();
        return {
            types: uniq(equipments.map((e) => e.type)),
            conditions: uniq(equipments.map((e) => e.condition)),
            rooms: Object.fromEntries(
                existingRooms.map((r) => [String(r.id), r.room_number])
            ),
        };
    }, [equipments, existingRooms]);

    const [editModal, setEditModal] = useState({
        open: false,
        equipmentCode: null,
    });
    // Filter + Search
    const filteredData = equipments.filter((eq) => {
        const matchesSearch =
            eq.equipment_code
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            eq.equipment_name.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType =
            !activeFilters.type || eq.type === activeFilters.type;
        const matchesCondition =
            !activeFilters.condition ||
            eq.condition === activeFilters.condition;
        const matchesRoom =
            !activeFilters.room || eq.room?.id === parseInt(activeFilters.room);

        return matchesSearch && matchesType && matchesCondition && matchesRoom;
    });

    const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handle Print
    const handlePrint = () => {
        if (!filteredData || filteredData.length === 0) {
            alert("No data available to print.");
            return;
        }

        const printWindow = window.open("", "", "width=900,height=700");

        const tableRows = filteredData
            .map(
                (eq, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${eq.equipment_code}</td>
                <td>${eq.equipment_name}</td>
                <td>${eq.room?.room_number ?? "N/A"}</td>
                <td>${eq.type}</td>
                <td>${eq.condition ?? "N/A"}</td>
            </tr>
        `
            )
            .join("");

        printWindow.document.write(`
            <html>
                <head>
                    <title>Equipment Report</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        h2 { text-align: center; margin-bottom: 20px; color: #2e7d32; }
                        p { text-align: right; font-size: 12px; color: #666; }
                        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                        th, td { border: 1px solid #ccc; padding: 8px; text-align: left; font-size: 13px; }
                        th { background-color: #2e7d32; color: white; }
                        tr:nth-child(even) { background-color: #f9f9f9; }
                        @media print { body { -webkit-print-color-adjust: exact; } }
                    </style>
                </head>
                <body>
                    <h2>Equipment Report</h2>
                    <p>Generated on: ${new Date().toLocaleString()}</p>
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Equipment Code</th>
                                <th>Equipment Name</th>
                                <th>Room</th>
                                <th>Type</th>
                                <th>Condition</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRows}
                        </tbody>
                    </table>
                </body>
            </html>
        `);

        printWindow.document.close();
        printWindow.print();
    };

    // Handle Filters
    const onApplyFilters = (filters) => {
        setActiveFilters(filters);
        setCurrentPage(1);
    };

    const resetFilters = () => {
        setActiveFilters({});
        setCurrentPage(1);
    };

    return (
        <SidebarProvider>
            <AppSidebar />

            {editModal.open && (
                <EditEquipmentModalPage
                    equipment={equipments.find(
                        (e) => e.equipment_code === editModal.equipmentCode
                    )}
                    rooms={existingRooms}
                    onClose={() =>
                        setEditModal({ open: false, equipmentCode: null })
                    }
                />
            )}
            <SidebarInset>
                <header className="sticky top-0 z-20 bg-white border-b px-6 py-3 flex items-center gap-2">
                    <SidebarTrigger />
                    <Separator orientation="vertical" className="h-6 mx-3" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#">Assets</BreadcrumbLink>
                                <BreadcrumbSeparator />
                                <BreadcrumbLink
                                    href="/equipments"
                                    className="font-semibold text-foreground"
                                >
                                    Equipments
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="flex-1" />
                    <Notification />
                </header>

                <main className="w-full px-6 py-4">
                    {/* Search + Filter + Print */}
                    <h1 className="text-2xl font-bold mb-5">Equipments</h1>
                    <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-between mb-4">
                        <div className="flex gap-2 items-center flex-1">
                            <Input
                                placeholder="Search Equipment..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="flex-1 min-w-0 sm:max-w-xs w-full border-[hsl(142,34%,51%)]"
                            />

                            <EquipmentsFilter
                                filters={activeFilters}
                                filterOptions={filterOptions}
                                onApplyFilters={onApplyFilters}
                                onReset={resetFilters}
                            />
                            {/* Print Button with Printer Icon */}
                            <Button
                                onClick={handlePrint}
                                className="flex items-center gap-2 bg-[hsl(183,40%,45%)] text-white border-none hover:bg-[hsl(183,40%,38%)]"
                            >
                                <Printer className="h-4 w-4" />
                                Print
                            </Button>

                            <Button
                                className="bg-[hsl(142,34%,51%)] text-white hover:bg-[hsl(142,34%,45%)]"
                                onClick={() => setDownloadPanelOpen(true)}
                            >
                                Download QR Codes
                            </Button>

                            {/* Filter Button with Filter Icon */}
                        </div>

                        <Button
                            className="bg-[hsl(142,31%,51%)] hover:bg-[hsl(142,31%,45%)] text-white"
                            onClick={() =>
                                router.visit("/equipments/addequipment")
                            }
                        >
                            Add Equipment
                        </Button>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto rounded-lg border">
                        <Table className="w-full table-auto text-center">
                            <TableHeader>
                                <TableRow className="bg-[hsl(142,34%,85%)] text-[hsl(142,34%,25%)] hover:bg-[hsl(142,34%,80%)]">
                                    <TableHead className="px-5 py-1 text-center">
                                        #
                                    </TableHead>
                                    <TableHead className="px-5 py-1 text-center">
                                        Equipment Code
                                    </TableHead>
                                    <TableHead className="px-5 py-1 text-center">
                                        Equipment Name
                                    </TableHead>
                                    <TableHead className="px-5 py-1 text-center">
                                        Room
                                    </TableHead>
                                    <TableHead className="px-5 py-1 text-center">
                                        Type
                                    </TableHead>
                                    <TableHead className="px-5 py-1 text-center">
                                        Condition
                                    </TableHead>
                                    <TableHead className="px-5 py-1 text-center">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {paginatedData.length > 0 ? (
                                    paginatedData.map((eq, index) => (
                                        <TableRow
                                            key={eq.id}
                                            className="hover:shadow-sm"
                                        >
                                            <TableCell className="px-5 py-2 align-middle">
                                                {(currentPage - 1) *
                                                    itemsPerPage +
                                                    index +
                                                    1}
                                            </TableCell>
                                            <TableCell className="px-5 py-2 align-middle">
                                                {eq.equipment_code}
                                            </TableCell>
                                            <TableCell className="px-5 py-2 align-middle">
                                                {eq.equipment_name}
                                            </TableCell>
                                            <TableCell className="px-5 py-2 align-middle">
                                                {eq.room?.room_number ?? "N/A"}
                                            </TableCell>
                                            <TableCell className="px-5 py-2 align-middle">
                                                {eq.type}
                                            </TableCell>
                                            <TableCell className="px-5 py-2 align-middle">
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                        CONDITION_COLORS[
                                                            eq.condition
                                                        ] ||
                                                        "bg-gray-200 text-gray-800"
                                                    }`}
                                                >
                                                    {eq.condition}
                                                </span>
                                            </TableCell>

                                            {/* Actions */}
                                            <TableCell className="px-5 py-2 align-middle">
                                                {/* Desktop Buttons */}
                                                <div className="hidden sm:flex justify-center items-center gap-2">
                                                    <Button
                                                        size="sm"
                                                        className="bg-[hsl(142,34%,51%)] text-white flex items-center gap-2"
                                                        onClick={() =>
                                                            router.visit(
                                                                `/admin/equipments/${eq.equipment_code}`
                                                            )
                                                        }
                                                    >
                                                        <Eye className="h-4 w-4" />{" "}
                                                        View
                                                    </Button>

                                                    <Button
                                                        size="sm"
                                                        className="bg-[hsl(142,34%,51%)] text-white flex items-center gap-2"
                                                        onClick={() =>
                                                            setEditModal({
                                                                open: true,
                                                                equipmentCode:
                                                                    eq.equipment_code,
                                                            })
                                                        }
                                                    >
                                                        <Edit2 className="h-4 w-4" />{" "}
                                                        Edit
                                                    </Button>

                                                    {/* Optional Delete */}
                                                    {/* <Button
                                                        size="sm"
                                                        className="bg-red-500 text-white flex items-center gap-2"
                                                        onClick={() =>
                                                            handleDelete(
                                                                eq.equipment_code
                                                            )
                                                        }
                                                    >
                                                        <Trash2 className="h-4 w-4" />{" "}
                                                        Delete
                                                    </Button> */}
                                                </div>

                                                {/* Mobile Dropdown */}
                                                <div className="sm:hidden flex justify-center">
                                                    <Menu
                                                        as="div"
                                                        className="relative inline-block text-left"
                                                    >
                                                        <Menu.Button className="p-2 rounded bg-[hsl(142,34%,51%)] text-white">
                                                            <MoreVertical className="h-5 w-5" />
                                                        </Menu.Button>
                                                        <Menu.Items className="absolute right-0 mt-2 w-28 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none z-50">
                                                            <div className="px-1 py-1">
                                                                <Menu.Item>
                                                                    {({
                                                                        active,
                                                                    }) => (
                                                                        <button
                                                                            className={`${
                                                                                active
                                                                                    ? "bg-[hsl(142,34%,90%)]"
                                                                                    : ""
                                                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-700`}
                                                                            onClick={() =>
                                                                                router.visit(
                                                                                    `/admin/equipments/${eq.equipment_code}`
                                                                                )
                                                                            }
                                                                        >
                                                                            <Eye className="h-4 w-4 mr-2" />{" "}
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
                                                                                    ? "bg-[hsl(142,34%,90%)]"
                                                                                    : ""
                                                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-700`}
                                                                            onClick={() =>
                                                                                setEditModal(
                                                                                    {
                                                                                        open: true,
                                                                                        equipmentCode:
                                                                                            eq.equipment_code,
                                                                                    }
                                                                                )
                                                                            }
                                                                        >
                                                                            <Edit2 className="h-4 w-4 mr-2" />{" "}
                                                                            Edit
                                                                        </button>
                                                                    )}
                                                                </Menu.Item>
                                                                {/* Optional Delete */}
                                                                {/* <Menu.Item>
                                                                    {({
                                                                        active,
                                                                    }) => (
                                                                        <button
                                                                            className={`${
                                                                                active
                                                                                    ? "bg-red-100"
                                                                                    : ""
                                                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm text-red-600`}
                                                                            onClick={() =>
                                                                                handleDelete(
                                                                                    eq.equipment_code
                                                                                )
                                                                            }
                                                                        >
                                                                            <Trash2 className="h-4 w-4 mr-2" />{" "}
                                                                            Delete
                                                                        </button>
                                                                    )}
                                                                </Menu.Item> */}
                                                            </div>
                                                        </Menu.Items>
                                                    </Menu>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={7}
                                            className="text-center py-4"
                                        >
                                            No equipments found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>

                        {/* Pagination Controls */}
                        <div className="flex justify-between items-center p-4">
                            <span className="text-sm text-muted-foreground">
                                Showing{" "}
                                {filteredData.length === 0
                                    ? 0
                                    : (currentPage - 1) * itemsPerPage + 1}{" "}
                                –{" "}
                                {Math.min(
                                    currentPage * itemsPerPage,
                                    filteredData.length
                                )}{" "}
                                of {filteredData.length} equipments
                            </span>

                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    disabled={currentPage === 1}
                                    onClick={() =>
                                        setCurrentPage(currentPage - 1)
                                    }
                                >
                                    Previous
                                </Button>

                                {Array.from(
                                    { length: totalPages },
                                    (_, idx) => idx + 1
                                )
                                    .filter((page) => {
                                        if (page === 1 || page === totalPages)
                                            return true;
                                        return (
                                            page >= currentPage - 2 &&
                                            page <= currentPage + 2
                                        );
                                    })
                                    .map((page, idx, arr) => (
                                        <React.Fragment key={page}>
                                            {idx > 0 &&
                                                arr[idx] - arr[idx - 1] > 1 && (
                                                    <span className="px-2">
                                                        ...
                                                    </span>
                                                )}
                                            <Button
                                                size="sm"
                                                variant={
                                                    currentPage === page
                                                        ? "default"
                                                        : "outline"
                                                }
                                                onClick={() =>
                                                    setCurrentPage(page)
                                                }
                                            >
                                                {page}
                                            </Button>
                                        </React.Fragment>
                                    ))}

                                <Button
                                    size="sm"
                                    variant="outline"
                                    disabled={currentPage === totalPages}
                                    onClick={() =>
                                        setCurrentPage(currentPage + 1)
                                    }
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div
                        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-xl transform transition-transform duration-300 z-50 flex flex-col
${downloadPanelOpen ? "translate-x-0" : "translate-x-full"}`}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-lg font-semibold">
                                Download Equipment QR Codes by Room
                            </h2>
                            <Button
                                variant="ghost"
                                onClick={() => setDownloadPanelOpen(false)}
                            >
                                ✕
                            </Button>
                        </div>

                        {/* Room Select */}
                        <div className="p-4 border-b">
                            <label className="block mb-2 font-medium text-sm text-gray-700">
                                Select Room
                            </label>
                            <Select
                                value={selectedRoom || ""}
                                onValueChange={(value) =>
                                    handleRoomChange(Number(value))
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="-- Select Room --" />
                                </SelectTrigger>
                                <SelectContent>
                                    {existingRooms.map((room) => (
                                        <SelectItem
                                            key={room.id}
                                            value={room.id.toString()}
                                        >
                                            {room.room_number}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Select All Equipments */}
                        {selectedRoom && (
                            <div className="flex items-center gap-2 p-4 border-b">
                                <Checkbox
                                    checked={selectAll}
                                    onCheckedChange={toggleSelectAll}
                                />
                                <span className="text-sm font-medium text-gray-700">
                                    Select All Equipments in Room
                                </span>
                            </div>
                        )}

                        {/* Equipments List */}
                        {selectedRoom && (
                            <ScrollArea className="flex-1 overflow-y-auto p-4 space-y-2">
                                {equipments
                                    .filter((e) => e.room_id === selectedRoom)
                                    .map((e) => (
                                        <div
                                            key={e.id}
                                            className="flex items-center gap-2 p-2 border rounded-md hover:bg-gray-50 transition"
                                        >
                                            <Checkbox
                                                checked={selectedEquipments.includes(
                                                    e.id
                                                )}
                                                onCheckedChange={() =>
                                                    toggleEquipment(e.id)
                                                }
                                            />
                                            <span className="text-sm text-gray-800">
                                                {e.equipment_code}
                                            </span>
                                        </div>
                                    ))}
                            </ScrollArea>
                        )}

                        {/* Footer Buttons */}
                        <div className="p-4 border-t flex justify-end gap-2">
                            <Button
                                variant="secondary"
                                onClick={() => setDownloadPanelOpen(false)}
                            >
                                Close
                            </Button>
                            <Button
                                className="bg-[hsl(142,34%,51%)] text-white hover:bg-[hsl(142,34%,45%)]"
                                onClick={downloadSelectedEquipmentQR}
                            >
                                Download Selected
                            </Button>
                        </div>
                    </div>

                    {/* Overlay */}
                    {downloadPanelOpen && (
                        <div
                            className="fixed inset-0 bg-black/40 z-40"
                            onClick={() => setDownloadPanelOpen(false)}
                        />
                    )}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
