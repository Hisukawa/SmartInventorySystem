import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Bell } from "lucide-react";

export default function Notification() {
    const [notifications, setNotifications] = useState([]);
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Fetch notifications
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const res = await axios.get("/notifications");
                setNotifications(res.data);
            } catch (err) {
                console.error("Failed to fetch notifications:", err);
            }
        };

        fetchNotifications();
        const interval = setInterval(fetchNotifications, 5000);
        return () => clearInterval(interval);
    }, []);

    // Click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const markAsRead = async (id) => {
        try {
            await axios.patch(`/notifications/${id}/read`);
            setNotifications((prev) => prev.filter((n) => n.id !== id));
        } catch (error) {
            console.error("Failed to mark notification as read", error);
        }
    };

    const markAllAsRead = async () => {
        try {
            await axios.patch(`/notifications/mark-all-read`);
            setNotifications([]);
        } catch (error) {
            console.error("Failed to mark all notifications as read", error);
        }
    };

    const goToReport = (event, notif) => {
        event.stopPropagation(); // 🔹 prevent click outside from firing
        markAsRead(notif.id);
        if (notif.data.report_id) {
            window.location.href = `/admin/faculty/reports/${notif.data.report_id}`;
        } else {
            window.location.href = "/admin/faculty/reports";
        }
    };

    return (
        <div className="relative">
            {/* Bell button */}
            <button
                onClick={() => setOpen(!open)}
                className="relative p-2 rounded-full hover:bg-gray-100"
            >
                <Bell className="w-6 h-6 text-gray-700" />
                {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
                        {notifications.length}
                    </span>
                )}
            </button>

            {/* Dropdown */}
            {open && (
                <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 w-80 sm:w-96 max-w-[95vw] sm:max-w-sm bg-white shadow-lg rounded-lg overflow-hidden z-50"
                >
                    {/* Header */}
                    <div className="p-3 border-b font-semibold flex justify-between items-center">
                        <span>Notifications</span>
                        {notifications.length > 0 && (
                            <button
                                onClick={markAllAsRead}
                                className="text-xs text-blue-600 hover:underline"
                            >
                                Mark all as read
                            </button>
                        )}
                    </div>

                    {/* List */}
                    <ul className="max-h-64 overflow-y-auto">
                        {notifications.length > 0 ? (
                            notifications.map((notif) => (
                                <li
                                    key={notif.id}
                                    onClick={(e) => goToReport(e, notif)}
                                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer border-b"
                                >
                                    <p className="text-sm font-bold">
                                        {notif.data.user_name}
                                    </p>
                                    <p className="text-sm">
                                        Condition: {notif.data.condition}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Room Number: {notif.data.room_number}
                                    </p>
                                    <p className="text-xs">
                                        {notif.data.remarks}
                                    </p>
                                </li>
                            ))
                        ) : (
                            <li className="p-4 text-gray-500 text-sm">
                                No notifications
                            </li>
                        )}
                    </ul>

                    {/* Footer */}
                    <div className="p-2 text-center border-t">
                        <a
                            href="/admin/faculty/reports"
                            className="text-sm text-blue-600 hover:underline"
                        >
                            View all
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
