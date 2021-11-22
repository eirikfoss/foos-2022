import openSocket from "socket.io-client";
const socket = openSocket("http://foos.ddns.net:4001");

function emitGoal(data) {
  socket.emit("goal", data);
  console.log("Data sendt: ", data);
}

export { emitGoal };
