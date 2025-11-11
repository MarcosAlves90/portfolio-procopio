import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ThemeContext } from "./theme-core";
import type { Theme } from "./theme-core";
import themeModule from "../theme";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const initial = themeModule.getTheme();
  const [stored, setStored] = useState<Theme | null>(initial.stored);
  const [effective, setEffective] = useState<"light" | "dark">(
    initial.effective,
  );

  useEffect(() => {
    const unsub = themeModule.subscribe((eff) => {
      setStored(themeModule.getTheme().stored);
      setEffective(eff);
    });
    return () => {
      try {
        unsub();
      } catch {
        // ignore
      }
    };
  }, []);

  const setTheme = useCallback((t: Theme) => {
    themeModule.setTheme(t);
    setStored(t === "system" ? null : t);
  }, []);

  const toggle = useCallback(
    () => setTheme(effective === "dark" ? "light" : "dark"),
    [effective, setTheme],
  );

  const value = useMemo(
    () => ({ stored, effective, setTheme, toggle }),
    [stored, effective, setTheme, toggle],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
