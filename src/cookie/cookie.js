import Cookies from "js-cookie";

export function setCookie(token) {
  console.log(token, "token");
  Cookies.set("token", JSON.stringify(token), { expires: 1 });
}

export function getCookie(value) {
  if (Cookies.get(value)) {
    return JSON.parse(Cookies.get(value));
  }
  return null;
}

export function removeCookie(value) {
  Cookies.remove(value);
}