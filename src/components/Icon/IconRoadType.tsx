import { FC } from 'react';

interface IconRoadTypeProps {
    className?: string;
    fill?: boolean;
    duotone?: boolean;
}

const IconRoadType: FC<IconRoadTypeProps> = ({ className, fill = false, duotone = true }) => {
    return (
        <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="1em"
      width="1em"
      className={className}
    >
      <path d="M19 11h-6V8h6a2 2 0 002-2V4a2 2 0 00-2-2H5L2 5l3 3h6v3H5a2 2 0 00-2 2v2a2 2 0 002 2h6v5h2v-5h6l3-3-3-3z" />
    </svg>
    );
};

export default IconRoadType;
