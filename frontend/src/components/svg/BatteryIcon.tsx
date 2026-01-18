import type { SVGProps } from 'react';

export const BatteryIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M2 5C2 4.44772 2.44772 4 3 4H11C11.5523 4 12 4.44772 12 5V11C12 11.5523 11.5523 12 11 12H3C2.44772 12 2 11.5523 2 11V5Z"
        fill="currentColor"
      />
      <path
        d="M12 6H13C13.5523 6 14 6.44772 14 7V9C14 9.55228 13.5523 10 13 10H12V6Z"
        fill="currentColor"
      />
    </svg>
  );
};
