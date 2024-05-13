import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";

window.socket = io();

// Collect player info stored into cookies
let roomID = document.cookie.split("; ").find((row) => row.startsWith("roomID="))?.split("=")[1];
let username = document.cookie.split("; ").find((row) => row.startsWith("username="))?.split("=")[1];
let profilePictureURL = document.cookie.split("; ").find((row) => row.startsWith("profilePictureURL="))?.split("=")[1];

// join room using player info from cookies
socket.emit("joinRoom", roomID,username,profilePictureURL);

// 'leave' button to disconnect and go to home page
document.getElementById("leave").onclick = function() {
  socket.disconnect();
  document.location.href="/";
}

// 'back to lobby' button to go back to rooms page
document.getElementById("back").onclick = function() {
    socket.disconnect();
    document.location.href="/rooms";
}

// Receive the final rankings from back end
socket.on("finalRankings", (playerScores) => {

    // remove the old list
    let scoresList = document.getElementById("scores")

    // fill it up with the new data
    let rank = 1
    for (let player of playerScores) {
        var img = document.createElement('img')
        img.src = player[1]
        var h3 = document.createElement('h3')
        h3.innerText = player[0]
        var h1 = document.createElement('h1')
        h1.innerText = player[2]
        var li = document.createElement('li')
        li.setAttribute("class", "rank"+rank)
        li.appendChild(img)
        li.appendChild(h3)
        li.appendChild(h1)
        scoresList.appendChild(li)
        rank += 1
    }
})


// Timer / Countdown
let countDown = 30000
let timer = setInterval( function() {
    // update the text every second
    document.getElementById("timer").textContent = "Retour au lobby dans " + Math.floor((countDown % (1000 * 60)) / 1000) + " sec"
    countDown -= 1000

    if (countDown < 0) {
        clearInterval(timer)
    }
}, 1000)

// Go back to the lobby
socket.on("newGame", () => {
    socket.disconnect();
    document.location.href = "/rooms"
})
