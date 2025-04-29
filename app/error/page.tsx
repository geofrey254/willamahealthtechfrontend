"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import ErrorDisplay from "@/components/error/ErrorDisplay";

export const metadata: Metadata = {
  title: "Error | Medical Report Analysis",
  description: "An error occurred while processing your request",
};

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const errorType = searchParams.get("type") || "general";
  const errorMessage =
    searchParams.get("message") || "An unexpected error occurred.";

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <ErrorDisplay type={errorType} message={errorMessage} />

      <div className="mt-8 flex gap-4">
        <Button variant="outline" onClick={() => router.push("/")}>
          Go Home
        </Button>
        <Button onClick={() => router.push("/upload")}>Try Again</Button>
      </div>
    </div>
  );
}
