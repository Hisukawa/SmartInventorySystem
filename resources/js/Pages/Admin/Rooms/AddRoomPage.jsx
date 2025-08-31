// import { useForm, router } from "@inertiajs/react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//     Sheet,
//     SheetContent,
//     SheetHeader,
//     SheetTitle,
// } from "@/components/ui/sheet";
// import Swal from "sweetalert2";
// import { useState } from "react";

// export default function AddRoomPage() {
//     const { data, setData, post, processing, errors } = useForm({
//         room_number: "",
//     });

//     const [searchTerm, setSearchTerm] = useState("");
//     const [addRoomModalOpen, setAddRoomModalOpen] = useState(false);

//     const handleSearch = (e) => {
//         if (e.key === "Enter") {
//             e.preventDefault();
//             router.visit(`/admin/rooms?search=${searchTerm}`);
//         }
//     };

//     const handleAddRoomClick = () => {
//         // Wait 3 seconds before opening modal
//         setTimeout(() => {
//             setAddRoomModalOpen(true);
//         }, 3000);
//     };

//     const submit = (e) => {
//         e.preventDefault();
//         post("/admin/rooms", {
//             preserveScroll: true,
//             onSuccess: () => {
//                 Swal.fire({
//                     icon: "success",
//                     title: "Room added successfully!",
//                     timer: 1500,
//                     showConfirmButton: false,
//                 });
//                 router.visit("/admin/rooms"); // close and go back to list
//             },
//         });
//     };

//     return (
//         <div className="p-4">
//             {/* Search bar + Add Room button */}
//             <div className="flex items-center gap-2 mb-4">
//                 <Input
//                     placeholder="Search rooms..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     onKeyDown={handleSearch}
//                     className="w-full sm:w-2/3"
//                 />
//                 <Button onClick={handleAddRoomClick}>Add Room</Button>
//             </div>

//             {/* Side Modal (pushes from right) */}
//             <div
//                 className={`fixed top-5 right-0 h-full w-[400px] bg-white shadow-lg p-6
//                     transition-transform duration-500 ease-in-out
//                     ${addRoomModalOpen ? "translate-x-0" : "translate-x-full"}`}
//             >
//                 <h2 className="text-xl font-bold mb-4">Add Room</h2>

//                 {/* Add room form */}
//                 <form onSubmit={submit} className="mt-4 space-y-4">
//                     <Input
//                         placeholder="e.g. 101"
//                         value={data.room_number}
//                         onChange={(e) => setData("room_number", e.target.value)}
//                     />
//                     {errors.room_number && (
//                         <p className="text-sm text-red-500">
//                             {errors.room_number}
//                         </p>
//                     )}
//                     <div className="flex justify-end gap-2">
//                         <Button
//                             type="button"
//                             variant="outline"
//                             onClick={() => setAddRoomModalOpen(false)}
//                         >
//                             Cancel
//                         </Button>
//                         <Button type="submit" disabled={processing}>
//                             Save
//                         </Button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }
