import { IconInterfaceProps } from '@/src/interfaces/icon.interface';

export const ICProjects = ({ width, height }: IconInterfaceProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="40" cy="40" r="40" fill="#D6E7FF" />
      <rect
        x="19"
        y="27.2937"
        width="41"
        height="28.1429"
        rx="5"
        stroke="#005BD8"
        stroke-width="4"
      />
      <rect
        x="26"
        y="34.2937"
        width="21.6"
        height="4.6"
        rx="2"
        fill="#FFD600"
      />
      <rect
        x="26"
        y="43.2937"
        width="14.4"
        height="4.6"
        rx="2"
        fill="#FFD600"
      />
      <path
        d="M24 24C24 23.4477 24.4477 23 25 23H43C44.6569 23 46 24.3431 46 26V29.3H24V24Z"
        fill="#FFD600"
      />
    </svg>
  );
};
