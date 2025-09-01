"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/processing/LoadingSpinner";
import { getReportById } from "@/lib/api"; // Make sure you have this API utility

export default function ProcessingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if we have a reportId
    const reportId = sessionStorage.getItem("reportId");
    if (!reportId) {
      router.push("/upload"); // Redirect to upload page if no reportId
      return;
    }

    const fetchReportData = async () => {
      try {
        // Simulate fetching report data after processing
        const report = await getReportById(reportId);

        // Store the report in sessionStorage or state to pass it to results page
        sessionStorage.setItem("reportData", JSON.stringify(report));

        // Simulate processing time and then redirect to results page
        const processTimer = setTimeout(() => {
          router.push("/results"); // Redirect to results after processing
        }, 5000); // 5 seconds delay

        return () => clearTimeout(processTimer);
      } catch (err) {
        setError("Failed to fetch report data.");
        console.error("Error fetching report:", err);
        setLoading(false);
      }
    };

    fetchReportData(); // Trigger report fetching and processing
  }, [router]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col items-center justify-center h-[90vh] space-y-8 px-4 mt-12">
      <LoadingSpinner />

      <div className="text-center space-y-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#214842]">
          Analyzing Your Report
        </h1>
        <p className="text-gray-600 max-w-md mx-auto">
          Our AI is analyzing your blood test results. This typically takes less
          than a minute.
        </p>
      </div>

      <div className="w-full max-w-md bg-[#f4d392]/10 border-l-4 border-[#f4d392] rounded-lg p-4 mt-8">
        <h3 className="text-sm font-medium mb-2 text-[#214842]">
          What{"'"}s happening now:
        </h3>
        <ul className="text-sm space-y-2 text-gray-600 list-disc list-inside">
          <li className="relative pl-1">
            <span className="font-medium">Extracting data</span> from your PDF
          </li>
          <li className="relative pl-1">
            <span className="font-medium">Identifying test results</span> and
            reference ranges
          </li>
          <li className="relative pl-1">
            <span className="font-medium">Comparing values</span> to normal
            ranges
          </li>
          <li className="relative pl-1">
            <span className="font-medium">Generating explanations</span> and
            insights
          </li>
        </ul>
      </div>

      {error && (
        <div className="text-center text-red-500">
          <p>{error}</p>
        </div>
      )}

      <div className="text-center mt-4 animate-pulse">
        <p className="text-sm text-[#214842]">
          Please don{"'"}t close this window
        </p>
      </div>
    </div>
  );
}
