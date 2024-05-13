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

// Receive the final rankings from back end
socket.on("rankings", (playerScores, allMemes, roundInfo) => {
    document.getElementById("round").textContent = "Manche " + roundInfo[0] + " sur " + roundInfo[1] + " - Résultats :"

    // Memes Showcase
    let MemeList = document.getElementById("memes")
    // Fill list with the memes info
    for (let meme of allMemes) {
      var img = document.createElement('img')
      img.src = meme[0]
      var section = document.createElement('section')
      section.setAttribute("class","description")
      var p = document.createElement('p')
      p.innerText = "Par " + meme[1]
      var h3 = document.createElement('h3')
      h3.innerText = meme[2] + " Points"
      var a = document.createElement('a')
      a.setAttribute("href",meme[0])
      a.setAttribute("download","MemePasMal")
      a.setAttribute("target","_blank")
      a.innerText = "Download"
        
      section.appendChild(p)
      section.appendChild(h3)
      section.appendChild(a)
      
      var li = document.createElement('li')

      li.appendChild(img)
      li.appendChild(section)
      MemeList.appendChild(li)
    }

    // Scores
    let ScoresList = document.getElementById("scores")
    // Fill the list with the players scores and info
    for (let player of playerScores) {
        var img = document.createElement('img')
        img.src = player[1]
        var h3 = document.createElement('h3')
        h3.innerText = player[0]
        var p = document.createElement('p')
        p.innerText = "Points du meme : " + player[2]
        var h1 = document.createElement('h1')
        h1.innerText = player[3] + " Points"
        var li = document.createElement('li')
        li.appendChild(img)
        li.appendChild(h3)
        li.appendChild(p)
        li.appendChild(h1)
        ScoresList.appendChild(li)
    }
})

// Timer / Countdown
let countDown = 40000
let timer = setInterval( function() {
    // update the text every second
    document.getElementById("timer").textContent = "La prochaine manche commence dans " + Math.floor(countDown % ((1000 * 60 * 60)) / (1000 * 60)) + " min " + Math.floor((countDown % (1000 * 60)) / 1000) + " sec"
    countDown -= 1000

    if (countDown < 0) {
        clearInterval(timer)
    }
}, 1000)

// Start new round / go to meme page
socket.on("startRound", () => {
    document.location.href = "/memes"
})

// End game / go to end page
socket.on("endGame", () => {
    document.location.href = "/end"
})
