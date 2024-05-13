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

// Receive the meme to be voted and the player it's from
socket.on("vote", (meme, number, player) => {
    document.getElementById("meme").src = meme
    document.getElementById("download").href = meme
    document.getElementById("memeNumber").textContent = "Meme " + number
    
    // Prevent the meme owner to vote their own meme
    if (player == username) {
        document.getElementById("vote").hidden = true
    } else {
        document.getElementById("vote").hidden = false
    }

    // Timer / Countdown
    let countDown = 20000
    let timer = setInterval( function() {
        // update the text every second
        document.getElementById("timer").textContent = "Temps Restant " + Math.floor((countDown % (1000 * 60)) / 1000) + " sec"
        countDown -= 1000

        if (countDown < 0) {
            clearInterval(timer)
        }
    }, 1000)
})

// 'upvote' button send 1 to back end
document.getElementById("upvote").onclick = function() {
    socket.emit("submitVote", 1)
    document.location.href = "/wait"
}

// 'novote' button send 0 to back end
document.getElementById("novote").onclick = function() {
    socket.emit("submitVote", 0)
    document.location.href = "/wait"
}

// 'upvote' button send -1 to back end
document.getElementById("downvote").onclick = function() {
    socket.emit("submitVote", -1)
    document.location.href = "/wait"
}

// If the player didint vote by the end of the vote time, send 0 to back end (novote)
socket.on("voteTimeEnd", () => {
    socket.emit("submitVote", 0)
})

// If it was the last meme to be voted
socket.on("roundEnd", () => {
    socket.emit("submitVote", 0)
    document.location.href = "/ranks"
})
