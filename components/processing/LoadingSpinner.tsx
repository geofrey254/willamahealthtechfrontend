import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
}

export default function LoadingSpinner({
  size = 48,
  className = "",
}: LoadingSpinnerProps) {
  return (
    <div className="flex items-center justify-center">
      <Loader2
        className={`animate-spin text-primary ${className}`}
        size={size}
      />
    </div>
  );
}
