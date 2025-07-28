import { CircularProgress } from "@mui/material";

const LoadingSpinner = () => {
  return (
    <div style={{
      minHeight: "calc(100vh - 180px)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <CircularProgress size={48} sx={{ color: "#f5a623" }} />
    </div>
  );
};

export default LoadingSpinner;