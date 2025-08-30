import React, { useState, useMemo, useEffect } from "react";
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

/* 🔽 Added for Faculty-style filter UI */
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
import { Filter as FilterIcon, X } from "lucide-react";

const CONDITION_OPTIONS = [
  { label: "Functional", color: "bg-green-500" },
  { label: "Defective", color: "bg-red-500" },
  { label: "Under Maintenance", color: "bg-yellow-500" },
  { label: "Needs Upgrade", color: "bg-blue-500" },
  { label: "For Disposal", color: "bg-gray-500" },
];

/* ✅ Reusable Filter (Faculty-style) */
/* ✅ Reusable Filter (Faculty-style) */
function UnitsFilter({ filters = {}, filterOptions, onApplyFilters, onReset }) {
  const [selectedField, setSelectedField] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    const fieldsOrder = [
      "unit_code",
      "room_id",
      "processor",
      "ram",
      "storage",
      "gpu",
      "motherboard",
      "condition",
    ];
    const found = fieldsOrder.find((f) => !!filters[f]);
    if (found) {
      setSelectedField(found);
      setSelectedValue(String(filters[found]));
    } else {
      setSelectedField("");
      setSelectedValue("");
    }
  }, [filters]);

  const fields = [
    { value: "unit_code", label: "Unit Code" },
    { value: "room_id", label: "Room" },
    { value: "processor", label: "Processor" },
    { value: "ram", label: "RAM" },
    { value: "storage", label: "Storage" },
    { value: "gpu", label: "GPU" },
    { value: "motherboard", label: "Motherboard" },
    { value: "condition", label: "Condition" },
  ];

  function handleValueChange(value) {
    const newValue = value === "all" ? "" : value;
    setSelectedValue(newValue);

    const newFilters = { ...filters };
    if (selectedField) newFilters[selectedField] = newValue;
    onApplyFilters(newFilters);
  }

  const hasAnyFilter =
    !!filters.unit_code ||
    !!filters.room_id ||
    !!filters.processor ||
    !!filters.ram ||
    !!filters.storage ||
    !!filters.gpu ||
    !!filters.motherboard ||
    !!filters.condition;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <FilterIcon className="h-4 w-4" />
          Filter
          {hasAnyFilter && (
            <X
              className="h-4 w-4 ml-1 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedField("");
                setSelectedValue("");
                onReset();
              }}
            />
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[calc(100vw-2rem)] sm:w-[380px] p-4">
        <h4 className="font-medium mb-3 text-lg">Filter Options</h4>
        <div className="flex flex-col gap-4">
          {/* Field selector */}
          <Select
            value={selectedField}
            onValueChange={(val) => {
              setSelectedField(val);
              setSelectedValue("");
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Field" />
            </SelectTrigger>
            <SelectContent>
              {fields.map((f) => (
                <SelectItem key={f.value} value={f.value}>
                  {f.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Value selector (depends on field) */}
          {selectedField === "unit_code" && (
            <Select value={selectedValue || "all"} onValueChange={handleValueChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Unit Code" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {filterOptions.unit_codes.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {selectedField === "room_id" && (
            <Select value={selectedValue || "all"} onValueChange={handleValueChange}>
              <SelectTrigger className="w-full">
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

          {selectedField === "processor" && (
            <Select value={selectedValue || "all"} onValueChange={handleValueChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Processor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {filterOptions.processors.map((v) => (
                  <SelectItem key={v} value={v}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {selectedField === "ram" && (
            <Select value={selectedValue || "all"} onValueChange={handleValueChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select RAM" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {filterOptions.rams.map((v) => (
                  <SelectItem key={v} value={v}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {selectedField === "storage" && (
            <Select value={selectedValue || "all"} onValueChange={handleValueChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Storage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {filterOptions.storages.map((v) => (
                  <SelectItem key={v} value={v}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {selectedField === "gpu" && (
            <Select value={selectedValue || "all"} onValueChange={handleValueChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select GPU" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {filterOptions.gpus.map((v) => (
                  <SelectItem key={v} value={v}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {selectedField === "motherboard" && (
            <Select value={selectedValue || "all"} onValueChange={handleValueChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Motherboard" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {filterOptions.motherboards.map((v) => (
                  <SelectItem key={v} value={v}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {selectedField === "condition" && (
            <Select value={selectedValue || "all"} onValueChange={handleValueChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {filterOptions.conditions.map((v) => (
                  <SelectItem key={v} value={v}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* ✅ Reset button inside filter */}
          <div className="flex justify-end">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setSelectedField("");
                setSelectedValue("");
                onReset();
              }}
            >
              <X className="mr-1 h-4 w-4" /> Reset
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}


export default function UnitsPage({ units, rooms, filters = {} }) {
  const [search, setSearch] = useState(filters.search || "");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const itemsPerPage = 10;

  const { delete: destroy } = useInertiaForm();

  // Build filterOptions from current data
  const filterOptions = useMemo(() => {
    const uniq = (arr) =>
      [...new Set(arr.filter((v) => v !== null && v !== ""))].sort();
    return {
      rooms: Object.fromEntries(rooms.map((r) => [String(r.id), r.room_number])),
      unit_codes: uniq(units.map((u) => u.unit_code)),
      processors: uniq(units.map((u) => u.processor)),
      rams: uniq(units.map((u) => u.ram)),
      storages: uniq(units.map((u) => u.storage)),
      gpus: uniq(units.map((u) => u.gpu)),
      motherboards: uniq(units.map((u) => u.motherboard)),
      conditions: uniq(units.map((u) => u.condition)),
    };
  }, [units, rooms]);

  // Backend filtering (same style as Faculty-reporting.jsx)
  function onApplyFilters(newFilters) {
    const cleaned = Object.fromEntries(
      Object.entries({
        ...newFilters,
        search: search || undefined,
      }).filter(([, v]) => v !== "" && v !== undefined)
    );

    // Adjust path to your index route if needed
    router.get("/system-units", cleaned, {
      preserveState: true,
      replace: true,
    });
  }

  function resetFilters() {
    setSearch("");
    router.get("/system-units", {}, { preserveState: true, replace: true });
  }

  function handleSearchKey(e) {
    if (e.key === "Enter") {
      onApplyFilters(filters); // use current server filters + search
    }
  }

  // Client-side search (kept, so typing still narrows immediately)
  const filteredUnits = useMemo(() => {
    if (!search) return units;
    const q = search.toLowerCase();
    return units.filter((u) => {
      const code = u.unit_code?.toLowerCase() || "";
      const room = u.room?.room_number?.toLowerCase() || "";
      return code.includes(q) || room.includes(q);
    });
  }, [units, search]);

  const totalPages = Math.ceil(filteredUnits.length / itemsPerPage) || 1;
  const paginatedUnits = filteredUnits.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getConditionColor = (value) => {
    const match = CONDITION_OPTIONS.find(
      (opt) => opt.label.toLowerCase() === (value || "").toLowerCase()
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
          <h1 className="text-2xl font-semibold mb-4">System Units</h1>

          {/* Search + Filter + Add */}
          <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-between mb-4">
            <div className="flex gap-2 items-center">
              <UnitsFilter
                filters={filters}
                filterOptions={filterOptions}
                onApplyFilters={onApplyFilters}
                onReset={resetFilters}
              />

              <Input
                placeholder="Search Unit Code or Room"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                onKeyDown={handleSearchKey}
                className="w-64"
              />
            </div>

            <AddUnitModal rooms={rooms} />
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="h-10">
                  <TableHead className="px-2 py-1">#</TableHead>
                  <TableHead className="px-2 py-1">Unit Code</TableHead>
                  <TableHead className="px-2 py-1">Room</TableHead>
                  <TableHead className="px-2 py-1">Processor</TableHead>
                  <TableHead className="px-2 py-1">RAM</TableHead>
                  <TableHead className="px-2 py-1">Storage</TableHead>
                  <TableHead className="px-2 py-1">GPU</TableHead>
                  <TableHead className="px-2 py-1">Motherboard</TableHead>
                  <TableHead className="px-2 py-1">Condition</TableHead>
                  <TableHead className="px-2 py-1">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedUnits.length > 0 ? (
                  paginatedUnits.map((unit, index) => (
                    <TableRow key={unit.id}>
                      <TableCell>
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </TableCell>
                      <TableCell>{unit.unit_code}</TableCell>
                      <TableCell>
                        ROOM {unit.room?.room_number || "N/A"}
                      </TableCell>
                      <TableCell>{unit.processor}</TableCell>
                      <TableCell>{unit.ram}</TableCell>
                      <TableCell>{unit.storage}</TableCell>
                      <TableCell>{unit.gpu}</TableCell>
                      <TableCell>{unit.motherboard}</TableCell>
                      <TableCell>
                        {unit.condition && (
                          <div className="mt-1 text-sm flex items-center gap-2">
                            <span
                              className={cn(
                                "inline-block w-3 h-3 rounded-full",
                                getConditionColor(unit.condition)
                              )}
                            />
                            <span className="capitalize">{unit.condition}</span>
                          </div>
                        )}
                      </TableCell>

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
                            onClick={() => setSelectedUnit(unit)}
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
                                confirmButtonColor: "#d33",
                                cancelButtonColor: "#3085d6",
                                confirmButtonText: "Yes, delete it!",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  // same endpoint you already use
                                  const { delete: destroy } = useInertiaForm();
                                  destroy(`/system-units/${unit.id}`);
                                  Swal.fire(
                                    "Deleted!",
                                    `Unit ${unit.unit_code} has been deleted.`,
                                    "success"
                                  );
                                }
                              });
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
                    <TableCell colSpan={10} className="text-center py-4">
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
