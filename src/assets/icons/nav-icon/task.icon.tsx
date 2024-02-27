import { IconInterfaceProps } from '@/src/interfaces/icon.interface';

export const ICTask = ({
  width,
  height,
  primaryColor,
  secondaryColor,
}: IconInterfaceProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 30 30"
      fill="none"
    >
      <path
        d="M27.075 13.05L25.85 18.275C24.8 22.7875 22.725 24.6125 18.825 24.2375C18.2 24.1875 17.525 24.075 16.8 23.9L14.7 23.4C9.48748 22.1625 7.87498 19.5875 9.09998 14.3625L10.325 9.12501C10.575 8.06251 10.875 7.13751 11.25 6.37501C12.7125 3.35001 15.2 2.53751 19.375 3.52501L21.4625 4.01251C26.7 5.23751 28.3 7.82501 27.075 13.05Z"
        fill="white"
        stroke={`${primaryColor || '#005BD8'}`}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M18.8249 24.2375C18.0499 24.7625 17.0749 25.2 15.8874 25.5875L13.9124 26.2375C8.94994 27.8375 6.33744 26.5 4.72494 21.5375L3.12494 16.6C1.52494 11.6375 2.84994 9.0125 7.81244 7.4125L9.78744 6.7625C10.2999 6.6 10.7874 6.4625 11.2499 6.375C10.8749 7.1375 10.5749 8.0625 10.3249 9.125L9.09994 14.3625C7.87494 19.5875 9.48744 22.1625 14.6999 23.4L16.7999 23.9C17.5249 24.075 18.1999 24.1875 18.8249 24.2375Z"
        stroke={`${primaryColor || '#005BD8'}`}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15.8 10.6625L21.8625 12.2"
        stroke={`${secondaryColor || '#FFD600'}`}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14.575 15.5L18.2 16.425"
        stroke={`${secondaryColor || '#FFD600'}`}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
