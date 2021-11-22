import http from "../../http-service";
import { dbUrl } from "../../api-config";

export async function getPlayers() {
  return await http.get(dbUrl.players);
}

export async function createPlayer(player) {
  return await http.post(`${dbUrl.players}add/`, player);
}

export async function updPlayer(player) {
  return await http.post(`${dbUrl.players}update/${player._id}`, player);
}

export async function deletePlayer(id) {
  return await http.delete(`${dbUrl.players}${id}`);
}

export async function getPlayerImg(){
  
}
