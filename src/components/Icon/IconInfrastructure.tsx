import React from 'react';

interface RoadDamageRefundIconProps {
  size?: number;
  roadColor?: string;
  damageColor?: string;
  refundColor?: string;
  className?: string;
}

const RoadDamageRefundIcon: React.FC<RoadDamageRefundIconProps> = ({
  size = 64,
  roadColor = '#4B5563', // Gray-600
  damageColor = '#EF4444', // Red-500
  refundColor = '#10B981', // Emerald-500
  className = '',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-label="Road infrastructure damage refund"
      role="img"
    >
      {/* Background circle */}
      <circle cx="12" cy="12" r="11" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="0.5" />
      
      {/* Road with damage */}
      <g fill="none" strokeWidth="1.5">
        {/* Road base */}
        <path 
          d="M4 14h16v2H4z" 
          fill={roadColor} 
          stroke={roadColor}
        />
        
        {/* Road markings */}
        <path 
          d="M8 15h2m4 0h2" 
          stroke="#F9FAFB" 
          strokeLinecap="round"
        />
        
        {/* Damage cracks (highlighted) */}
        <path 
          d="M7 13l-2 3m3-4l1 2m3-3l-1 3m3-4l2 3" 
          stroke={damageColor} 
          strokeWidth="2"
        />
        <circle cx="14" cy="13" r="1.5" fill={damageColor} />
      </g>
      
      {/* Refund symbol (circular arrow + dollar) */}
      <g transform="translate(12 8) scale(0.8)">
        <circle 
          cx="0" 
          cy="0" 
          r="6" 
          fill="none" 
          stroke={refundColor} 
          strokeWidth="1.8"
        />
        <path 
          d="M0 -4v2m0 4v2m-3-3l3-3 3 3" 
          stroke={refundColor} 
          strokeWidth="1.8" 
          strokeLinecap="round"
        />
        <path 
          d="M-2 0h4a2 2 0 1 0 0-4h-3" 
          stroke={refundColor} 
          strokeWidth="1.5" 
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};

export default RoadDamageRefundIcon;