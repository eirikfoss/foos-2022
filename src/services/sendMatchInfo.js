import openSocket from "socket.io-client";
const socket = openSocket("http://foos.ddns.net:4001");

function subscribeToTimer(cb) {
  socket.on("timer", timestamp => cb(null, timestamp));
  socket.emit("subscribeToTimer", 1000);
}

function emitGoal(data) {
  socket.emit("goal", data);
  console.log("Send Data: ", data);
}

export { subscribeToTimer, emitGoal };
