import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ImportSystemUnit() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return alert("Please select a CSV file first.");

        const formData = new FormData();
        formData.append("file", file);

        try {
            setLoading(true);
            const res = await axios.post("/api/system-units/import", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setMessage(res.data.message);
        } catch (error) {
            console.error(error);
            setMessage("Import failed. Check your CSV format.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="max-w-md mx-auto p-4">
            <CardHeader>
                <CardTitle>Import System Units (CSV)</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        type="file"
                        accept=".csv"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <Button type="submit" disabled={loading}>
                        {loading ? "Importing..." : "Import CSV"}
                    </Button>
                    <a
                        href="/api/system-units/template"
                        className="text-blue-500 underline"
                    >
                        Download CSV Template
                    </a>
                </form>
                {message && (
                    <p className="text-sm text-green-700 mt-3">{message}</p>
                )}
            </CardContent>
        </Card>
    );
}
