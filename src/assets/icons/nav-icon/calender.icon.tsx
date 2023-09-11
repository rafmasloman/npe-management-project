import { IconInterfaceProps } from '@/src/interfaces/icon.interface';

export const ICalender = ({ width, height }: IconInterfaceProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="0.0292969"
        width="5"
        height="4.16667"
        rx="1"
        fill="#FFD600"
      />
      <rect
        x="15"
        y="0.0292969"
        width="5"
        height="4.16667"
        rx="1"
        fill="#FFD600"
      />
      <path
        d="M1 13.3918H24V24.8918C24 27.101 22.2091 28.8918 20 28.8918H5C2.79086 28.8918 1 27.101 1 24.8918V13.3918Z"
        stroke="#005BD8"
        strokeWidth="2"
      />
      <path
        d="M1 8.02954C1 5.8204 2.79086 4.02954 5 4.02954H20C22.2091 4.02954 24 5.8204 24 8.02954V10.0295H1V8.02954Z"
        stroke="#005BD8"
        strokeWidth="2"
      />
      <rect
        x="4.16663"
        y="19.0586"
        width="3.33333"
        height="3.33333"
        rx="0.5"
        fill="#FFD600"
      />
      <rect
        x="10.8331"
        y="19.0586"
        width="3.33333"
        height="3.33333"
        rx="0.5"
        fill="#FFD600"
      />
      <rect
        x="17.4998"
        y="19.0586"
        width="3.33333"
        height="3.33333"
        rx="0.5"
        fill="#FFD600"
      />
    </svg>
  );
};
