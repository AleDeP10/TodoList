import { useState } from "react";

type MenuTestWrapperProps = {
  children: (setContent: (text: string) => void) => React.ReactNode;
};

export const MenuTestWrapper = ({ children }: MenuTestWrapperProps) => {
  const [content, setContent] = useState("Select an item");

  return (
    <div className="space-y-4">
      {children(setContent)}
      <div className="border p-4 rounded bg-gray-50 text-sm text-gray-700">
        {content}
      </div>
    </div>
  );
};
