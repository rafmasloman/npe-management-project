import { IconInterfaceProps } from '@/src/interfaces/icon.interface';

export const ICTask = ({ width, height }: IconInterfaceProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 26 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1"
        y="1.89209"
        width="24"
        height="24"
        rx="3"
        stroke="#005BD8"
        strokeWidth="2"
      />
      <rect
        x="4.16003"
        y="7.13208"
        width="15.6"
        height="2.6"
        rx="1.3"
        fill="#005BD8"
      />
      <rect
        x="4.16003"
        y="17.532"
        width="15.6"
        height="2.6"
        rx="1.3"
        fill="#FFD600"
      />
      <rect
        x="4.16003"
        y="12.332"
        width="11.44"
        height="2.6"
        rx="1.3"
        fill="#FFD600"
      />
    </svg>
  );
};
