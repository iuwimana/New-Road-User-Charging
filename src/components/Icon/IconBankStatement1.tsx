import { FC } from "react";

interface IconBankStatementProps {
  className?: string;
  fill?: boolean;
  duotone?: boolean;
}

const IconBankStatement: FC<IconBankStatementProps> = ({ className, fill = false, duotone = true }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={fill ? "28" : "24"}
      height={fill ? "28" : "24"}
      className={className}
      fill={fill ? "currentColor" : "none"}
    >
      {/* Paper background */}
      <rect
        x="8"
        y="6"
        width="36"
        height="52"
        rx="3"
        ry="3"
        stroke="currentColor"
        strokeWidth="3"
        fill={fill ? "currentColor" : "none"}
        opacity={duotone ? "0.85" : "1"}
      />

      {/* Bookmark */}
      <path
        d="M40 6v12l-4-3-4 3V6"
        stroke="currentColor"
        strokeWidth="3"
        fill={fill ? "#FFD43B" : "none"}
        opacity={duotone ? "0.9" : "1"}
      />

      {/* Dollar symbol */}
      <path
        d="M28 18c0-3 2-5 5-5s5 2 5 5-2 5-5 5h-2v3"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={duotone ? "0.9" : "1"}
      />

      {/* Text lines */}
      <line x1="16" y1="30" x2="36" y2="30" stroke="currentColor" strokeWidth="3" opacity="0.7" />
      <line x1="16" y1="38" x2="36" y2="38" stroke="currentColor" strokeWidth="3" opacity="0.7" />
      <line x1="16" y1="46" x2="32" y2="46" stroke="currentColor" strokeWidth="3" opacity="0.7" />

      {/* Bank building (front) */}
      <polygon
        points="44,40 60,40 52,32"
        stroke="currentColor"
        strokeWidth="3"
        fill={fill ? "currentColor" : "none"}
        opacity={duotone ? "0.8" : "1"}
      />
      <rect x="46" y="40" width="12" height="10" stroke="currentColor" strokeWidth="3" opacity="0.9" />
      <line x1="46" y1="50" x2="58" y2="50" stroke="currentColor" strokeWidth="3" />
      <circle cx="52" cy="36" r="1.5" fill="currentColor" />
    </svg>
  );
};

export default IconBankStatement;
