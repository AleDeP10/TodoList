import { ThemeWrapper, LangWrapper, LangProvider } from "../lib/providers";

export const UIKitProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <LangProvider>
      <ThemeWrapper>
        <LangWrapper>{children}</LangWrapper>
      </ThemeWrapper>
    </LangProvider>
  );
};
