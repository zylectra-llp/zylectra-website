import React from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

const ICONS = { system: Monitor, light: Sun, dark: Moon } as const;
const LABELS = { system: "Match system theme", light: "Light theme", dark: "Dark theme" } as const;

const ThemeToggle: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { mode, cycle } = useTheme();
  const Icon = ICONS[mode];

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`${LABELS[mode]}. Click to switch.`}
      title={LABELS[mode]}
      className={`flex items-center justify-center w-9 h-9 rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[rgba(var(--fg-rgb),0.08)] transition-colors ${className}`}
    >
      <Icon className="w-[18px] h-[18px]" />
    </button>
  );
};

export default ThemeToggle;
