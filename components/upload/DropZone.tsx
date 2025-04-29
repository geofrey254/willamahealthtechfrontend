"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";

interface DropZoneProps {
  onDrop: (acceptedFiles: File[]) => void;
  file: File | null;
}

export default function DropZone({ onDrop, file }: DropZoneProps) {
  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      onDrop(acceptedFiles);
    },
    [onDrop]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  return (
    <div
      {...getRootProps()}
      className={`
        border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
        transition-colors duration-200 ease-in-out
        ${
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-gray-300 hover:border-primary/50"
        }
        ${file ? "bg-green-50 border-green-300" : ""}
      `}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center space-y-2">
        <Upload
          className={`h-8 w-8 ${file ? "text-green-500" : "text-gray-400"}`}
        />
        <div className="text-sm">
          {file ? (
            <p className="font-medium text-green-600">File ready for upload</p>
          ) : isDragActive ? (
            <p className="font-medium text-primary">Drop the PDF here</p>
          ) : (
            <p className="text-muted-foreground">
              Drag & drop your PDF here, or click to select a file
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
