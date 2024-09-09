import Cookies from "js-cookie";

export function setCookie(cookieName: string, value: any) {
  Cookies.set(cookieName, value);
}
export function getCookie(cookieName: string): any {
  return Cookies.get(cookieName);
}

export function removeCookie(cookieName: string) {
  Cookies.remove(cookieName);
}
