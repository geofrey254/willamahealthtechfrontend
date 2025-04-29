// Test result status
export type TestStatus = "normal" | "abnormal" | "borderline";

// Report status
export type ReportStatus = "completed" | "processing" | "failed";

// Finding type
export type FindingType = "concern" | "warning" | "positive";

// Individual test data
export interface TestData {
  name: string;
  description: string;
  value: string;
  unit: string;
  referenceRange: string;
  status: TestStatus;
}

// Category of tests
export interface CategoryData {
  name: string;
  interpretation?: string;
  tests: TestData[];
}

// Key finding in report
export interface KeyFinding {
  type: FindingType;
  text: string;
}

// Recommendation
export interface Recommendation {
  title: string;
  description: string;
}

// Complete report data
export interface Report {
  reportId: string;
  patientName: string;
  patientId: string;
  reportDate: string;
  doctorName?: string;
  summary: string;
  keyFindings: KeyFinding[];
  categories: CategoryData[];
  recommendations: Recommendation[];
}

// Report history item
export interface ReportHistory {
  reportId: string;
  reportName: string;
  patientName: string;
  date: string;
  status: ReportStatus;
}
