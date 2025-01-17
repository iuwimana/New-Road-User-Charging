import { FC } from 'react';

interface IconRoadProps {
    className?: string;
    fill?: boolean;
    duotone?: boolean;
}

const IconRoad: FC<IconRoadProps> = ({ className, fill = false, duotone = true }) => {
    return (
        <svg
      viewBox="0 0 576 512"
      fill="currentColor"
      height="1em"
      width="1em"
      className={className}
    >
      <path d="M256 32h-74.8c-27.1 0-51.3 17.1-60.3 42.6L3.1 407.2c-2 5.8-3.1 12-3.1 18.2C0 455.5 24.5 480 54.6 480H256v-64c0-17.7 14.3-32 32-32s32 14.3 32 32v64h201.4c30.2 0 54.6-24.5 54.6-54.6 0-6.2-1.1-12.4-3.1-18.2L455.1 74.6C446 49.1 421.9 32 394.8 32H320v64c0 17.7-14.3 32-32 32s-32-14.3-32-32V32zm64 192v64c0 17.7-14.3 32-32 32s-32-14.3-32-32v-64c0-17.7 14.3-32 32-32s32 14.3 32 32z" />
    </svg>
    );
};

export default IconRoad;
