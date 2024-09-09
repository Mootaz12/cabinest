import Cookies from "js-cookie";

export function setCookie(cookieName: string, value: any): null {
  Cookies.set(`${cookieName}`, value);
  return null;
}
export function getCookie(cookieName: string): any {
  const cookieValue = Cookies.get(`${cookieName}`);
  return cookieValue ? JSON.parse(cookieValue) : null;
}

export function removeCookie(cookieName: string): null {
  Cookies.remove(`${cookieName}`);
  return null;
}
