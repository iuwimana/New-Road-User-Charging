import { FC } from 'react';

interface IconPaymentSettingsProps {
  style?: React.CSSProperties;
  fill?: boolean;
  duotone?: boolean;
  size?: number | string; // Optional size prop (defaults to 24)
}

const IconPaymentSettings: FC<IconPaymentSettingsProps> = ({
  style,
  fill = false,
  duotone = true,
  size = 24,
}) => {
  // Determine base color and duotone fallback color
  const defaultColor = fill ? '#3b82f6' : '#4b5563'; // blue for filled, gray for outline
  const primaryColor = style?.color || defaultColor;
  const secondaryColor = duotone ? 'var(--duotone-color, #ffffff)' : primaryColor;

  const mergedStyle: React.CSSProperties = {
    width: typeof size === 'number' ? `${size}px` : size,
    height: typeof size === 'number' ? `${size}px` : size,
    color: primaryColor,
    ...style,
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={mergedStyle}
    >
      {/* Giving Hand (Right) */}
      <path
        d="M15 14L17 12L15 10"
        stroke={fill ? secondaryColor : primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 12H19"
        stroke={fill ? secondaryColor : primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Money Bill */}
      {fill ? (
        <>
          <rect x="8" y="8" width="8" height="5" rx="1" fill={secondaryColor} fillOpacity="0.9" />
          <path d="M10 8V13" stroke={secondaryColor} strokeWidth="1.5" />
          <path d="M14 8V13" stroke={secondaryColor} strokeWidth="1.5" />
        </>
      ) : (
        <>
          <rect x="8" y="8" width="8" height="5" rx="1" stroke={primaryColor} strokeWidth="1.5" />
          <path d="M10 8V13" stroke={primaryColor} strokeWidth="1.5" />
          <path d="M14 8V13" stroke={primaryColor} strokeWidth="1.5" />
        </>
      )}

      {/* Receiving Hand (Left) */}
      <path
        d="M9 14L7 12L9 10"
        stroke={fill ? secondaryColor : primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 12H5"
        stroke={fill ? secondaryColor : primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Gear Settings */}
      <circle
        cx="12"
        cy="5"
        r="1.5"
        fill={fill ? secondaryColor : 'none'}
        stroke={fill ? secondaryColor : primaryColor}
        strokeWidth="1.5"
      />
      <path
        d="M12 3V4M12 6V7M14.5 5L13.5 5M10.5 5L9.5 5"
        stroke={fill ? secondaryColor : primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default IconPaymentSettings;
