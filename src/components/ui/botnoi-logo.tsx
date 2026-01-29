import { LucideProps } from "lucide-react";

export const BotnoiLogo = (props: LucideProps) => {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Head */}
      <rect x="4" y="8" width="16" height="12" rx="3" ry="3" />
      {/* Eyes */}
      <line x1="9" y1="13" x2="9" y2="15" />
      <line x1="15" y1="13" x2="15" y2="15" />
      {/* Ears */}
      <line x1="2" y1="14" x2="4" y2="14" />
      <line x1="20" y1="14" x2="22" y2="14" />
      {/* Antenna */}
      <path d="M12 8V4H16" />
    </svg>
  );
};
