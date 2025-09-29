import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Megaphone, Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";

import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/Components/AdminComponents/app-sidebar";
import Notification from "@/Components/AdminComponents/Notification";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function Announce({ announcements: initialData, rooms = [] }) {
  const [announcements, setAnnouncements] = useState(initialData.data || []);
  const [links, setLinks] = useState(initialData.links || []);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [roomId, setRoomId] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      router.put(
        `/admin/announcements/${editingId}`,
        { title, message, room_id: roomId || null, scheduled_date: scheduledDate || null },
        {
          onSuccess: () => {
            resetForm();
            Swal.fire("Updated!", "Announcement updated successfully.", "success");
          },
        }
      );
    } else {
      router.post(
        "/admin/announcement",
        { title, message, room_id: roomId || null, scheduled_date: scheduledDate || null },
        {
          onSuccess: () => {
            resetForm();
            Swal.fire("Posted!", "Announcement created successfully.", "success");
          },
        }
      );
    }
  };

  const resetForm = () => {
    setTitle("");
    setMessage("");
    setRoomId("");
    setScheduledDate("");
    setEditingId(null);
  };

  const handleEdit = (a) => {
    setEditingId(a.id);
    setTitle(a.title);
    setMessage(a.message);
    setRoomId(a.room_id?.toString() || "");
    setScheduledDate(a.scheduled_date || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This announcement will be deleted permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(`/admin/announcements/${id}`, {
          onSuccess: () => {
            Swal.fire("Deleted!", "Announcement deleted successfully.", "success");
          },
        });
      }
    });
  };

  // Pagination
  const goToPage = (url) => {
    if (!url) return;
    router.get(url, {}, {
      preserveScroll: true,
      preserveState: true,
      onSuccess: (page) => {
        setAnnouncements(page.props.announcements.data);
        setLinks(page.props.announcements.links);
      },
    });
  };

  return (
    <SidebarProvider>
      <Head>
        <title>Announcements</title>
      </Head>
      <AppSidebar />

      <SidebarInset>
        <header className="sticky top-0 z-20 bg-white border-b px-6 py-3">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-6 mx-3" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/admin/announcement"
                    aria-current="page"
                    className="font-semibold text-foreground"
                  >
                    Announcements
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex-1" />
            <Notification />
          </div>
        </header>

        <main className="w-full px-4 sm:px-6 py-6">
          <div className="max-w-7xl mx-auto space-y-8"> {/* expanded max width */}
            <h1 className="text-2xl font-semibold">Announcements</h1>

            {/* Form Card */}
            <Card className="rounded-2xl shadow-md bg-white">
              <CardHeader className="flex items-center gap-2 border-b pb-3">
                <Megaphone className="w-6 h-6 text-teal-600" />
                <CardTitle className="text-xl font-semibold">
                  {editingId ? "Edit Announcement" : "Make a New Announcement"}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Enter announcement title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                  <Textarea
                    placeholder="Enter announcement message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    required
                  />
                  <Select onValueChange={setRoomId} value={roomId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a room" />
                    </SelectTrigger>
                    <SelectContent>
                      {rooms.map((room) => (
                        <SelectItem key={room.id} value={room.id.toString()}>
                          {room.room_number}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    required
                  />

                  <div className="flex gap-3">
                    <Button
                      type="submit"
                      className="bg-[hsl(142,31%,51%)] hover:bg-[hsl(142,31%,45%)] text-white"
                    >
                      {editingId ? "Update Announcement" : "Post Announcement"}
                    </Button>
                    {editingId && (
                      <Button type="button" onClick={resetForm} variant="outline">
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Table Layout */}
            <div className="overflow-x-auto rounded-lg shadow-lg w-full">
              <Table className="min-w-[1100px] w-full bg-white"> {/* wider min width */}
                <TableHeader>
                  <TableRow className="bg-[hsl(142,34%,85%)] text-[hsl(142,34%,25%)] hover:bg-[hsl(142,34%,80%)] h-12">
                    <TableHead className="w-[15%]">Title</TableHead>
                    <TableHead className="w-[35%]">Message</TableHead>
                    <TableHead className="w-[15%]">Room</TableHead>
                    <TableHead className="w-[15%]">Scheduled Date</TableHead>
                    <TableHead className="w-[15%]">Posted By</TableHead>
                    <TableHead className="w-[15%] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {announcements.length > 0 ? (
                    announcements.map((a) => (
                      <TableRow key={a.id} className="h-14">
                        <TableCell className="font-medium">{a.title}</TableCell>
                        <TableCell className="whitespace-pre-line">{a.message}</TableCell>
                        <TableCell>{a.room?.room_number || "—"}</TableCell>
                        <TableCell>{a.scheduled_date || "—"}</TableCell>
                        <TableCell>{a.admin?.name || "Admin"}</TableCell>
                        <TableCell className="text-right flex gap-2 justify-end">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(a)}
                            className="flex items-center gap-1"
                          >
                            <Pencil className="w-4 h-4" /> Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(a.id)}
                            className="flex items-center gap-1"
                          >
                            <Trash2 className="w-4 h-4" /> Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-gray-500 py-6">
                        No announcements yet.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {links.length > 0 && (
              <div className="flex justify-center gap-2 mt-4 flex-wrap">
                {links.map((link, idx) => (
                  <Button
                    key={idx}
                    size="sm"
                    variant={link.active ? "default" : "outline"}
                    onClick={() => goToPage(link.url)}
                    disabled={!link.url}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}