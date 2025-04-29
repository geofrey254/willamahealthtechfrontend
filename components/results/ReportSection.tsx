import { Badge } from "@/components/ui/badge";
import { CategoryData } from "@/lib/types";

interface ReportSectionProps {
  category: CategoryData;
}

export default function ReportSection({ category }: ReportSectionProps) {
  return (
    <div className="pb-6 border-b border-gray-200 last:border-0">
      <h3 className="text-lg font-medium mb-4">{category.name}</h3>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-2 text-left">Test</th>
              <th className="px-4 py-2 text-right">Result</th>
              <th className="px-4 py-2 text-right">Reference Range</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {category.tests.map((test) => (
              <tr
                key={test.name}
                className="border-b border-gray-100 last:border-0"
              >
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium">{test.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {test.description}
                    </p>
                  </div>
                </td>
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  <span
                    className={`font-semibold ${
                      test.status === "abnormal"
                        ? "text-red-600"
                        : test.status === "borderline"
                        ? "text-amber-600"
                        : "text-green-600"
                    }`}
                  >
                    {test.value} {test.unit}
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-muted-foreground whitespace-nowrap">
                  {test.referenceRange}
                </td>
                <td className="px-4 py-3">
                  <Badge
                    variant={
                      test.status === "normal"
                        ? "outline"
                        : test.status === "borderline"
                        ? "secondary"
                        : "destructive"
                    }
                    className="whitespace-nowrap"
                  >
                    {test.status === "normal"
                      ? "Normal"
                      : test.status === "borderline"
                      ? "Borderline"
                      : "Abnormal"}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {category.interpretation && (
        <div className="mt-4 p-3 bg-muted rounded-md">
          <h4 className="text-sm font-medium mb-1">Interpretation</h4>
          <p className="text-sm text-muted-foreground">
            {category.interpretation}
          </p>
        </div>
      )}
    </div>
  );
}
