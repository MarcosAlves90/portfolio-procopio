import React from "react";

export type Theme = "light" | "dark" | "system";
export type EffectiveTheme = "light" | "dark";

export type ThemeContextValue = {
  stored: Theme | null;
  effective: EffectiveTheme;
  setTheme: (t: Theme) => void;
  toggle: () => void;
};

export const ThemeContext = React.createContext<ThemeContextValue | undefined>(
  undefined,
);
