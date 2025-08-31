import { useState } from "react";

type TestWrapperProps = {
  children: (appendText: (msg: string) => void) => React.ReactNode;
};

export const TestWrapper = ({ children }: TestWrapperProps) => {
  const [text, setText] = useState("");

  const appendText = (msg: string) => {
    setText((prev) => prev + msg + "\n");
  };

  return (
    <div style={{ textAlign: "center" }}>
      {children(appendText)}
      <p style={{ color: "#047878", whiteSpace: "pre-line" }}>{text}</p>
    </div>
  );
};
