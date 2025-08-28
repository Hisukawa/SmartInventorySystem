import React, { useState} from "react";
import {Card, CardHeader, CardTitle, CardContent} from "@/Components/ui/card";
import { Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import {Menu } from "lucide-react";



import FacultyRoomSidebar from "@/Components/FacultyComponents/faculty-room-view-sidebar";



export default function FacultyRoomEquipmentView({room, equipment, user}){


    const [sidebarOpen, setSidebarOpen] = useState(false);
    


      return (
            <div className="flex min-h-screen bg-gray-50 overflow-hidden"> 
            {/* Sidebar - Desktop */}
    
                <div className="hidden md:flex">
                <FacultyRoomSidebar
                    room={room}
                    user={user}
                    onSelect={(section) => {
                        window.location.href = route("room.show", {
                            roomPath: room.room_path,
                            section: section,
                        });
                    }}
    
                    active="equipments"
                />
                </div>
    
    
                {/* Sidebar for Mobile */}
                    
                {sidebarOpen && (
                    <div className="fixed inset-0 z-40 flex md:hidden">
                        {/* Overlay */}
                        <div className="fixed  inset-0 bg-black/50" onClick={() => setSidebarOpen(false)}>
                           
                        </div>
    
                        {/*  Drawer */}
    
                        <div className="relative z-50 w-64 bg-white shadow-lg">
                        <FacultyRoomSidebar
                        room={room}
                        user={user}
                        onSelect={(section)=> {
                            setSidebarOpen(false);
                            window.location.href = route("room.show", {
                                roomPath: room.room_path,
                                section: section,
                            });
                        }}
                        
                        active="equipments"
                        />
    
                        </div>
    
                    </div>
    
                )}
    
                {/* Main Content */}
                <div className="flex-1 p-4 md:p-6">
                    {/* Top Bar For mobie */}
                    <div className="flex items-center gap-2 mb-4">
                        <Button
                        variant = "outline"
                        size="icon"
                        className="md:hidden"
                        onClick={()=>setSidebarOpen(true)}
                        >
                          <Menu className="h-5 w-5"/>
                        </Button>
                        <h1 className="text-lg md:text-xl font-semibold text-gray-800">
                            Room Equipment Details
    
                        </h1>
                    </div>
    
                    <div className="flex justify-center">
    
                        <Card className="w-full max-w-md sm:max-w-lg md:max-w-2xl shadow-lg- rounded-2xl border">
                            <CardHeader>
                                <CardTitle className="text-lg md:text-xl font-semibold text-gray-800">
                                    {equipment.equipment_code}
                                </CardTitle>
                            </CardHeader>
    
                            <CardContent>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <DetailItem label="Equipment Code" value={equipment.equipment_code}/> 
                                    <DetailItem label="Type" value={equipment.type}/>
                                    <DetailItem label="Brand" value={equipment.brand}/>
                                    <DetailItem label="Condition" value={equipment.condition}/>
                               
                                    
                                </div>
    
                                <div className="mt-6">
                                                <Link href={route("room.show", 
                                                    {
                                                    roomPath: room.room_path,
                                                    section: 'equipments',
                                                        
                                                    })}>
                                                  <Button variant="outline">← Back to Equipments</Button>
                                                </Link>
                                              </div>
                            </CardContent>
                        </Card>
                    </div>
    
    
                </div>
            </div>
        )
    
function DetailItem({ label, value }) {
    return (
        <div className="flex flex-col">
        <span className="text-xs sm:text-sm font-medium text-gray-500">
            {label}
        </span>
        <span className="text-sm sm:text-base font-semibold text-gray-800">
            {value}
        </span>
        </div>
    );
    }



    
}