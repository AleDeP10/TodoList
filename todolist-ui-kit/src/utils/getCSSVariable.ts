export const getCSSVariable = (name: string) => {
  if (typeof window === "undefined") return "";
  const root = window.getComputedStyle(document.documentElement);
  return root.getPropertyValue(name).trim();
}