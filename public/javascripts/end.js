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

socket.on("finalRankings", (playerScores) => {
    // Scores
    let oldScoresList = document.getElementById("scores")
    oldScoresList.remove();
    const list = document.createElement('ol');
    list.setAttribute("id","scores");
    for (let player of playerScores) {
        var img = document.createElement('img')
        img.src = player[1]
        var h3 = document.createElement('h3')
        h3.innerText = player[0]
        var h1 = document.createElement('h1')
        h1.innerText = player[2]
        var li = document.createElement('li')
        li.appendChild(img)
        li.appendChild(h3)
        li.appendChild(h1)
        list.appendChild(li)
    }
    document.body.appendChild(list)
})

document.getElementById("leave").onclick = function() {
    socket.disconnect();
    document.location.href="/";
}

document.getElementById("back").onclick = function() {
    socket.disconnect();
    document.location.href="/rooms";
}

let countDown = 30000
let timer = setInterval( function() {
    document.getElementById("timer").textContent = "Next Round in " + Math.floor(countDown % ((1000 * 60 * 60)) / (1000 * 60)) + "m " + Math.floor((countDown % (1000 * 60)) / 1000) + "s"
    countDown -= 1000

    if (countDown < 0) {
        clearInterval(timer)
    }
}, 1000)

socket.on("newGame", () => {
    socket.disconnect();
    document.location.href = "/rooms"
})