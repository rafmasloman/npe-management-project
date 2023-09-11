import { IconInterfaceProps } from '@/src/interfaces/icon.interface';

export const ICProject = ({ width, height }: IconInterfaceProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1"
        y="2.87842"
        width="23"
        height="15.8571"
        rx="3"
        stroke="#005BD8"
        strokeWidth="2"
      />
      <rect x="5" y="6.87842" width="12" height="2" rx="1" fill="#FFD600" />
      <rect x="5" y="11.8784" width="8" height="2" rx="1" fill="#FFD600" />
      <path
        d="M4 1.04858C4 0.496299 4.44772 0.048584 5 0.048584H13C14.6569 0.048584 16 1.39173 16 3.04858V4.04858H4V1.04858Z"
        fill="#FFD600"
      />
    </svg>
  );
};
