import React from "react";
import Button from "@mui/material/Button";
import { useResetErrorBoundaryOnLocationChange } from "react-admin";

interface MyErrorProps {
  error: Error;
  resetErrorBoundary: () => void; 
  errorInfo: { componentStack: string };
}

const MyError: React.FC<MyErrorProps> = ({ error, resetErrorBoundary, errorInfo }) => {
  useResetErrorBoundaryOnLocationChange(resetErrorBoundary);

  return (
    <div>
      <h1>Something Went Wrong</h1>
      <div>A client error occurred and your request couldn't be completed.</div>
      {process.env.NODE_ENV !== "production" && (
        <details>
          <summary>Error Details</summary>
          <h2>{error.message}</h2>
          <pre>{errorInfo.componentStack}</pre>
        </details>
      )}
      <div>
        <Button onClick={() => window.history.go(-1)}>Back</Button>
      </div>
    </div>
  );
};

export default MyError;
