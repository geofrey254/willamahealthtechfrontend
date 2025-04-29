import { Report, ReportHistory } from "./types";

const API_URL = "https://your-django-api.com/api";

export async function uploadPdf(file: File): Promise<{ reportId: string }> {
  // For demo purposes, we'll simulate the API call
  // In a real application, you would use fetch or axios
  console.log("Uploading file:", file.name);

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // For demo, return a mock response
  return { reportId: `report-${Date.now()}` };

  // Real implementation would look like:
  /*
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch(`${API_URL}/upload-pdf/`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to upload file');
  }
  
  return response.json();
  */
}

export async function getReportResults(reportId: string): Promise<Report> {
  // For demo purposes, return mock data
  console.log("Fetching results for report:", reportId);

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock report data
  return {
    reportId,
    patientName: "Jane Doe",
    patientId: "P12345",
    reportDate: "2025-04-25",
    doctorName: "Dr. Smith",
    summary:
      "Overall, this blood test shows mostly normal results with a few values that should be monitored. Cholesterol levels are slightly elevated, and vitamin D is below the optimal range.",
    keyFindings: [
      {
        type: "concern",
        text: "Total cholesterol is elevated at 220 mg/dL (optimal: <200 mg/dL)",
      },
      {
        type: "warning",
        text: "Vitamin D is low at 22 ng/mL (optimal: 30-50 ng/mL)",
      },
      {
        type: "positive",
        text: "Complete blood count values are all within normal ranges",
      },
      { type: "positive", text: "Kidney and liver function tests are normal" },
    ],
    categories: [
      {
        name: "Complete Blood Count",
        interpretation:
          "Your complete blood count values are all within normal ranges, indicating good overall health of your blood cells.",
        tests: [
          {
            name: "Hemoglobin",
            description: "Protein in red blood cells that carries oxygen",
            value: "14.2",
            unit: "g/dL",
            referenceRange: "12.0 - 15.5",
            status: "normal",
          },
          {
            name: "White Blood Cell Count",
            description: "Cells that help fight infection",
            value: "7.8",
            unit: "10³/μL",
            referenceRange: "4.5 - 11.0",
            status: "normal",
          },
          {
            name: "Platelet Count",
            description: "Cells that help blood clot",
            value: "245",
            unit: "10³/μL",
            referenceRange: "150 - 450",
            status: "normal",
          },
        ],
      },
      {
        name: "Lipid Panel",
        interpretation:
          "Your cholesterol levels show some elevation that should be addressed through diet, exercise, or possible medication if recommended by your doctor.",
        tests: [
          {
            name: "Total Cholesterol",
            description: "Measures all cholesterol in blood",
            value: "220",
            unit: "mg/dL",
            referenceRange: "< 200",
            status: "abnormal",
          },
          {
            name: "LDL Cholesterol",
            description: "Bad cholesterol that builds up in arteries",
            value: "142",
            unit: "mg/dL",
            referenceRange: "< 130",
            status: "abnormal",
          },
          {
            name: "HDL Cholesterol",
            description: "Good cholesterol that removes bad cholesterol",
            value: "52",
            unit: "mg/dL",
            referenceRange: "> 40",
            status: "normal",
          },
          {
            name: "Triglycerides",
            description: "Type of fat in the blood",
            value: "135",
            unit: "mg/dL",
            referenceRange: "< 150",
            status: "normal",
          },
        ],
      },
      {
        name: "Vitamins & Minerals",
        interpretation:
          "Your vitamin D level is below the optimal range, which is common but should be addressed with supplementation as recommended by your doctor.",
        tests: [
          {
            name: "Vitamin D, 25-OH",
            description: "Measures vitamin D level",
            value: "22",
            unit: "ng/mL",
            referenceRange: "30 - 80",
            status: "abnormal",
          },
          {
            name: "Vitamin B12",
            description: "Vitamin important for nerve and blood cell health",
            value: "540",
            unit: "pg/mL",
            referenceRange: "200 - 900",
            status: "normal",
          },
          {
            name: "Ferritin",
            description: "Protein that stores iron",
            value: "45",
            unit: "ng/mL",
            referenceRange: "15 - 150",
            status: "normal",
          },
        ],
      },
    ],
    recommendations: [
      {
        title: "Consider cholesterol management",
        description:
          "Talk to your doctor about lifestyle changes or medication to lower your cholesterol levels. Increasing exercise and reducing saturated fats in your diet may help.",
      },
      {
        title: "Vitamin D supplementation",
        description:
          "Consider taking a vitamin D supplement of 1000-2000 IU daily to raise your levels into the optimal range.",
      },
      {
        title: "Follow-up testing",
        description:
          "Schedule a follow-up blood test in 3-6 months to monitor your cholesterol and vitamin D levels after implementing recommended changes.",
      },
    ],
  };
}

export async function getUserReportHistory(): Promise<ReportHistory[]> {
  // For demo purposes, return mock data
  console.log("Fetching user report history");

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Mock history data
  return [
    {
      reportId: "report-12345",
      reportName: "Annual Check-up",
      patientName: "Jane Doe",
      date: "2025-04-15",
      status: "completed",
    },
    {
      reportId: "report-12346",
      reportName: "Cholesterol Follow-up",
      patientName: "Jane Doe",
      date: "2025-01-22",
      status: "completed",
    },
    {
      reportId: "report-12347",
      reportName: "Vitamin Panel",
      patientName: "Jane Doe",
      date: "2024-10-05",
      status: "completed",
    },
    {
      reportId: "report-12348",
      reportName: "COVID Recovery Panel",
      patientName: "Jane Doe",
      date: "2024-08-18",
      status: "failed",
    },
  ];
}
