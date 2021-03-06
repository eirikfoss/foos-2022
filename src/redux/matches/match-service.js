import http from "../../http-service";
import { dbUrl } from "../../api-config";
import openSocket from "socket.io-client";



export async function getMatches() {
  return await http.get(dbUrl.matches);
}

export async function deleteMatch(id) {
  return await http.delete(`${dbUrl.matches}${id}`);
}

export async function postMatch(matchData) {
  return await http.post(`${dbUrl.matches}add/`, matchData);
}

export async function updMatch(matchData) {
  return await http.post(`${dbUrl.matches}update/${matchData._id}`, matchData);
}
