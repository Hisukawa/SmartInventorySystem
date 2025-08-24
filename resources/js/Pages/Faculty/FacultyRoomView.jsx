import React, { useState, useMemo } from "react";
import { usePage, Link, Head } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Menu, Pencil, Eye } from "lucide-react"; // icons

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
import FacultyRoomSidebar from "@/Components/FacultyComponents/faculty-room-view-sidebar";

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

export default function FacultyRoomView({
  room,
  equipments,
  systemUnits,
  peripherals,
}) {
  const { auth } = usePage().props;
  const [activeSection, setActiveSection] = useState("system-units");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // search + pagination
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const data = useMemo(() => {
    if (activeSection === "system-units") return systemUnits;
    if (activeSection === "peripherals") return peripherals;
    if (activeSection === "equipments") return equipments;
    return [];
  }, [activeSection, systemUnits, peripherals, equipments]);

  const filtered = useMemo(() => {
    return data.filter((item) =>
      (item.name || "").toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  const pageCount = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  React.useEffect(() => {
    setPage(1);
    setSearch("");
  }, [activeSection]);

  return (
    <>
      <Head title={`Room - ${room.room_number}`} />
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar - Desktop */}
        <div className="hidden md:flex">
          <FacultyRoomSidebar
            room={room}
            active={activeSection}
            user={auth.user}
            onSelect={setActiveSection}
          />
        </div>

        {/* Sidebar - Mobile (drawer) */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 flex md:hidden">
            <div
              className="fixed inset-0 bg-black/50"
              onClick={() => setSidebarOpen(false)}
            />
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

        {/* Main Content */}
       <div className="flex-1 overflow-y-auto p-5 max-w-full md:max-w-5xl lg:max-w-7xl">

          <div className="space-y-6">
            {/* Top bar with toggle button (mobile only) */}
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

            {/* Table with search + pagination */}
            <div className="rounded-md border overflow-hidden w-full">
              {/* Search bar inside table container */}
              <div className="flex justify-between items-center p-2 border-b">
                <h2 className="text-lg font-semibold">
                  {activeSection === "system-units"
                    ? "System Units"
                    : activeSection === "peripherals"
                    ? "Peripherals"
                    : activeSection == "equipments"
                    ? "Equipments"
                    :" "}
                </h2>
                <Input
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="max-w-xs"
                />
              </div>

              {/* Table */}
              <Table className="border-collapse border border-gray-300 w-full">
                <TableHeader>
                  <TableRow className="divide-x divide-gray-300">
                    <TableHead className="w-20 text-center">No</TableHead>
                    <TableHead className="w-auto">
                      {activeSection === "system-units"
                        ? "Unit Code"
                        : activeSection === "peripherals"
                        ? "Peripheral Code"
                        : "Equipment Code"}
                    </TableHead>
                    <TableHead className="w-auto">Condition</TableHead>
                    <TableHead className="w-1/6 text-left">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginated.length > 0 ? (
                    paginated.map((item, index) => (
                      <TableRow
                        key={item.id}
                        className="divide-x divide-gray-300"
                      >
                        <TableCell className="text-center">
                          {(page - 1) * pageSize + index + 1}
                        </TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              item.condition === "Good"
                                ? "success"
                                : "destructive"
                            }
                          >
                            {item.condition}
                          </Badge>
                        </TableCell>
                        <TableCell className="flex gap-2 text-left">
                          {/* View button for system-units */}
                          {activeSection === "system-units" && (
                            <Link
                              href={route("faculty.units.show", {
                                room: room.id,
                                unit: item.id,
                              })}
                            >
                            <Button size="sm" variant="outline" className="flex items-center gap-1">
                                  <Eye className="h-4 w-4" />
                                      View
                            </Button>
                            </Link>
                          )}
                          {activeSection === "peripherals" && (
                            
                            <Button size="sm" variant="outline" className="flex items-center gap-1">
                                  <Eye className="h-4 w-4" />
                                      View
                            </Button>
                            
                          )}

                           {activeSection === "equipments" && (
                            
                            <Button size="sm" variant="outline" className="flex items-center gap-1">
                                  <Eye className="h-4 w-4" />
                                      View
                            </Button>
                            
                          )}
                        

                          {/* Edit button for all */}
                          <Button size="sm" variant="outline">
                            <Pencil className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow className="divide-x divide-gray-300">
                      <TableCell
                        colSpan={4}
                        className="text-center text-muted-foreground"
                      >
                        No data found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>

              {/* Pagination inside table container, bottom-right */}
              {pageCount > 1 && (
                <div className="flex justify-end p-2">
                  <Pagination
                    page={page}
                    pageCount={pageCount}
                    onPageChange={setPage}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
