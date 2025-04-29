"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { uploadPdf } from "@/lib/api";
import DropZone from "./DropZone";

export default function UploadForm() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setError(null);
  };

  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a file to upload");
      return;
    }

    if (file.type !== "application/pdf") {
      setError("Only PDF files are accepted");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      // 10MB in bytes
      setError("File size exceeds 10MB limit");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Upload the file to the backend
      const result = await uploadPdf(file);

      // Store the report ID or any relevant data in sessionStorage
      sessionStorage.setItem("reportId", result.reportId);

      // Redirect to processing page
      router.push("/processing");
    } catch (err) {
      setError("Failed to upload file. Please try again.");
      console.error("Upload error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-md border border-[#f4d392]/30">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="report" className="text-[#214842] font-medium">
              Upload PDF Report
            </Label>

            <DropZone onDrop={handleDrop} file={file} />

            <div className="flex items-center gap-2 mt-2">
              <div className="relative flex-1">
                <Input
                  id="report"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  disabled={loading}
                  className="cursor-pointer border-[#214842]/20 focus:border-[#214842] focus:ring-1 focus:ring-[#214842]"
                />
              </div>
            </div>

            {file && (
              <p className="text-sm text-gray-600 mt-2 flex items-center">
                <span className="bg-[#f4d392]/20 px-2 py-1 rounded text-[#214842] mr-2">
                  File selected
                </span>
                {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>

          {error && (
            <Alert variant="destructive" className="border-red-300 bg-red-50">
              <AlertDescription className="text-red-800">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            className="w-full bg-[#214842] hover:bg-[#214842]/90 text-white transition-colors"
            disabled={loading || !file}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Upload and Analyze"
            )}
          </Button>

          {!file && !error && (
            <p className="text-xs text-center text-gray-500 mt-2">
              Drag and drop a PDF file or click to browse
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
