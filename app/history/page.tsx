"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import HistoryTable from "@/components/history/HistoryTable";
import { getUserReportHistory } from "@/lib/api";
import { ReportHistory } from "@/lib/types";
import LoadingSpinner from "@/components/processing/LoadingSpinner";
import Link from "next/link";

export default function HistoryPage() {
  const [history, setHistory] = useState<ReportHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const historyData = await getUserReportHistory();
        setHistory(historyData);
      } catch (err) {
        console.error("Error fetching history:", err);
        setError("Failed to load report history");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const filteredHistory = history.filter(
    (item) =>
      item.reportName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto text-center py-12 px-4">
        <h1 className="text-2xl font-bold mb-4 text-[#214842]">
          Error Loading History
        </h1>
        <Card className="p-6 border-t-4 border-red-400 shadow-md">
          <p className="text-red-500 mb-4">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-[#214842] hover:bg-[#214842]/90 text-white"
          >
            Try Again
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 px-4 py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#214842]">
            Report History
          </h1>
          <p className="text-gray-600 mt-1">
            View and manage your past blood test reports
          </p>
        </div>

        <div className="w-full md:w-64">
          <Input
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-[#214842]/20 focus:border-[#214842] focus:ring-1 focus:ring-[#214842]"
          />
        </div>
      </div>

      {history.length === 0 ? (
        <Card className="p-8 text-center border border-[#f4d392]/30 shadow-md">
          <div className="w-16 h-16 bg-[#f4d392]/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#214842"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <path d="M14 2v6h6"></path>
              <path d="M12 18v-6"></path>
              <path d="M9 15h6"></path>
            </svg>
          </div>
          <h2 className="text-xl font-medium mb-2 text-[#214842]">
            No Reports Found
          </h2>
          <p className="text-gray-600 mb-6">
            You haven{"'"}t uploaded any blood test reports yet.
          </p>
          <Link
            href="/upload"
            as="a"
            className="bg-[#214842] hover:bg-[#214842]/90 text-white"
          >
            Upload Your First Report
          </Link>
        </Card>
      ) : (
        <div className="bg-white rounded-lg shadow-md border border-[#f4d392]/30">
          <div className="p-4 border-b border-[#f4d392]/20 bg-[#f4d392]/5">
            <h3 className="text-[#214842] font-medium">
              {filteredHistory.length}{" "}
              {filteredHistory.length === 1 ? "Report" : "Reports"} Found
            </h3>
          </div>
          <HistoryTable reports={filteredHistory} />
        </div>
      )}
    </div>
  );
}
