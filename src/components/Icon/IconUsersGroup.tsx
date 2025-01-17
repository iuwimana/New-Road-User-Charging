import { FC } from 'react';

interface IconUsersGroupProps {
    className?: string;
    fill?: boolean;
    duotone?: boolean;
}

const IconUsersGroup: FC<IconUsersGroupProps> = ({ className, fill = false, duotone = true }) => {
    return (
        <svg
        viewBox="0 0 24 24" 
        fill="currentColor"
        height="1em"
        width="1em"
        className={className}
      >
        <path d="M5.005 15.995l4-4-4-4v3h-3v2h3zm14-5v-3l-4 4 4 4v-3h3v-2h-2.072zm-8 7h2v3h-2zm0-5h2v3h-2zm0-5h2v3h-2zm0-5h2v3h-2z" />
      </svg>
    );
};

export default IconUsersGroup;
