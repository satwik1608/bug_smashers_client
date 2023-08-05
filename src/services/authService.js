import jwtDecode from "jwt-decode";
import http from "./httpService";
// const url = "https://shiny-ox-leotard.cyclic.app";

const url = "https://amused-pleat-goat.cyclic.app";

export function getJwt() {
  return localStorage.getItem("token");
}

http.setJwt(getJwt());

export async function login(fields) {
  console.log(fields);
  const { data } = await http.post(`${url}/login`, fields);

  localStorage.setItem("token", data.token);
}

export function logout() {
  localStorage.removeItem("token");
}

export function getCurrentUser() {
  try {
    const token = getJwt("token");

    const User = jwtDecode(token);

    return User;
  } catch {
    return null;
  }
}
