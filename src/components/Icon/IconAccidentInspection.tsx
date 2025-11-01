import { FC } from 'react';

interface IconAccidentInspectionProps {
    className?: string;
    fill?: boolean;
    duotone?: boolean;
}

const IconAccidentInspection: FC<IconAccidentInspectionProps> = ({ className, fill = false, duotone = true }) => {
    return (
        <svg 
            width={fill ? "24" : "20"} 
            height={fill ? "24" : "20"} 
            viewBox="0 0 24 24" 
            fill={fill ? "currentColor" : "none"} 
            xmlns="http://www.w3.org/2000/svg" 
            className={className}
        >
            {/* Main inspector */}
            <path
                opacity={duotone ? '0.8' : '1'}
                d="M12 5.5L13.5 4H17V6.5L15.5 8H12V5.5Z"
                stroke="currentColor"
                strokeWidth={fill ? "0" : "1.5"}
            />
            
            {/* Secondary inspector */}
            <path
                opacity={duotone ? '0.6' : '1'}
                d="M7 12.5L5.5 14H3V11.5L4.5 10H7V12.5Z"
                stroke="currentColor"
                strokeWidth={fill ? "0" : "1.5"}
            />
            
            {/* Clipboard */}
            <path
                d="M16 17H8C6.89543 17 6 16.1046 6 15V9C6 7.89543 6.89543 7 8 7H16C17.1046 7 18 7.89543 18 9V15C18 16.1046 17.1046 17 16 17Z"
                stroke="currentColor"
                strokeWidth={fill ? "0" : "1.5"}
            />
            
            {/* Writing hand */}
            <path
                d="M13 11L11 13L10 12"
                stroke={fill ? (duotone ? "#ffffff" : "currentColor") : "currentColor"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            
            {/* Safety helmet 1 */}
            <path
                d="M14 4.5C14 5.32843 13.3284 6 12.5 6C11.6716 6 11 5.32843 11 4.5C11 3.67157 11.6716 3 12.5 3C13.3284 3 14 3.67157 14 4.5Z"
                stroke="currentColor"
                strokeWidth={fill ? "0" : "1.5"}
            />
            
            {/* Safety helmet 2 */}
            <path
                d="M6 13.5C6 14.3284 5.32843 15 4.5 15C3.67157 15 3 14.3284 3 13.5C3 12.6716 3.67157 12 4.5 12C5.32843 12 6 12.6716 6 13.5Z"
                stroke="currentColor"
                strokeWidth={fill ? "0" : "1.5"}
            />
        </svg>
    );
};

export default IconAccidentInspection;