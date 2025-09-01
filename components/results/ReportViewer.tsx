import { useState } from "react";
import Markdown from "react-markdown";
import { Report } from "@/lib/types"; // Adjust the import path as necessary

interface ReportViewerProps {
  report: Report;
}

export default function ReportViewer({ report }: ReportViewerProps) {
  const [activeTab, setActiveTab] = useState("summary");

  if (!report || !report.llm_result) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
        <p className="text-gray-500">No report data available</p>
      </div>
    );
  }

  // Extract patient info for the header
  const patientName = report.patientName;
  const patientId = report.patientId;
  const reportDate = report.reportDate;
  const reportId = report.reportId;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      {/* Report Header */}
      <div className="bg-[#214842] text-white p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{patientName}</h1>
            <div className="flex space-x-4 mt-2">
              <div>
                <span className="text-[#f4d392]">Patient ID:</span> {patientId}
              </div>
              <div>
                <span className="text-[#f4d392]">Report Date:</span>{" "}
                {reportDate}
              </div>
              <div>
                <span className="text-[#f4d392]">Report ID:</span> {reportId}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="flex border-b border-gray-200">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "summary"
              ? "border-b-2 border-[#214842] text-[#214842]"
              : "text-gray-600 hover:text-[#214842]"
          }`}
          onClick={() => setActiveTab("summary")}
        >
          Summary
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "full"
              ? "border-b-2 border-[#214842] text-[#214842]"
              : "text-gray-600 hover:text-[#214842]"
          }`}
          onClick={() => setActiveTab("full")}
        >
          Full Report
        </button>
      </div>

      {/* Report Content */}
      <div className="p-6">
        {activeTab === "summary" ? (
          <div>
            <h2 className="text-xl font-bold text-[#214842] mb-4">
              Diagnosis Summary
            </h2>
            <SummaryView report={report} />
          </div>
        ) : (
          <div className="prose max-w-none">
            <Markdown>{report.llm_result}</Markdown>
          </div>
        )}
      </div>
    </div>
  );
}

function SummaryView({ report }: { report: Report }) {
  // Extract key sections from the report
  const lines = report.llm_result.split("\n");

  // Extract diagnosis summary section
  const diagnosisStart = lines.findIndex((line) =>
    line.includes("Diagnosis Summary")
  );
  const abnormalStart = lines.findIndex((line) =>
    line.includes("Abnormal Findings")
  );
  const diagnosisContent = lines
    .slice(diagnosisStart + 1, abnormalStart)
    .filter((line) => line.trim() !== "")
    .join("\n");

  // Extract abnormal findings
  const recommendedStart = lines.findIndex((line) =>
    line.includes("Recommended Actions")
  );
  const abnormalContent = lines
    .slice(abnormalStart + 1, recommendedStart)
    .filter((line) => line.trim() !== "")
    .join("\n");

  // Extract recommendations
  const conclusionStart = lines.findIndex((line) =>
    line.includes("Conclusion")
  );
  const recommendedContent = lines
    .slice(recommendedStart + 1, conclusionStart)
    .filter((line) => line.trim() !== "")
    .join("\n");

  // Extract conclusion
  const conclusionContent = lines
    .slice(conclusionStart + 1)
    .filter((line) => line.trim() !== "")
    .join("\n");

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg border-l-4 border-[#214842] shadow-sm">
        <h3 className="font-bold text-[#214842] mb-2">Key Findings</h3>
        <div className="prose text-sm text-gray-700">
          <Markdown>{diagnosisContent}</Markdown>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border-l-4 border-[#f4d392] shadow-sm">
        <h3 className="font-bold text-[#214842] mb-2">Abnormal Findings</h3>
        <div className="prose text-sm text-gray-700">
          <Markdown>{abnormalContent}</Markdown>
        </div>
      </div>

      <div className="bg-[#f4d392] bg-opacity-10 p-4 rounded-lg border border-[#f4d392] shadow-sm">
        <h3 className="font-bold text-[#214842] mb-2">Recommended Actions</h3>
        <div className="prose text-sm text-gray-700">
          <Markdown>{recommendedContent}</Markdown>
        </div>
      </div>

      <div className="bg-[#214842] bg-opacity-5 p-4 rounded-lg border border-[#214842] border-opacity-20 shadow-sm">
        <h3 className="font-bold text-[#214842] mb-2">Conclusion</h3>
        <div className="prose text-sm text-white">
          <Markdown>{conclusionContent}</Markdown>
        </div>
      </div>
    </div>
  );
}
