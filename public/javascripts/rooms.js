import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";

window.socket = io();

const roomID = document.cookie.split("; ").find((row) => row.startsWith("roomID="))?.split("=")[1];
const username = document.cookie.split("; ").find((row) => row.startsWith("username="))?.split("=")[1];
const profilePictureURL = document.cookie.split("; ").find((row) => row.startsWith("profilePictureURL="))?.split("=")[1];
socket.emit("joinRoom", roomID,username,profilePictureURL)

document.getElementById("username").textContent = username
document.getElementById("profilePicture").src = profilePictureURL
document.getElementById("roomID").textContent = document.getElementById("roomID").textContent + roomID

socket.on('error', () => {
  socket.disconnect();
  document.location.href="/";
  alert("Error! A player with the same username already exists in the game you are trying to join")
});

document.getElementById("leave").onclick = function() {
  socket.disconnect();
  document.location.href="/";
}

document.getElementById("start").onclick = function() {
  socket.emit("start", "")
}

socket.on("startGame", () => {
  document.location.href = "/memes"
})

socket.on("playerList", (sockets) => {
  let oldList = document.getElementById("playerList")
  oldList.remove();
  const list = document.createElement('ul');
  list.setAttribute("id","playerList");
  for (let user of sockets) {
    var img = document.createElement('img')
    img.src = user.profilePictureURL
    var p = document.createElement('p')
    p.innerText = user.username
    var li = document.createElement('li')
    li.appendChild(img)
    li.appendChild(p)
    list.appendChild(li)
  }
  document.body.appendChild(list)
})
