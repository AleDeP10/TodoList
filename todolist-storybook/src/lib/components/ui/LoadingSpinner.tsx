import { Icons } from "../Icons";

export interface LoadingSpinnerProps {
  size?: number;
  color?: string;
  className?: string;
}

const LoadingSpinner = ({
  size = 64,
  color = "text-yellow-400",
  className = "",
}: LoadingSpinnerProps) => {
  return (
    <div
      className="flex justify-center items-center"
      style={{ minHeight: "calc(100vh - 180px)" }}
    >
      {Icons.spinner({ size, color, className })}
    </div>
  );
};

export default LoadingSpinner;
