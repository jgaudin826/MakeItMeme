import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";

window.socket = io();

// Collect player info stored into cookies
const roomID = document.cookie.split("; ").find((row) => row.startsWith("roomID="))?.split("=")[1];
const username = document.cookie.split("; ").find((row) => row.startsWith("username="))?.split("=")[1];
const profilePictureURL = document.cookie.split("; ").find((row) => row.startsWith("profilePictureURL="))?.split("=")[1];

// join room using player info from cookies
socket.emit("joinRoom", roomID,username,profilePictureURL);

// 'leave' button to disconnect and go to home page
document.getElementById("leave").onclick = function() {
  socket.disconnect();
  document.location.href="/";
}

/* Waiting Room :
  When a player submitted their meme or vote
  they are sent here until the timer ends
*/


socket.on("memeTimeEnd", () => {
    document.location.href = "/votes"
})

socket.on("voteTimeEnd", () => {
  document.location.href = "/votes"
})

socket.on("roundEnd", () => {
  document.location.href = "/ranks"
})