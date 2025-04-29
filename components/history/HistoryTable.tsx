import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Download, Trash2 } from "lucide-react";
import { ReportHistory } from "@/lib/types";

interface HistoryTableProps {
  reports: ReportHistory[];
}

export default function HistoryTable({ reports }: HistoryTableProps) {
  // Format date in a readable way
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleDelete = (reportId: string) => {
    if (confirm("Are you sure you want to delete this report?")) {
      // Call API to delete report
      console.log("Deleting report:", reportId);
    }
  };

  return (
    <Card className="shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted text-muted-foreground text-sm">
            <tr>
              <th className="text-left font-medium px-4 py-3">Report</th>
              <th className="text-left font-medium px-4 py-3">Date</th>
              <th className="text-left font-medium px-4 py-3">Status</th>
              <th className="text-left font-medium px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reports.map((report) => (
              <tr key={report.reportId} className="bg-white">
                <td className="px-4 py-4">
                  <div>
                    <p className="font-medium">{report.reportName}</p>
                    <p className="text-sm text-muted-foreground">
                      {report.patientName}
                    </p>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm">{formatDate(report.date)}</td>
                <td className="px-4 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${
                      report.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : report.status === "processing"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {report.status === "completed"
                      ? "Completed"
                      : report.status === "processing"
                      ? "Processing"
                      : "Failed"}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/results?id=${report.reportId}`}>
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(report.reportId)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
