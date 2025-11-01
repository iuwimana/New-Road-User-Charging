import { FC } from 'react';

interface IconInspectionSettingsProps {
  className?: string;
  fill?: boolean;
  duotone?: boolean;
}

const IconInspectionSettings: FC<IconInspectionSettingsProps> = ({ 
  className, 
  fill = false, 
  duotone = true 
}) => {
  return (
    <>
      {!fill ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Eye (inspection) */}
          <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" 
                stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 5C7 5 3.73 8.11 2 12C3.73 15.89 7 19 12 19C17 19 20.27 15.89 22 12C20.27 8.11 17 5 12 5Z" 
                stroke="currentColor" strokeWidth="1.5" />
          
          {/* Wrench (settings tool) - integrated at bottom right */}
          <path d="M14 19L17 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M16.5 13.5L20.5 9.5C21.3284 8.67157 21.3284 7.32843 20.5 6.5V6.5C19.6716 5.67157 18.3284 5.67157 17.5 6.5L13.5 10.5" 
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M19 11L17 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ) : (
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Eye background */}
          <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" 
                fill="currentColor" />
          <path d="M12 5C7 5 3.73 8.11 2 12C3.73 15.89 7 19 12 19C17 19 20.27 15.89 22 12C20.27 8.11 17 5 12 5Z" 
                fill="currentColor" />
          
          {/* Wrench tool with duotone effect */}
          <path d="M14 19L17 16" 
                stroke={duotone ? 'var(--duotone-color, #ffffff)' : 'currentColor'} 
                strokeWidth="1.5" 
                strokeLinecap="round" />
          <path d="M16.5 13.5L20.5 9.5C21.3284 8.67157 21.3284 7.32843 20.5 6.5V6.5C19.6716 5.67157 18.3284 5.67157 17.5 6.5L13.5 10.5" 
                stroke={duotone ? 'var(--duotone-color, #ffffff)' : 'currentColor'} 
                strokeWidth="1.5" 
                strokeLinecap="round" />
          <path d="M19 11L17 13" 
                stroke={duotone ? 'var(--duotone-color, #ffffff)' : 'currentColor'} 
                strokeWidth="1.5" 
                strokeLinecap="round" />
          
          {/* Eye pupil with duotone contrast */}
          <circle cx="12" cy="12" r="2" 
                  fill={duotone ? 'var(--duotone-color, #ffffff)' : 'currentColor'} 
                  opacity={duotone ? '0.8' : '1'} />
        </svg>
      )}
    </>
  );
};

export default IconInspectionSettings;