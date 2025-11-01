import { FC } from "react";

interface IconInsuranceProps {
  className?: string;
  fill?: boolean;
  duotone?: boolean;
}

const IconInsurance: FC<IconInsuranceProps> = ({
  className,
  fill = false,
  duotone = true,
}) => {
  return (
    <svg
      fill={fill ? "#000000" : "none"}
      stroke="#000000"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      height="200px"
      width="200px"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4"
      />
    </svg>
  );
};

export default IconInsurance;
