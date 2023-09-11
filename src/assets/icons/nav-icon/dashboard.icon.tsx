import { IconInterfaceProps } from '@/src/interfaces/icon.interface';

const ICDashboard: React.FC<IconInterfaceProps> = ({ width, height }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 23 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 5C3 4.44772 3.44772 4 4 4H9C9.55228 4 10 4.44772 10 5V12C10 12.5523 9.55228 13 9 13H3V5Z"
        fill="#FFD600"
      />
      <mask id="path-2-inside-1_445_5993" fill="white">
        <rect width="10.1471" height="13.5294" rx="1" />
      </mask>
      <rect
        width="10.1471"
        height="13.5294"
        rx="1"
        stroke="#005BD8"
        strokeWidth="4"
        mask="url(#path-2-inside-1_445_5993)"
      />
      <path
        d="M13 13C13 12.4477 13.4477 12 14 12H19C19.5523 12 20 12.4477 20 13V16C20 16.5523 19.5523 17 19 17H13V13Z"
        fill="#FFD600"
      />
      <mask id="path-4-inside-2_445_5993" fill="white">
        <rect x="12.8529" y="11.5" width="10.1471" height="13.5294" rx="1" />
      </mask>
      <rect
        x="12.8529"
        y="11.5"
        width="10.1471"
        height="13.5294"
        rx="1"
        stroke="#005BD8"
        strokeWidth="4"
        mask="url(#path-4-inside-2_445_5993)"
      />
      <mask id="path-5-inside-3_445_5993" fill="white">
        <rect x="12.8529" width="10.1471" height="8.11765" rx="1" />
      </mask>
      <rect
        x="12.8529"
        width="10.1471"
        height="8.11765"
        rx="1"
        stroke="#005BD8"
        strokeWidth="4"
        mask="url(#path-5-inside-3_445_5993)"
      />
      <mask id="path-6-inside-4_445_5993" fill="white">
        <rect y="16.9119" width="10.1471" height="8.11765" rx="1" />
      </mask>
      <rect
        y="16.9119"
        width="10.1471"
        height="8.11765"
        rx="1"
        stroke="#005BD8"
        strokeWidth="4"
        mask="url(#path-6-inside-4_445_5993)"
      />
    </svg>
  );
};

export default ICDashboard;
