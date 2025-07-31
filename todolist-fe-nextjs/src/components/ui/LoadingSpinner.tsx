import { Icons } from "@/lib/icons/Icons";

const LoadingSpinner = () => {
  return (
    <div
      className="flex justify-center items-center"
      style={{ minHeight: "calc(100vh - 180px)" }}
    >
      {Icons.spinner}
    </div>
  );
};

export default LoadingSpinner;
