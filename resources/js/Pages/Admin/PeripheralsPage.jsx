import React, { useMemo, useState } from "react";
import { Link, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Swal from "sweetalert2";

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
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/Components/AdminComponents/app-sidebar";

import { Input } from "@/components/ui/input";
import EditPeripheralModal from "./Peripherals/EditPeripheralModal";

/* 🔽 Faculty-style filter imports */
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

/* ✅ Reusable Filter Component */
function PeripheralsFilter({ filters, filterOptions, onApplyFilters }) {
  const [selectedField, setSelectedField] = useState("");

  const handleReset = () => {
    // reset everything at once
    const resetFilters = {
      type: undefined,
      condition: undefined,
      room_id: undefined,
      unit_code: undefined,
    };
    setSelectedField(""); // also clear the active field selection
    onApplyFilters(resetFilters);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <FilterIcon className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="flex flex-col gap-3">
          {/* Field Selector */}
          <Select value={selectedField} onValueChange={setSelectedField}>
            <SelectTrigger>
              <SelectValue placeholder="Select filter field" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="type">Type</SelectItem>
              <SelectItem value="condition">Condition</SelectItem>
              <SelectItem value="room">Room</SelectItem>
              <SelectItem value="unit">Unit</SelectItem>
            </SelectContent>
          </Select>

          {/* Type Filter */}
          {selectedField === "type" && (
            <Select
              value={filters.type || "all"}
              onValueChange={(value) =>
                onApplyFilters({
                  ...filters,
                  type: value === "all" ? undefined : value,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {filterOptions.types.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* Condition Filter */}
          {selectedField === "condition" && (
            <Select
              value={filters.condition || "all"}
              onValueChange={(value) =>
                onApplyFilters({
                  ...filters,
                  condition: value === "all" ? undefined : value,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {filterOptions.conditions.map((cond) => (
                  <SelectItem key={cond} value={cond}>
                    {cond}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* Room Filter */}
          {selectedField === "room" && (
            <Select
              value={filters.room_id || "all"}
              onValueChange={(value) =>
                onApplyFilters({
                  ...filters,
                  room_id: value === "all" ? undefined : value,
                })
              }
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

          {/* Unit Filter */}
          {selectedField === "unit" && (
            <Select
              value={filters.unit_code || "all"}
              onValueChange={(value) =>
                onApplyFilters({
                  ...filters,
                  unit_code: value === "all" ? undefined : value,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {filterOptions.units.map((u) => (
                  <SelectItem key={u} value={u}>
                    {u}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* Reset All button */}
          <div className="flex justify-end">
            <Button size="sm" variant="outline" onClick={handleReset} className="flex items-center gap-1">
              <X className="h-4 w-4" />
              Reset All
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}



/* ✅ Main Component */
export default function PeripheralsIndex({
  peripherals,
  search,
  existingRooms,
  existingUnits,
  filters = {},
}) {
  const [searchTerm, setSearchTerm] = useState(search || "");
  const [editPeripheral, setEditPeripheral] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Build filter options
  const filterOptions = useMemo(() => {
    const uniq = (arr) => [...new Set(arr.filter((v) => v))].sort();
    return {
      types: uniq(peripherals.map((p) => p.type)),
      conditions: uniq(peripherals.map((p) => p.condition)),
      rooms: Object.fromEntries(
        existingRooms.map((r) => [String(r.id), r.room_number])
      ),
      units: uniq(peripherals.map((p) => p.unit_code)),
    };
  }, [peripherals, existingRooms]);

  function onApplyFilters(newFilters) {
    const cleaned = Object.fromEntries(
      Object.entries({
        ...newFilters,
        search: searchTerm || undefined,
      }).filter(([, v]) => v !== "" && v !== undefined)
    );
    router.get("/admin/peripherals", cleaned, {
      preserveState: true,
      replace: true,
    });
  }

  function resetFilters() {
    setSearchTerm("");
    router.get("/admin/peripherals", {}, { preserveState: true, replace: true });
  }

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      onApplyFilters(filters);
    }
  };

  // Client-side narrowing by search
  const filteredData = useMemo(() => {
    if (!searchTerm) return peripherals;
    const q = searchTerm.toLowerCase();
    return peripherals.filter((p) =>
      [
        p.peripheral_code,
        p.type,
        p.serial_number,
        p.condition,
        p.room?.room_number,
        p.unit_code,
      ]
        .filter(Boolean)
        .some((val) => val.toLowerCase().includes(q))
    );
  }, [peripherals, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  function handleDelete(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(`/admin/peripherals/${id}`);
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
                  href="/admin/peripherals"
                  aria-current="page"
                  className="font-semibold text-foreground"
                >
                  Peripherals
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <main>
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-5">Peripherals</h1>

            {/* Search + Filter + Add */}
            <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-between mb-4">
              <div className="flex gap-2 items-center">
                <PeripheralsFilter
                  filters={filters}
                  filterOptions={filterOptions}
                  onApplyFilters={onApplyFilters}
                  onReset={resetFilters}
                />

                <Input
                  placeholder="Search peripherals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleSearch}
                  className="w-64"
                />
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/admin/peripherals/create">
                  <Button>Add Peripheral</Button>
                </Link>
              </div>
            </div>

            <Card>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>Peripheral Code</TableHead>
                      <TableHead>Type</TableHead>
                       <TableHead>Brand</TableHead>
                        <TableHead>Model</TableHead>
                      <TableHead>Serial Number</TableHead>
                      <TableHead>Condition</TableHead>
                      <TableHead>Room</TableHead>
                      <TableHead>Units</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedData.length > 0 ? (
                      paginatedData.map((p, index) => (
                        <TableRow key={p.id}>
                          <TableCell>
                            {(currentPage - 1) * itemsPerPage + index + 1}
                          </TableCell>
                          <TableCell>{p.peripheral_code}</TableCell>
                          <TableCell>{p.type}</TableCell>
                           <TableCell>{p.brand}</TableCell>
                             <TableCell>{p.model}</TableCell>
                          <TableCell>{p.serial_number}</TableCell>
                          <TableCell>{p.condition}</TableCell>
                          <TableCell>
                            {p.room ? `ROOM ${p.room.room_number}` : "N/A"}
                          </TableCell>
                          <TableCell>{p.unit_code}</TableCell>
                          <TableCell className="space-x-2">
                            <Link href={`/admin/peripherals/${p.id}`}>
                              <Button variant="secondary" size="sm">
                                View
                              </Button>
                            </Link>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditPeripheral(p)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(p.id)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan="8" className="text-center">
                          No peripherals found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>

                {/* Pagination */}
                <div className="flex justify-center mt-4 space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Previous
                  </Button>
                  {[...Array(totalPages)].map((_, idx) => (
                    <Button
                      key={idx}
                      variant={currentPage === idx + 1 ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(idx + 1)}
                    >
                      {idx + 1}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        {editPeripheral && (
          <EditPeripheralModal
            peripheral={editPeripheral}
            rooms={existingRooms}
            units={existingUnits}
            onClose={() => setEditPeripheral(null)}
          />
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}
