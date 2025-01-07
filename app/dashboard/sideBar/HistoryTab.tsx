"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { Copy, Loader2Icon } from "lucide-react";
import { eq, desc } from "drizzle-orm";
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export interface HistoryItem {
    id: number;
    FormData: string;
    templateSlug: string;
    aiResponse: string;
    createdBy: string;
    createdAt: string;
}

const transformToHistoryItem = (dbItem: any): HistoryItem => ({
    id: dbItem.id,
    FormData: dbItem.FormData, // Map 'FormData' to 'formData'
    templateSlug: dbItem.templateSlug || "",
    aiResponse: dbItem.aiResponse || "",
    createdBy: dbItem.createdBy || "",
    createdAt: dbItem.createdAt || "",
});


function HistoryTab() {
    const { user } = useUser();
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            if (!user?.primaryEmailAddress?.emailAddress) return;

            const userEmail = user.primaryEmailAddress.emailAddress;
            const result = await db.select(
                {
                    id: AIOutput.id,
                    FormData: AIOutput.FormData,
                    templateSlug: AIOutput.templateSlug,
                    aiResponse: AIOutput.aiResponse,
                    createdBy: AIOutput.createdBy,
                    createdAt: AIOutput.createdAt,
                })
                .from(AIOutput)
                .where(eq(AIOutput.createdBy, userEmail))
                .orderBy(desc(AIOutput.createdAt));

            const mappedHistory: HistoryItem[] = result.map(transformToHistoryItem);

            setHistory(mappedHistory);
            setLoading(false);
        };

        fetchHistory();
    }, [user]);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        alert("Copied to clipboard!");
    };

    return (
        <div className="p-5">
            <h2 className="text-xl font-bold mb-5">History</h2>
            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <Loader2Icon className="w-10 h-10 animate-spin text-gray-500" />
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm sm:text-base">
                        <thead>
                            <tr className="bg-gray-100 border-b">
                                <th className="p-3 text-left">Template</th>
                                <th className="p-3 text-left">AI Resp</th>
                                <th className="p-3 text-left">Date</th>
                                <th className="p-3 text-left">Words</th>
                                <th className="p-3 text-left">Copy</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((item) => (
                                <tr key={item.id} className="border-b">
                                    <td className="p-3">{item.templateSlug}</td>
                                    <td className="p-3 truncate max-w-xs">{item.aiResponse}</td>
                                    <td className="p-3">
                                        {moment(item.createdAt, "DD/MM/YYYY").format("MMM D, YYYY")}
                                    </td>
                                    <td className="p-3">{item.aiResponse.split(" ").length}</td>
                                    <td className="p-3">
                                        <Button
                                            variant="outline"
                                            onClick={() => copyToClipboard(item.aiResponse)}
                                        >
                                            <Copy size={16} />
                                            Copy
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default HistoryTab;
