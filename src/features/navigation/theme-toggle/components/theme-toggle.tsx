import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback, useMemo } from "react";

import { Button, type ButtonProps } from "@/shared/components/ui/button";

type ThemeToggleProps = ButtonProps & {
  withText?: boolean;
};

export function ThemeToggle({ withText = false, ...props }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  }, [resolvedTheme, setTheme]);

  const text = useMemo(() => {
    if (!withText) {
      return null;
    }

    return resolvedTheme === "light" ? "Темная тема" : "Светлая тема";
  }, [resolvedTheme, withText]);

  return (
    <Button
      priority="tertiary"
      onClick={toggleTheme}
      icon={
        <>
          <MoonIcon className="dark:opacity-0" />
          <SunIcon className="absolute opacity-0 dark:opacity-100" />
        </>
      }
      {...props}
    >
      {text}
    </Button>
  );
}
