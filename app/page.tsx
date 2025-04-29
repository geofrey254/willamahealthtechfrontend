import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-12 px-4 sm:py-16 bg-white">
      <div className="text-center space-y-3 sm:space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#214842]">
          Blood Test Report Analysis
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Upload your blood test PDF reports for instant analysis and
          interpretation.
        </p>
      </div>

      <div className="grid gap-6 w-full max-w-5xl sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-md border-[#f4d392] border-t-4">
          <CardHeader className="bg-white">
            <CardTitle className="text-[#214842]">Upload Report</CardTitle>
            <CardDescription>
              Upload your blood test PDF for analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/upload" passHref>
              <Button className="w-full bg-[#214842] hover:bg-[#1a3935] text-white">
                Upload New Report
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="shadow-md border-[#f4d392] border-t-4">
          <CardHeader className="bg-white">
            <CardTitle className="text-[#214842]">View History</CardTitle>
            <CardDescription>
              See your past reports and analyses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/history" passHref>
              <Button
                variant="outline"
                className="w-full border-[#214842] text-[#214842] hover:bg-[#f4d392]/10"
              >
                View History
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="shadow-md border-[#f4d392] border-t-4">
          <CardHeader className="bg-white">
            <CardTitle className="text-[#214842]">How It Works</CardTitle>
            <CardDescription>Learn about our analysis process</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Our system analyzes your blood test reports, identifies abnormal
              values, and provides easy-to-understand explanations.
            </p>
            <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
              <li>Upload your PDF report</li>
              <li>Wait for our AI to analyze it</li>
              <li>Get detailed health insights</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
