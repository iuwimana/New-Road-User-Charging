import { FC } from 'react';

interface IconRevenueCollectionProps {
    className?: string;
    fill?: boolean;
    duotone?: boolean;
}

const IconRevenueCollection: FC<IconRevenueCollectionProps> = ({ className, fill = false, duotone = true }) => {
    return (
        <svg
      viewBox="0 0 64 64"
      fill="currentColor"
      height="1em"
      width="1em"
      className={className}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeMiterlimit={10}
        strokeWidth={2}
        d="M63 38 A19 19 0 0 1 44 57 A19 19 0 0 1 25 38 A19 19 0 0 1 63 38 z"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeMiterlimit={10}
        strokeWidth={2}
        d="M57 38 A13 13 0 0 1 44 51 A13 13 0 0 1 31 38 A13 13 0 0 1 57 38 z"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeMiterlimit={10}
        strokeWidth={2}
        d="M30 51H1v6h37v-1M27 45H3v6h27M26 39H5v6h22M26 33H1v6h25M29 27H3v6h23M35 21H1v6h28M40 20v-5H3v6h32M1 9h37v6H1z"
      />
    </svg>
    );
};

export default IconRevenueCollection;
