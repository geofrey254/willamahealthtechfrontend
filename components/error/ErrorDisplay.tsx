import { AlertTriangle, FileX, WifiOff, Lock } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface ErrorDisplayProps {
  type: string;
  message: string;
}

export default function ErrorDisplay({ type, message }: ErrorDisplayProps) {
  // Configure the error display based on type
  const getErrorConfig = () => {
    switch (type) {
      case "upload":
        return {
          icon: <FileX className="h-12 w-12 text-red-500" />,
          title: "Upload Error",
          description: message || "There was a problem uploading your file.",
          helpText:
            "Make sure your file is in PDF format and under 10MB in size.",
        };
      case "network":
        return {
          icon: <WifiOff className="h-12 w-12 text-red-500" />,
          title: "Network Error",
          description: message || "Connection to the server failed.",
          helpText: "Please check your internet connection and try again.",
        };
      case "permission":
        return {
          icon: <Lock className="h-12 w-12 text-red-500" />,
          title: "Permission Error",
          description:
            message || "You don't have permission to access this resource.",
          helpText:
            "Please make sure you're logged in with the correct account.",
        };
      default:
        return {
          icon: <AlertTriangle className="h-12 w-12 text-red-500" />,
          title: "Error",
          description: message || "An unexpected error occurred.",
          helpText:
            "Please try again or contact support if the issue persists.",
        };
    }
  };

  const errorConfig = getErrorConfig();

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardContent className="pt-6 text-center">
        <div className="flex justify-center mb-4">{errorConfig.icon}</div>
        <h2 className="text-2xl font-bold mb-2">{errorConfig.title}</h2>
        <p className="text-red-600 mb-4">{errorConfig.description}</p>
        <p className="text-sm text-muted-foreground">{errorConfig.helpText}</p>
      </CardContent>
      <CardFooter className="bg-muted p-4 text-xs text-muted-foreground">
        Error Code: {type}-{Date.now().toString().slice(-6)}
      </CardFooter>
    </Card>
  );
}
