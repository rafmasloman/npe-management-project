interface IIconProps {
  color?: string;
}

const ICInstagram = ({ color }: IIconProps) => {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.77612 1.11025C8.998 1.054 9.38758 1.0415 12.5001 1.0415C15.6126 1.0415 16.0022 1.05505 17.223 1.11025C18.4438 1.16546 19.2772 1.36025 20.0063 1.64255C20.7699 1.93109 21.4626 2.38213 22.0355 2.96546C22.6188 3.53734 23.0688 4.229 23.3563 4.99359C23.6397 5.72275 23.8334 6.55609 23.8897 7.77484C23.9459 8.9988 23.9584 9.38838 23.9584 12.4998C23.9584 15.6123 23.9449 16.0019 23.8897 17.2238C23.8345 18.4425 23.6397 19.2759 23.3563 20.005C23.0688 20.7697 22.6181 21.4625 22.0355 22.0353C21.4626 22.6186 20.7699 23.0686 20.0063 23.3561C19.2772 23.6394 18.4438 23.8332 17.2251 23.8894C16.0022 23.9457 15.6126 23.9582 12.5001 23.9582C9.38758 23.9582 8.998 23.9446 7.77612 23.8894C6.55737 23.8342 5.72404 23.6394 4.99487 23.3561C4.23021 23.0685 3.53739 22.6178 2.96466 22.0353C2.38173 21.463 1.93062 20.7706 1.64279 20.0061C1.3605 19.2769 1.16675 18.4436 1.1105 17.2248C1.05425 16.0009 1.04175 15.6113 1.04175 12.4998C1.04175 9.38734 1.05529 8.99775 1.1105 7.77692C1.16571 6.55609 1.3605 5.72275 1.64279 4.99359C1.93104 4.22909 2.3825 3.53662 2.96571 2.96442C3.53762 2.38161 4.22974 1.93051 4.99383 1.64255C5.723 1.36025 6.55633 1.1665 7.77508 1.11025H7.77612ZM17.1303 3.17275C15.922 3.11755 15.5595 3.10609 12.5001 3.10609C9.44071 3.10609 9.0782 3.11755 7.86987 3.17275C6.75216 3.2238 6.14591 3.41025 5.74175 3.56755C5.20737 3.77588 4.82508 4.02275 4.42404 4.4238C4.04388 4.79364 3.75131 5.24388 3.56779 5.7415C3.4105 6.14567 3.22404 6.75192 3.173 7.86963C3.11779 9.07796 3.10633 9.44046 3.10633 12.4998C3.10633 15.5592 3.11779 15.9217 3.173 17.13C3.22404 18.2478 3.4105 18.854 3.56779 19.2582C3.75112 19.755 4.04383 20.2061 4.42404 20.5759C4.79383 20.9561 5.24487 21.2488 5.74175 21.4321C6.14591 21.5894 6.75216 21.7759 7.86987 21.8269C9.0782 21.8821 9.43966 21.8936 12.5001 21.8936C15.5605 21.8936 15.922 21.8821 17.1303 21.8269C18.248 21.7759 18.8542 21.5894 19.2584 21.4321C19.7928 21.2238 20.1751 20.9769 20.5761 20.5759C20.9563 20.2061 21.249 19.755 21.4324 19.2582C21.5897 18.854 21.7761 18.2478 21.8272 17.13C21.8824 15.9217 21.8938 15.5592 21.8938 12.4998C21.8938 9.44046 21.8824 9.07796 21.8272 7.86963C21.7761 6.75192 21.5897 6.14567 21.4324 5.7415C21.224 5.20713 20.9772 4.82484 20.5761 4.4238C20.2063 4.04366 19.756 3.7511 19.2584 3.56755C18.8542 3.41025 18.248 3.2238 17.1303 3.17275V3.17275ZM11.0365 16.0321C11.8539 16.3724 12.764 16.4183 13.6115 16.162C14.4589 15.9058 15.1911 15.3633 15.683 14.6272C16.1749 13.8911 16.396 13.007 16.3085 12.126C16.221 11.245 15.8303 10.4217 15.2032 9.79671C14.8035 9.39721 14.3201 9.09131 13.7879 8.90103C13.2558 8.71076 12.688 8.64084 12.1256 8.69631C11.5632 8.75179 11.02 8.93127 10.5353 9.22185C10.0506 9.51242 9.63627 9.90686 9.32227 10.3768C9.00827 10.8467 8.80236 11.3803 8.71937 11.9394C8.63637 12.4984 8.67836 13.0689 8.84231 13.6097C9.00626 14.1506 9.28808 14.6484 9.6675 15.0673C10.0469 15.4861 10.5145 15.8157 11.0365 16.0321ZM8.3355 8.33525C8.8824 7.78835 9.53166 7.35453 10.2462 7.05855C10.9608 6.76257 11.7266 6.61023 12.5001 6.61023C13.2735 6.61023 14.0394 6.76257 14.7539 7.05855C15.4685 7.35453 16.1178 7.78835 16.6647 8.33525C17.2116 8.88215 17.6454 9.53142 17.9414 10.246C18.2373 10.9605 18.3897 11.7264 18.3897 12.4998C18.3897 13.2733 18.2373 14.0391 17.9414 14.7537C17.6454 15.4683 17.2116 16.1175 16.6647 16.6644C15.5601 17.7689 14.0621 18.3894 12.5001 18.3894C10.9381 18.3894 9.44001 17.7689 8.3355 16.6644C7.23098 15.5599 6.61047 14.0619 6.61047 12.4998C6.61047 10.9378 7.23098 9.43977 8.3355 8.33525V8.33525ZM19.6959 7.48734C19.8314 7.35949 19.9399 7.20575 20.015 7.03523C20.09 6.8647 20.1301 6.68085 20.1328 6.49456C20.1355 6.30827 20.1008 6.12332 20.0308 5.95068C19.9607 5.77804 19.8568 5.6212 19.725 5.48946C19.5933 5.35772 19.4365 5.25375 19.2638 5.18371C19.0912 5.11367 18.9062 5.07898 18.7199 5.08169C18.5337 5.08441 18.3498 5.12448 18.1793 5.19952C18.0087 5.27457 17.855 5.38306 17.7272 5.51859C17.4785 5.78216 17.3424 6.13226 17.3477 6.49456C17.353 6.85686 17.4992 7.20284 17.7555 7.45905C18.0117 7.71526 18.3576 7.86153 18.7199 7.86682C19.0822 7.8721 19.4323 7.73597 19.6959 7.48734V7.48734Z"
        fill={color}
      />
    </svg>
  );
};

export default ICInstagram;
