import { FC } from 'react';

interface IconExpendureProps {
    className?: string;
    fill?: boolean;
    duotone?: boolean;
}

const IconExpendure: FC<IconExpendureProps> = ({ className, fill = false, duotone = true }) => {
    return (
        


<svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em" className={className}>
                {/* Calendar base */}
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z" />
                {/* Target inside calendar */}
                <path d="M12 13c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" 
                      fill="blue" />
                <path d="M12 11c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" 
                      fill="none" stroke="white" strokeWidth="2" />
            </svg>
    );
};

export default IconExpendure;
