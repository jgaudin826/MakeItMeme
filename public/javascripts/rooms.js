import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";

window.socket = io();

// Collect player info stored into cookies
const roomID = document.cookie.split("; ").find((row) => row.startsWith("roomID="))?.split("=")[1];
const username = document.cookie.split("; ").find((row) => row.startsWith("username="))?.split("=")[1];
const profilePictureURL = document.cookie.split("; ").find((row) => row.startsWith("profilePictureURL="))?.split("=")[1];

// join room using player info from cookies
socket.emit("joinRoom", roomID,username,profilePictureURL)

// Diaplay the player info
document.getElementById("username").textContent = username
document.getElementById("profilePicture").src = profilePictureURL
document.getElementById("roomID").textContent = document.getElementById("roomID").textContent + roomID

// If the player's username is aready present in the room
socket.on('error', () => {
  socket.disconnect();
  document.location.href="/";
  alert("Error! A player with the same username already exists in the game you are trying to join")
});

// 'leave' button to disconnect and go to home page
document.getElementById("leave").onclick = function() {
  socket.disconnect();
  document.location.href="/";
}

// 'Start' button sends signal to back end
document.getElementById("start").onclick = function() {
  socket.emit("start", "")
}

// If another player started game, back end sends start signal to all players in room
socket.on("startGame", () => {
  document.location.href = "/memes"
})

// Recieve every player info connected to  current room
socket.on("playerList", (sockets) => {
  let list = document.getElementById("playerList")

  // fill it up with the new data
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
  document.body.appendChild(list) // Add it to the body element of the page
})
