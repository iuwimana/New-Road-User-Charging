import React from 'react';

interface RoadAccidentDamageIconProps {
  size?: number;
  roadColor?: string;
  damageColor?: string;
  barrierColor?: string;
  className?: string;
}

const RoadAccidentDamageIcon: React.FC<RoadAccidentDamageIconProps> = ({
  size = 64,
  roadColor = '#4B5563', // Gray-600
  damageColor = '#EF4444', // Red-500
  barrierColor = '#F59E0B', // Amber-500
  className = '',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-label="Road accident damaged infrastructure"
      role="img"
    >
      {/* Background */}
      <rect width="24" height="24" rx="4" fill="#F3F4F6" />
      
      {/* Road with damage */}
      <g>
        {/* Road surface */}
        <path 
          d="M3 14h18v4H3z" 
          fill={roadColor} 
          stroke={roadColor}
        />
        
        {/* Road markings */}
        <path 
          d="M7 16h2m6 0h2" 
          stroke="#F9FAFB" 
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        
        {/* Damage cracks */}
        <path 
          d="M8 13l-2 4m3-5l1 3m4-4l-2 4m3-5l1 3" 
          stroke={damageColor}
          strokeWidth="2"
          strokeLinecap="round"
        />
        
        {/* Pothole */}
        <path 
          d="M14 15a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" 
          fill={damageColor}
        />
      </g>
      
      {/* Damaged barrier */}
      <g transform="translate(5 8)">
        {/* Barrier base */}
        <rect 
          x="0" 
          y="0" 
          width="14" 
          height="2" 
          rx="1" 
          fill={barrierColor} 
        />
        
        {/* Barrier posts */}
        <rect x="2" y="-4" width="1" height="4" fill={barrierColor} />
        <rect x="6" y="-3" width="1" height="3" fill={barrierColor} />
        <rect x="11" y="-5" width="1" height="5" fill={barrierColor} />
        
        {/* Damage indicators */}
        <path 
          d="M3-4l1-1m7-1l1-1" 
          stroke={damageColor}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
      
      {/* Warning triangle */}
      <path 
        d="M18 6l-3-5h6l-3 5z" 
        fill="#FBBF24" 
        stroke="#B45309" 
        strokeWidth="0.5"
      />
      <path 
        d="M18 5h-1m-1 1h2" 
        stroke="#B45309" 
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default RoadAccidentDamageIcon;