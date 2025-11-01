import React from "react";

interface PaymentSettingIconProps {
  size?: number;
  dollarColor?: string;
  gearColor?: string;
  circleColor?: string;
  className?: string;
}

const PaymentSettingIcon: React.FC<PaymentSettingIconProps> = ({
  size = 220,
  dollarColor = "#6d7070ff",
  gearColor = "#ff133aff",
  circleColor = "#8587f7ff",
  className = "",
}) => {
  const scale = size / 164; // scale everything relative to default size

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={dollarColor}
      strokeWidth={1.5 * scale}
      className={className}
      role="img"
      aria-label="Payment settings"
    >
      {/* Dollar Circle */}
      <circle
        cx={8 * scale}
        cy={12 * scale}
        r={5 * scale}
        stroke={circleColor}
        strokeWidth={1.5 * scale}
        fill="none"
      />
      <text
        x={8 * scale}
        y={13.5 * scale}
        textAnchor="middle"
        fontSize={size * 0.08}
        fontWeight="bold"
        fill={dollarColor}
      >
        $
      </text>

      {/* Gear */}
      <g transform={`translate(${15 * scale} ${12 * scale})`}>
        <circle
          cx={0}
          cy={0}
          r={2.3 * scale}
          stroke={gearColor}
          strokeWidth={1.5 * scale}
          fill="none"
        />
        <path
          d={`M0 ${-4 * scale}v${1.2 * scale}M0 ${2.8 * scale}v${1.2 * scale}M${-4 * scale} 0h${1.2 * scale}M${2.8 * scale} 0h${1.2 * scale}M${-2.8 * scale} ${-2.8 * scale}l${0.9 * scale}.${0.9 * scale}M${1.9 * scale} ${1.9 * scale}l${0.9 * scale}.${0.9 * scale}M${-2.8 * scale} ${2.8 * scale}l${0.9 * scale}-${0.9 * scale}M${1.9 * scale} ${-1.9 * scale}l${0.9 * scale}-${0.9 * scale}`}
          stroke={gearColor}
          strokeWidth={1.3 * scale}
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};

export default PaymentSettingIcon;
