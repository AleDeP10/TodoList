import { useState } from "react";

type InteractionSandboxProps = {
  children: (appendText: (msg: string) => void) => React.ReactNode;
};

export const InteractionSandbox = ({ children }: InteractionSandboxProps) => {
  const [text, setText] = useState("");

  const appendText = (msg: string) => {
    setText((prev) => prev + msg + "\n");
  };

  return (
    <div className="max-w-lg">
      {children(appendText)}
      <p
        className="mt-6 text-center"
        style={{ color: "#047878", whiteSpace: "pre-line" }}
      >
        {text}
      </p>
    </div>
  );
};
