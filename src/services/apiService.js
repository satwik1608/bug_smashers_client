import http from "./httpService";
const url = "http://localhost:1337";

export function getInterviewer(email) {
  return http.post(`${url}/interviewer/getOne`, email);
}

export function getAllInterviewer() {
  return http.get(`${url}/interviewer/getAll`);
}
