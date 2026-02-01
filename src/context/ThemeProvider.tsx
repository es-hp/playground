import { useState } from "react";
import { ThemeContext } from "./ThemeContext";
import type { ProviderProps } from "../types/types";

export function ThemeProvider({ children }: ProviderProps) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
