import React, { useState, useEffect } from "react";
import { usePage, Link, Head } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Menu, Eye, FileText, Filter as FilterIcon, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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

import FacultyRoomSidebar from "@/Components/FacultyComponents/faculty-room-view-sidebar";
import ReportFormModal from "@/Components/FacultyComponents/faculty-report-form-modal";
import SuccessModal from "@/Components/FacultyComponents/faculty-sucess-modal";

// Pagination Component
function Pagination({ page, pageCount, onPageChange }) {
  return (
    <div className="flex justify-end items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </Button>

      <span className="text-sm text-muted-foreground">
        Page {page} of {pageCount}
      </span>

      <Button
        variant="outline"
        size="sm"
        disabled={page === pageCount}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </Button>
    </div>
  );
}

// ✅ Adjusted Filter Component for responsiveness and "All" option
function Filter({ filters, filterOptions, activeSection, onApplyFilters }) {
  const [selectedField, setSelectedField] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    // load default filters from backend
    if (filters.condition) {
      setSelectedField("condition");
      setSelectedValue(filters.condition);
    } else if (filters.unit_code && activeSection === "peripherals") {
      setSelectedField("unit_code");
      setSelectedValue(filters.unit_code);
    } else {
      setSelectedField("");
      setSelectedValue("");
    }
  }, [filters, activeSection]);

  // Trigger filter immediately on change
  const handleValueChange = (value) => {
    // If 'All' is selected, set the value to an empty string to remove the filter
    const newValue = value === "all" ? "" : value;
    setSelectedValue(newValue);

    if (selectedField === "condition") {
      onApplyFilters(newValue, filters.unit_code, filters.search);
    } else if (selectedField === "unit_code") {
      onApplyFilters(filters.condition, newValue, filters.search);
    }
  };

  const getAvailableFields = () => {
    const fields = [{ value: "condition", label: "Condition" }];
    if (activeSection === "peripherals") {
      fields.push({ value: "unit_code", label: "Unit Code" });
    }
    return fields;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <FilterIcon className="h-4 w-4" />
          Filter
          {(filters.condition || (activeSection === "peripherals" && filters.unit_code)) && (
            <X className="h-4 w-4 ml-1" onClick={(e) => {
              e.stopPropagation(); // Prevent popover from opening when clearing
              setSelectedField("");
              setSelectedValue("");
              onApplyFilters("", "", filters.search); // Clear all filters except search
            }} />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[calc(100vw-2rem)] sm:w-[400px] p-4" align="start" sideOffset={10}>
        <h4 className="font-medium mb-3 text-lg">Filter Options</h4>
        <div className="flex flex-col gap-4">
          {/* Field Dropdown */}
          <Select
            value={selectedField}
            onValueChange={(val) => {
              setSelectedField(val);
              setSelectedValue(""); // Reset value when field changes
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Field" />
            </SelectTrigger>
            <SelectContent>
              {getAvailableFields().map((field) => (
                <SelectItem key={field.value} value={field.value}>
                  {field.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Value Dropdown */}
          {selectedField === "condition" && (
            <Select value={selectedValue || "all"} onValueChange={handleValueChange}>
              <SelectTrigger className="w-full">
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

          {selectedField === "unit_code" && activeSection === "peripherals" && (
            <Select value={selectedValue || "all"} onValueChange={handleValueChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {filterOptions.unit_codes.map((u) => (
                  <SelectItem key={u} value={u}>
                    {u}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default function FacultyRoomView({
  room,
  equipments,
  systemUnits,
  peripherals,
  section,
  filters,
  filterOptions,
}) {
  const { auth } = usePage().props;

  const [activeSection, setActiveSection] = useState(section || "system-units");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [condition, setCondition] = useState(filters.condition || "");
  const [unitCode, setUnitCode] = useState(filters.unit_code || "");
  const [search, setSearch] = useState(filters.search || "");

  const [page, setPage] = useState(1);
  const pageSize = 10;

  const data =
    activeSection === "system-units"
      ? systemUnits
      : activeSection === "peripherals"
      ? peripherals
      : equipments;

  const pageCount = Math.ceil(data.length / pageSize);
  const paginated = data.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    setPage(1);
    setCondition(filters.condition || "");
    setUnitCode(filters.unit_code || "");
    setSearch(filters.search || "");
  }, [activeSection, filters]);

  const applyFilters = (newCondition = condition, newUnitCode = unitCode, newSearch = search) => {
    const params = new URLSearchParams({
      section: activeSection,
    });

    // Only add parameters if they have a non-empty value
    if (newCondition) {
      params.append('condition', newCondition);
    }
    if (newUnitCode && activeSection === "peripherals") {
      params.append('unit_code', newUnitCode);
    }
    if (newSearch) {
      params.append('search', newSearch);
    }

    window.location.href = `${window.location.pathname}?${params.toString()}`;
  };

  return (
    <>
      <Head title={`Room - ${room.room_number}`} />
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="hidden md:flex">
          <FacultyRoomSidebar
            room={room}
            active={activeSection}
            user={auth.user}
            onSelect={(section) => setActiveSection(section)}
          />
        </div>

        {/* Sidebar Mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 flex md:hidden">
            <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
            <div className="relative z-50 w-64 bg-white shadow-lg">
              <FacultyRoomSidebar
                room={room}
                active={activeSection}
                user={auth.user}
                onSelect={(key) => {
                  setActiveSection(key);
                  setSidebarOpen(false);
                }}
              />
            </div>
          </div>
        )}

        {/* Main */}
        <div className="flex-1 overflow-y-auto p-5 max-w-full md:max-w-5xl lg:max-w-7xl">
          <div className="space-y-6">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <h2 className="text-xl font-semibold">
                  {activeSection === "system-units"
                    ? "System Units"
                    : activeSection === "peripherals"
                    ? "Peripherals"
                    : "Equipments"}
                </h2>
              </div>
            </div>

            {/* Table */}
            <div className="rounded-md border overflow-hidden w-full">
              {/* Header with Filter + Search */}
              <div className="flex flex-col sm:flex-row gap-2 sm:justify-between sm:items-center p-2 border-b">
                <div className="flex gap-2 items-center w-full sm:w-auto"> {/* Added w-full */}
                  <Filter
                    filters={{ condition, unit_code: unitCode, search }}
                    filterOptions={filterOptions}
                    activeSection={activeSection}
                    onApplyFilters={applyFilters}
                  />
                  <Input
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => {
                      const value = e.target.value;
                      setSearch(value);
                      applyFilters(condition, unitCode, value);
                    }}
                    className="flex-1 min-w-0 sm:max-w-xs w-full" 
                  />
                </div>
              </div>

              <Table className="border-collapse border border-gray-300 w-full">
                <TableHeader>
                  <TableRow className="divide-x divide-gray-300">
                    <TableHead className="w-20 text-center">No</TableHead>
                    <TableHead>
                      {activeSection === "system-units"
                        ? "Unit Code"
                        : activeSection === "peripherals"
                        ? "Peripheral Code"
                        : "Equipment Code"}
                    </TableHead>
                    {activeSection !== "system-units" && <TableHead>Type</TableHead>}
                    <TableHead>Condition</TableHead>
                    <TableHead className="w-1/6 text-left">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {paginated.length > 0 ? (
                    paginated.map((item, index) => (
                      <TableRow key={item.id} className="divide-x divide-gray-300">
                        <TableCell className="text-center">
                          {(page - 1) * pageSize + index + 1}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">{item.name}</TableCell>
                        {activeSection !== "system-units" && <TableCell>{item.type}</TableCell>}
                        <TableCell>
                          <Badge
                            variant={item.condition === "Good" ? "success" : "destructive"}
                          >
                            {item.condition}
                          </Badge>
                        </TableCell>
                        <TableCell className="flex gap-2 text-left">
                          {activeSection === "system-units" && (
                            <Link
                              href={route("faculty.units.show", {
                                room: room.id,
                                unit: item.id,
                              })}
                            >
                              <Button size="sm" variant="outline" className="flex items-center gap-1">
                                <Eye className="h-4 w-4" /> View
                              </Button>
                            </Link>
                          )}
                          {activeSection === "peripherals" && (
                            <Link
                              href={route("faculty.peripherals.show", {
                                room: room.id,
                                peripheral: item.id,
                              })}
                            >
                              <Button size="sm" variant="outline" className="flex items-center gap-1">
                                <Eye className="h-4 w-4" /> View
                              </Button>
                            </Link>
                          )}
                          {activeSection === "equipments" && (
                            <Link
                              href={route("faculty.equipments.show", {
                                room: room.id,
                                equipment: item.id,
                              })}
                            >
                              <Button size="sm" variant="outline" className="flex items-center gap-1">
                                <Eye className="h-4 w-4" /> View
                              </Button>
                            </Link>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex items-center gap-1"
                            onClick={() => {
                              setSelectedItem(item);
                              setShowReportModal(true);
                            }}
                          >
                            <FileText className="h-4 w-4" /> Report
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow className="divide-x divide-gray-300">
                      <TableCell
                        colSpan={activeSection === "system-units" ? 4 : 5}
                        className="text-center text-muted-foreground"
                      >
                        No data found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>

              {pageCount > 1 && (
                <div className="flex justify-end p-2">
                  <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showReportModal && (
        <ReportFormModal
          open={showReportModal}
          onOpenChange={setShowReportModal}
          item={selectedItem}
          section={activeSection}
          room={room}
          onSuccess={() => setShowSuccessModal(true)}
        />
      )}

      <SuccessModal
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        message="Report submitted successfully!"
      />
    </>
  );
}