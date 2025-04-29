import { Metadata } from "next";
import UploadForm from "@/components/upload/UploadForm";

export const metadata: Metadata = {
  title: "Upload Blood Test Report | Medical Report Analysis",
  description: "Upload your blood test report for analysis",
};

export default function UploadPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-[#214842]">
            Upload Blood Test Report
          </h1>
          <p className="text-gray-600">
            Upload your PDF blood test report for automated analysis
          </p>
        </div>

        <UploadForm />

        <div className="bg-[#f4d392]/10 border-l-4 border-[#f4d392] p-4 rounded-lg text-sm">
          <h3 className="font-medium mb-2 text-[#214842]">
            Supported Reports:
          </h3>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            <li>Complete Blood Count (CBC)</li>
            <li>Comprehensive Metabolic Panel (CMP)</li>
            <li>Lipid Panel</li>
            <li>Thyroid Function Tests</li>
            <li>Other standard blood test reports</li>
          </ul>
          <p className="mt-4 text-gray-600 border-t border-[#f4d392]/30 pt-3">
            Reports must be in PDF format. Maximum file size: 10MB.
          </p>
        </div>
      </div>
    </div>
  );
}
