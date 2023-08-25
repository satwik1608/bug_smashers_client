import http from "./httpService";
const url = "https://amused-pleat-goat.cyclic.app";

export function getInterviewer(email) {
  return http.post(`${url}/interviewer/getOne`, email);
}

export function getAllInterviewer() {
  return http.get(`${url}/interviewer/getAll`);
}

export function getAllCandidate(type, all) {
  if (type && all)
    return http.get(`${url}/candidate/getAll?type=${type}&all=${all}`);

  return http.get(`${url}/candidate/getAll`);
}

export function schedule(obj) {
  return http.post(`${url}/interviewer/fixInterview`, obj);
}

export function acceptInvite(obj) {
  return http.post(`${url}/interviewer/accept`, obj);
}

export function rejectInvite(obj) {
  return http.post(`${url}/interviewer/reject`, obj);
}

export function candidateVerdict(obj) {
  return http.post(`${url}/interviewer/verdict`, obj);
}

export function smarty(obj) {
  return http.post(`${url}/interviewer/smartFill`, obj);
}

export function blockTime(obj) {
  return http.post(`${url}/interviewer/makeSlotBusy`, obj);
}

export function register(obj) {
  return http.post(`${url}/interviewer/create`, obj);
}
