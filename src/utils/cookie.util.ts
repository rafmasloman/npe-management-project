import { setCookie, getCookie, deleteCookie } from 'cookies-next';

export const __setBrowserAuthCookie = (key: string, value: string | null) => {
  setCookie(key, value);
};

export const __getBrowserAuthCookie = (name: string) => {
  return getCookie(name);
};

export function __deleteBrowserCookie(name: string) {
  deleteCookie(name);
}

let ssrToken = '';

export const __setSSRAuthCookie = (authToken: string) => {
  ssrToken = authToken;
};

export const __getSSRAuthCookie = () => {
  return ssrToken;
};
