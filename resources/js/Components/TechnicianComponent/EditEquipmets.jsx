import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";

export default function EquipmentForm({ rooms }) {
    const { data, setData, post, errors } = useForm({
        type: "",
        brand: "",
        condition: "",
        room_number: "",
    });

    const conditionOptions = [
        { label: "Good", value: "good", color: "text-green-600" },
        { label: "Needs Repair", value: "repair", color: "text-yellow-600" },
        { label: "Defective", value: "defective", color: "text-red-600" },
    ];

    const typeOptions = [
        "System Unit",
        "Monitor",
        "Keyboard",
        "Mouse",
        "Projector",
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/equipments");
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-2xl">
            <Head title="Add Equipment" />
            <h2 className="text-xl font-bold mb-4">Register Equipment</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Type */}
                <div>
                    <label className="block mb-1 font-medium">Type</label>
                    <input
                        list="type-list"
                        className="w-full border p-2 rounded"
                        value={data.type}
                        onChange={(e) => setData("type", e.target.value)}
                    />
                    <datalist id="type-list">
                        {typeOptions.map((t, i) => (
                            <option key={i} value={t} />
                        ))}
                    </datalist>
                    {errors.type && (
                        <p className="text-red-600">{errors.type}</p>
                    )}
                </div>

                {/* Brand */}
                <div>
                    <label className="block mb-1 font-medium">Brand</label>
                    <input
                        type="text"
                        className="w-full border p-2 rounded"
                        value={data.brand}
                        onChange={(e) => setData("brand", e.target.value)}
                    />
                </div>

                {/* Condition */}
                <div>
                    <label className="block mb-1 font-medium">Condition</label>
                    <select
                        className="w-full border p-2 rounded"
                        value={data.condition}
                        onChange={(e) => setData("condition", e.target.value)}
                    >
                        <option value="">Select Condition</option>
                        {conditionOptions.map((c, i) => (
                            <option key={i} value={c.value}>
                                {c.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Room */}
                <div>
                    <label className="block mb-1 font-medium">Room</label>
                    <input
                        list="room-list"
                        className="w-full border p-2 rounded"
                        value={data.room_number}
                        onChange={(e) => setData("room_number", e.target.value)}
                    />
                    <datalist id="room-list">
                        {rooms.map((r, i) => (
                            <option key={i} value={r.room_number} />
                        ))}
                    </datalist>
                </div>

                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                    Save
                </button>
            </form>
        </div>
    );
}
