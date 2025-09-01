import { Report } from "./types";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function uploadPdf(file: File): Promise<{
  reportId: string;
  file: string;
  patient: {
    name: string;
    id: string;
    reportDate: string;
  };
  llm_result: string;
}> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/api/upload/`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to upload file");
  }

  const data = await response.json(); // Get the response JSON
  return {
    reportId: data.id,
    file: data.file,
    patient: data.patient,
    llm_result: data.llm_result,
  };
}

export async function getReportById(id: string): Promise<Report> {
  const response = await fetch(`${API_URL}/api/upload/${id}/retrieve_report/`);
  if (!response.ok) throw new Error("Failed to fetch report");

  const data = await response.json();

  if (!data.llm_result) {
    throw new Error("No cleaned data found for the report.");
  }

  return {
    patientName: data.patient.name,
    patientId: data.patient.id,
    reportDate: data.patient.reportDate,
    llm_result: data.llm_result,
    reportId: data.id,
  };
}
