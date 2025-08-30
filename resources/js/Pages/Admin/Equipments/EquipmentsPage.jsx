import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/Components/AdminComponents/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useForm as useInertiaForm, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import { Input } from "@/components/ui/input";
import { Menu } from "@headlessui/react";

import { X } from "lucide-react";

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

const CONDITION_OPTIONS = [
  { label: "Functional", color: "bg-green-500" },
  { label: "Defective", color: "bg-red-500" },
  { label: "Under Maintenance", color: "bg-yellow-500" },
  { label: "Needs Upgrade", color: "bg-blue-500" },
  { label: "For Disposal", color: "bg-gray-500" },
];

function EquipmentsFilter({ filters, filterOptions, onApplyFilters }) {
  const [selectedField, setSelectedField] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  const handleValueChange = (value) => {
    const newValue = value === "all" ? "" : value;
    setSelectedValue(newValue);

    if (selectedField === "type") {
      onApplyFilters({ ...filters, type: newValue });
    } else if (selectedField === "condition") {
      onApplyFilters({ ...filters, condition: newValue });
    } else if (selectedField === "room") {
      onApplyFilters({ ...filters, room_id: newValue });
    }
  };

  const handleReset = () => {
      setSelectedField("");
    setSelectedValue("");
    if (selectedField === "type") {
      onApplyFilters({ ...filters, type: "" });
    } else if (selectedField === "condition") {
      onApplyFilters({ ...filters, condition: "" });
    } else if (selectedField === "room") {
      onApplyFilters({ ...filters, room_id: "" });
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          Filters
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="flex flex-col gap-3">
          {/* Field Dropdown */}
          <Select
            value={selectedField}
            onValueChange={(val) => {
              setSelectedField(val);
              setSelectedValue(""); // reset on field change
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

          {/* Value Dropdowns */}
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
                {Object.entries(filterOptions.rooms).map(([id, num]) => (
                  <SelectItem key={id} value={id}>
                    Room {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* Reset only shows if a value is picked */}
                {(selectedField || selectedValue) && (
            <div className="flex justify-end">
                <Button
                size="sm"
                variant="outline"
                onClick={handleReset}
                className="flex items-center gap-1 text-red-600 hover:bg-red-50"
                >
                <X className="w-4 h-4" />
                Reset
                </Button>
            </div>
            )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default function EquipmentsPage({ equipments, existingRooms, filters = {} }) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const itemsPerPage = 10;

  const { delete: destroy } = useInertiaForm();

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

  function onApplyFilters(newFilters) {
    const cleaned = Object.fromEntries(
      Object.entries({
        ...newFilters,
        search: search || undefined,
      }).filter(([, v]) => v !== "" && v !== undefined)
    );
    router.get("/equipments", cleaned, {
      preserveState: true,
      replace: true,
    });
  }

  function resetFilters() {
    setSearch("");
    router.get("/equipments", {}, { preserveState: true, replace: true });
  }

  const totalPages = Math.ceil(equipments.length / itemsPerPage) || 1;
  const paginatedEquipments = equipments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getConditionColor = (value) => {
    const match = CONDITION_OPTIONS.find(
      (opt) => opt.label.toLowerCase() === value.toLowerCase()
    );
    return match ? match.color : "bg-muted";
  };

  function handleDelete(eq) {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete equipment ${eq.equipment_code}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        destroy(route("equipments.destroy", eq.id));
      }
    });
  }

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
                <BreadcrumbLink href="#">Assets</BreadcrumbLink>
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

          {/* Search + Filter + Add */}
          <div className="flex justify-between items-center mb-4 gap-2">
            <div className="flex gap-2 items-center">
              <EquipmentsFilter
                filters={filters}
                filterOptions={filterOptions}
                onApplyFilters={onApplyFilters}
                onReset={resetFilters}
              />
              <Input
                placeholder="Search Equipment Code..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onApplyFilters(filters)}
                className="text-sm sm:text-base px-2 sm:px-3 py-1 sm:py-2 flex-1 max-w-xs"
              />
            </div>
            <Button
              className="text-sm sm:text-base px-3 py-1 sm:py-2"
              onClick={() => router.visit("/equipments/addequipment")}
            >
              Add Equipment
            </Button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Equipment Code</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedEquipments.length > 0 ? (
                  paginatedEquipments.map((eq, index) => (
                    <TableRow key={eq.id}>
                      <TableCell>
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </TableCell>
                      <TableCell>{eq.equipment_code}</TableCell>
                      <TableCell>{eq.room?.room_number || "N/A"}</TableCell>
                      <TableCell>{eq.type}</TableCell>
                      <TableCell>
                        {eq.condition && (
                          <div className="mt-1 text-sm flex items-center gap-2">
                            <span
                              className={cn(
                                "inline-block w-3 h-3 rounded-full",
                                getConditionColor(eq.condition)
                              )}
                            />
                            <span className="capitalize">{eq.condition}</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {/* Desktop: buttons */}
                        <div className="hidden sm:flex gap-2 justify-center">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() =>
                              router.visit(`/equipments/view/${eq.equipment_code}`)
                            }
                          >
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => setSelectedEquipment(eq)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(eq)}
                          >
                            Delete
                          </Button>
                        </div>
                        {/* Mobile: 3-dot menu */}
                        <div className="flex sm:hidden justify-center">
                          <Menu as="div" className="relative inline-block text-left">
                            <Menu.Button className="p-2 rounded hover:bg-gray-100">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                            </Menu.Button>
                            <Menu.Items className="absolute right-0 mt-2 w-32 origin-top-right bg-white border rounded shadow-lg focus:outline-none z-10">
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={`${active ? "bg-gray-100" : ""} w-full text-left px-3 py-2 text-sm`}
                                    onClick={() => router.visit(`/equipments/view/${eq.equipment_code}`)}
                                  >
                                    View
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={`${active ? "bg-gray-100" : ""} w-full text-left px-3 py-2 text-sm`}
                                    onClick={() => setSelectedEquipment(eq)}
                                  >
                                    Edit
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={`${active ? "bg-gray-100" : ""} w-full text-left px-3 py-2 text-sm text-red-600`}
                                    onClick={() => handleDelete(eq)}
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
                    <TableCell colSpan={6} className="text-center py-4">
                      No equipments found.
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
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Previous
              </Button>
              <Button
                size="sm"
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </Button>
            </div>
          </div>

          {/* Edit Modal */}
          {selectedEquipment && (
            <EditEquipmentModal
              equipment={selectedEquipment}
              rooms={existingRooms}
              onClose={() => setSelectedEquipment(null)}
            />
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
