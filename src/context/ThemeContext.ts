import { createContext } from "react";
import { useCustomContext } from "../hooks/useCustomContext";

export type Theme = "light" | "dark";

export type ThemeContextType = {
  theme: "light" | "dark";
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export function useThemeContext() {
  return useCustomContext(ThemeContext, "useThemeContext");
}
