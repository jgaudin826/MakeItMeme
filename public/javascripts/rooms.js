import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";

window.socket = io();

let roomID = document.cookie.split("; ").find((row) => row.startsWith("roomID="))?.split("=")[1];
let username = document.cookie.split("; ").find((row) => row.startsWith("username="))?.split("=")[1];
let profilePictureURL = document.cookie.split("; ").find((row) => row.startsWith("profilePictureURL="))?.split("=")[1];
socket.emit("joinRoom", roomID,username,profilePictureURL);

document.getElementById("username").textContent = username
document.getElementById("profilePicture").src = profilePictureURL
document.getElementById("roomID").textContent = "Room ID : " + roomID

document.getElementById("leave").onclick = function() {
  socket.disconnect();
  document.location.href="/";
}

document.getElementById("start").onclick = function() {
  document.location.href="/memes";
}

socket.on("playerList", (sockets)=> {
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
  const body = document.getElementById("body");
  body.appendChild(list)
})