import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";

window.socket = io();

let roomID = document.cookie.split("; ").find((row) => row.startsWith("roomID="))?.split("=")[1];
let username = document.cookie.split("; ").find((row) => row.startsWith("username="))?.split("=")[1];
let profilePictureURL = document.cookie.split("; ").find((row) => row.startsWith("profilePictureURL="))?.split("=")[1];
socket.emit("joinRoom", roomID,username,profilePictureURL);

document.getElementById("leave").onclick = function() {
  socket.disconnect();
  document.location.href="/";
}

socket.on("vote", (meme, number, player) => {
    document.getElementById("meme").src = meme
    document.getElementById("download").href = meme
    document.getElementById("memeNumber").textContent = "Meme " + number
    if (player == username) {
        document.getElementById("vote").hidden = true
    } else {
        document.getElementById("vote").hidden = false
    }
})

document.getElementById("upvote").onclick = function() {
    socket.emit("submitVote", 1)
    document.location.href = "/wait"
}

document.getElementById("novote").onclick = function() {
    socket.emit("submitVote", 0)
    document.location.href = "/wait"
}

document.getElementById("downvote").onclick = function() {
    socket.emit("submitVote", -1)
    document.location.href = "/wait"
}

let countDown = 20000
let timer = setInterval( function() {
    document.getElementById("timer").textContent = Math.floor(countDown % ((1000 * 60 * 60)) / (1000 * 60)) + "m " + Math.floor((countDown % (1000 * 60)) / 1000) + "s"
    countDown -= 1000

    if (countDown < 0) {
        clearInterval(timer)
    }
}, 1000)

socket.on("voteTimeEnd", () => {
    socket.emit("submitVote", 0)
})

socket.on("roundEnd", () => {
    socket.emit("submitVote", 0)
    document.location.href = "/ranks"
})
