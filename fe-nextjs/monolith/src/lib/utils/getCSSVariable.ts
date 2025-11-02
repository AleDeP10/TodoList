export const getCSSVariable = (name: string) => {
  if (typeof window === "undefined") return "";
  const root = window.getComputedStyle(document.documentElement);
  return root.getPropertyValue(name).trim();
}

export const getCSSVariableAsync = (
  name: string,
  timeout = 2000
): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return resolve("");

    const start = Date.now();
    const check = () => {
      const value = window
        .getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim();

      if (value) {
        resolve(value);
      } else if (Date.now() - start > timeout) {
        reject(new Error(`[getCSSVariableAsync] Timeout waiting for ${name}`));
      } else {
        setTimeout(check, 50); // retry every 50ms
      }
    };

    check();
  });
};
