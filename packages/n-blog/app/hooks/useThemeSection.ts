import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const useThemeSession = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const sessionTheme = window.localStorage.getItem("theme");
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)",
    );
    sessionTheme && setTheme(sessionTheme);
    if (sessionTheme) {
      setTheme(sessionTheme);
    } else {
      if (darkModeMediaQuery.matches) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    }
    darkModeMediaQuery.addEventListener(
      "change",
      (e) => {
        if (e.matches) {
          setTheme("dark");
        } else {
          setTheme("light");
        }
      },
      false,
    );
    setMounted(true);
  }, []);
  const switchTheme = (theme: string) => {
    setTheme(theme);
    window.localStorage.setItem("theme", theme);
  };
  return { theme, switchTheme, mounted };
};

export { useThemeSession };
