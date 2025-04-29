import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReportSection from "./ReportSection";
import { Report } from "@/lib/types";

interface ReportViewerProps {
  report: Report;
}

export default function ReportViewer({ report }: ReportViewerProps) {
  const abnormalCount = report.categories.reduce((count, category) => {
    return (
      count + category.tests.filter((test) => test.status === "abnormal").length
    );
  }, 0);

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-white shadow-md border-l-4 border-[#f4d392]">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-[#214842]">Patient</h3>
            <p className="font-medium">{report.patientName}</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-[#214842]">Report Date</h3>
            <p className="font-medium">{report.reportDate}</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-[#214842]">Report ID</h3>
            <p className="font-medium">{report.reportId}</p>
          </div>
        </div>
      </Card>

      <Card className="bg-white shadow-md">
        <Tabs defaultValue="summary">
          <TabsList className="w-full bg-[#f4d392]/10 rounded-t-lg rounded-b-none border-b border-[#f4d392]/30">
            <TabsTrigger
              value="summary"
              className="data-[state=active]:bg-white data-[state=active]:text-[#214842] data-[state=active]:font-medium"
            >
              Summary
            </TabsTrigger>
            <TabsTrigger
              value="detailed"
              className="data-[state=active]:bg-white data-[state=active]:text-[#214842] data-[state=active]:font-medium"
            >
              Detailed Results
            </TabsTrigger>
            <TabsTrigger
              value="abnormal"
              className="data-[state=active]:bg-white data-[state=active]:text-[#214842] data-[state=active]:font-medium"
            >
              Abnormal Results
              {abnormalCount > 0 && (
                <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full">
                  {abnormalCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="recommendations"
              className="data-[state=active]:bg-white data-[state=active]:text-[#214842] data-[state=active]:font-medium"
            >
              Recommendations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4 text-[#214842]">
                  Report Summary
                </h2>
                <p className="text-gray-600">{report.summary}</p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3 text-[#214842]">
                  Key Findings
                </h3>
                <ul className="space-y-2">
                  {report.keyFindings.map((finding, index) => (
                    <li key={index} className="flex gap-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          finding.type === "concern"
                            ? "bg-red-500"
                            : finding.type === "warning"
                            ? "bg-[#f4d392]"
                            : "bg-green-500"
                        }`}
                      ></div>
                      <p className="text-sm">{finding.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="detailed" className="p-6">
            <h2 className="text-xl font-semibold mb-6 text-[#214842]">
              Detailed Test Results
            </h2>
            <div className="space-y-8">
              {report.categories.map((category) => (
                <ReportSection key={category.name} category={category} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="abnormal" className="p-6">
            <h2 className="text-xl font-semibold mb-6 text-[#214842]">
              Abnormal Results
            </h2>
            {abnormalCount === 0 ? (
              <p className="text-green-600">
                No abnormal results detected in your report!
              </p>
            ) : (
              <div className="space-y-6">
                {report.categories.map((category) => {
                  const abnormalTests = category.tests.filter(
                    (test) => test.status === "abnormal"
                  );
                  if (abnormalTests.length === 0) return null;

                  return (
                    <div
                      key={category.name}
                      className="pb-6 border-b border-gray-200 last:border-0"
                    >
                      <h3 className="text-lg font-medium mb-4 text-[#214842]">
                        {category.name}
                      </h3>
                      <table className="w-full">
                        <thead className="bg-[#f4d392]/10">
                          <tr>
                            <th className="px-4 py-2 text-left text-[#214842]">
                              Test
                            </th>
                            <th className="px-4 py-2 text-right text-[#214842]">
                              Your Value
                            </th>
                            <th className="px-4 py-2 text-right text-[#214842]">
                              Reference Range
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {abnormalTests.map((test) => (
                            <tr
                              key={test.name}
                              className="border-b last:border-0"
                            >
                              <td className="px-4 py-3">
                                <div>
                                  <p className="font-medium">{test.name}</p>
                                  <p className="text-sm text-gray-600">
                                    {test.description}
                                  </p>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-right">
                                <span className="font-semibold text-red-600">
                                  {test.value} {test.unit}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-right text-gray-600">
                                {test.referenceRange}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="recommendations" className="p-6">
            <h2 className="text-xl font-semibold mb-6 text-[#214842]">
              Recommendations
            </h2>
            <div className="space-y-4">
              {report.recommendations.map((rec, index) => (
                <div
                  key={index}
                  className="pb-4 border-b border-gray-100 last:border-0"
                >
                  <h3 className="font-medium mb-2 text-[#214842]">
                    {rec.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{rec.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-[#214842]/10 text-[#214842] rounded-md border-l-4 border-[#214842]">
              <p className="text-sm">
                <strong>Note:</strong> These recommendations are generated
                automatically based on your test results. Always consult with
                your healthcare provider before making any changes to your
                treatment plan or lifestyle.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
