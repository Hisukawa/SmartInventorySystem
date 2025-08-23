import React, { useState, useMemo } from "react";
import { usePage, Link, Head } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
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

// Pagination Component
function Pagination({ page, pageCount, onPageChange }) {
  return (
    <div className="flex justify-between items-center mt-4">
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

  // search + pagination
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;

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
      <div className="flex h-screen">
        {/* Sidebar */}
        <FacultyRoomSidebar
          room={room}
          active={activeSection}
          user={auth.user}
          onSelect={setActiveSection}
        />

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                {activeSection === "system-units"
                  ? "System Units"
                  : activeSection === "peripherals"
                  ? "Peripherals"
                  : "Equipments"}
              </h2>
              <Input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-xs"
              />
            </div>

            {/* Table aligned left */}
            <div className="rounded-md border overflow-hidden w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/3">
                      {activeSection === "system-units"
                        ? "Unit Code"
                        : activeSection === "peripherals"
                        ? "Peripheral Code"
                        : "Equipment Code"}
                    </TableHead>
                    <TableHead className="w-1/3">Condition</TableHead>
                    <TableHead className="w-1/3 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginated.length > 0 ? (
                    paginated.map((item) => (
                      <TableRow key={item.id}>
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
                        <TableCell className="text-right">
                          {activeSection === "system-units" && (
                            <Link
                              href={route("faculty.units.show", {
                                room: room.id,
                                unit: item.id,
                              })}
                            >
                              <Button size="sm" variant="outline">
                                View
                              </Button>
                            </Link>
                          )}
                          {activeSection === "equipments" && (
                            <Button size="sm" variant="outline">
                              Report Issue
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        className="text-center text-muted-foreground"
                      >
                        No data found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {pageCount > 1 && (
              <Pagination
                page={page}
                pageCount={pageCount}
                onPageChange={setPage}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
