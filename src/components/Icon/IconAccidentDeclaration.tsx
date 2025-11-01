import React from 'react';

interface RoadAccidentDeclarationIconProps {
  size?: number;
  roadColor?: string;
  vehicleColor?: string;
  alertColor?: string;
  className?: string;
}

const RoadAccidentDeclarationIcon: React.FC<RoadAccidentDeclarationIconProps> = ({
  size = 64,
  roadColor = '#4B5563', // Gray-600
  vehicleColor = '#3B82F6', // Blue-500
  alertColor = '#EF4444', // Red-500
  className = '',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-label="Road accident declaration"
      role="img"
    >
      {/* Background */}
      <rect width="24" height="24" rx="4" fill="#F3F4F6" />
      
      {/* Road */}
      <path 
        d="M3 16h18v3H3z" 
        fill={roadColor} 
        stroke={roadColor}
      />
      
      {/* Road markings */}
      <path 
        d="M7 17h2m6 0h2" 
        stroke="#F9FAFB" 
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      
      {/* Collided vehicles */}
      <g transform="translate(8 10)">
        {/* First car */}
        <path 
          d="M-5 0h3v3h-3z" 
          fill={vehicleColor} 
          stroke="#1E40AF" 
          strokeWidth="0.5"
        />
        {/* Second car */}
        <path 
          d="M2 0h3v3h-3z" 
          fill={vehicleColor} 
          stroke="#1E40AF" 
          strokeWidth="0.5"
        />
        {/* Collision sparks */}
        <path 
          d="M0 1l1-1m0 2l1 1" 
          stroke={alertColor} 
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
      
      {/* Declaration document */}
      <path 
        d="M14 6h3v3h-3z" 
        fill="#FFFFFF" 
        stroke="#6B7280" 
        strokeWidth="0.8"
      />
      <path 
        d="M15 7h1m-1 1h1" 
        stroke="#111827" 
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      
      {/* Alert triangle */}
      <path 
        d="M6 6l2-3.5 2 3.5H6z" 
        fill={alertColor} 
        stroke="#FFFFFF" 
        strokeWidth="0.5"
      />
      <path 
        d="M7 6h2m-1 0v1" 
        stroke="#FFFFFF" 
        strokeWidth="0.8"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default RoadAccidentDeclarationIcon;