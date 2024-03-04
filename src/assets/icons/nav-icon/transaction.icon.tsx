import { IconInterfaceProps } from '@/src/interfaces/icon.interface';

export const ICTransaction = ({ width, height }: IconInterfaceProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 33 28"
      fill="none"
    >
      <path
        d="M8 9H14"
        stroke="#005BD8"
        strokeWidth="1.5625"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 14H18"
        stroke="#005BD8"
        strokeWidth="1.5625"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M32 11.75C32 11.6345 32 10.9505 31.997 10.9025C31.943 10.151 31.2995 9.5525 30.4895 9.503C30.4385 9.5 30.377 9.5 30.251 9.5H26.348C23.669 9.5 21.5 11.5145 21.5 14C21.5 16.4855 23.6705 18.5 26.345 18.5H30.2495C30.3755 18.5 30.437 18.5 30.4895 18.497C31.2995 18.4475 31.9445 17.849 31.997 17.0975C32 17.0495 32 16.3655 32 16.25"
        stroke="#FFD600"
        strokeWidth="1.5625"
        strokeLinecap="round"
      />
      <path
        d="M18.5 2C24.1565 2 26.9855 2 28.742 3.758C29.9555 4.97 30.332 6.692 30.4475 9.5M14 26H18.5C24.1565 26 26.9855 26 28.742 24.242C29.9555 23.03 30.332 21.308 30.4475 18.5M12.5 2C7.829 2.015 5.3525 2.162 3.758 3.758C2 5.5145 2 8.3435 2 14C2 19.6565 2 22.4855 3.758 24.242C4.7375 25.223 6.05 25.6565 8 25.847"
        stroke="#005BD8"
        strokeWidth="2.7"
        strokeLinecap="round"
      />
      <circle cx="27.6667" cy="14" r="2" fill="#FFD600" />
    </svg>
  );
};
