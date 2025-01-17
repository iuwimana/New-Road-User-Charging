import { FC } from 'react';

interface IconRevenueProps {
    className?: string;
    fill?: boolean;
    duotone?: boolean;
}

const IconRevenue: FC<IconRevenueProps> = ({ className, fill = false, duotone = true }) => {
    return (
        <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        height="1em"
        width="1em"
      className={className}
    >
       <path d="M17.726 13.02L14 16H9v-1h4.065a.5.5 0 00.416-.777l-.888-1.332A1.995 1.995 0 0010.93 12H3a1 1 0 00-1 1v6a2 2 0 002 2h9.639a3 3 0 002.258-1.024L22 13l-1.452-.484a2.998 2.998 0 00-2.822.504zM15.403 12a3 3 0 003-3c0-2.708-3-6-3-6s-3 3.271-3 6a3 3 0 003 3z" />
       </svg>
    );
};

export default IconRevenue;
