"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ReportViewer from "@/components/results/ReportViewer";
import { getReportById } from "@/lib/api"; // Make sure to use the correct function here
import { Report } from "@/lib/types";
import LoadingSpinner from "@/components/processing/LoadingSpinner";

export default function ResultsPage() {
  const router = useRouter();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const reportId = sessionStorage.getItem("reportId");

        if (!reportId) {
          router.push("/upload");
          return;
        }

        const reportData = await getReportById(reportId); // Use the correct API call
        setReport(reportData);
      } catch (err) {
        console.error("Error fetching results:", err);
        setError("Failed to load report results");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [router]);

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
          Error Loading Results
        </h1>
        <Card className="p-6 border-t-4 border-red-400 shadow-md">
          <p className="text-red-500 mb-4">{error}</p>
          <Button
            onClick={() => router.push("/upload")}
            className="bg-[#214842] hover:bg-[#214842]/90 text-white"
          >
            Try Again
          </Button>
        </Card>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="max-w-3xl mx-auto text-center py-12 px-4">
        <h1 className="text-2xl font-bold mb-4 text-[#214842]">
          No Report Data Found
        </h1>
        <Button
          onClick={() => router.push("/upload")}
          className="bg-[#214842] hover:bg-[#214842]/90 text-white"
        >
          Upload a Report
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 px-4 py-6 sm:py-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#214842]">
          Blood Test Results Analysis
        </h1>
        <p className="text-gray-600 flex items-center justify-center">
          <span className="bg-[#f4d392]/20 px-2 py-1 rounded text-[#214842] text-sm">
            Report generated on {new Date().toLocaleDateString()}
          </span>
        </p>
      </div>

      <ReportViewer report={report} />

      <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
        <Button
          onClick={() => window.print()}
          variant="outline"
          className="border-[#214842] text-[#214842] hover:bg-[#f4d392]/10"
        >
          Print Report
        </Button>
        <Button
          onClick={() => router.push("/upload")}
          className="bg-[#214842] hover:bg-[#214842]/90 text-white"
        >
          Upload Another Report
        </Button>
      </div>
    </div>
  );
}
