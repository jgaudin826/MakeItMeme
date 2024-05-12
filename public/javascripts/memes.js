import {GetAPI, PostAPI } from "/javascripts/api.js";

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


// Call the GetAPI only once then stocks it into memeList when changing memes
let memeList = []
const getMemeList = () => {
    GetAPI().then(function(allMemes) {
        memeList = allMemes
        generateMemePage()
    })
}

// Randomly assigns the user a meme
let currentMeme = ""
const generateMemePage = () => {
    const randomN = Math.floor(Math.random() * 100)
    currentMeme = memeList[randomN]
    document.getElementById("memeTitle").textContent = currentMeme.name

    let captionsList = []
    for (let i=0; i< currentMeme.box_count; i++) {
        captionsList.push("Caption " + (i+1))
    }
    
    // Fills the blank text with "caption 1, caption 2 .. etc" before displaying it to the user
    PostAPI(currentMeme.id, captionsList).then(function(result){
        document.getElementById("meme").src = result
        
        // Remove old form
        let oldForm = document.getElementById("captions");
        oldForm.remove();

        //  Create new form
        const form = document.createElement('form');
        form.setAttribute("id","captions");

        // Fill form with  as many inputs as the number of holes in the current meme
        for (let i=0; i< currentMeme.box_count; i++) {
            var textBox = document.createElement("INPUT");
            textBox.setAttribute("type", "text");
            textBox.setAttribute("name", i);
            textBox.setAttribute("placeholder", "caption " + (i+1))
            form.appendChild(textBox)
        }

        let section = document.getElementById("form")
        section.appendChild(form) // Add it to the page
    })
}

getMemeList()

// Change the current meme
document.getElementById("changeMeme").onclick = function() {generateMemePage()}

// When player submits their meme
let finalMeme = ""
document.getElementById("submit").onclick = function() {
    // Collect the captions from the form
    let captionsList = []
    for (let i=0; i< currentMeme.box_count; i++) {
        captionsList.push(document.forms["captions"][i].value)
    }
    // Calls on the API to fill the meme with the user's captions
    PostAPI(currentMeme.id, captionsList).then(function(result){
        finalMeme = result
        socket.emit("submitMeme", finalMeme)
        document.location.href = "/wait"
    })
}


// If the timer runs out, submit an empty or half filled meme
socket.on("memeTimeEnd", () => {
    // Collect the captions from the form
    let captionsList = []
    for (let i=0; i< currentMeme.box_count; i++) {
        // if input is emty insert empty text
        if(document.forms["captions"][i].value == '') {
            captionsList.push(" ")
        }
        captionsList.push(document.forms["captions"][i].value)
    }
    // Calls on the API to fill the meme with the user's captions
    PostAPI(currentMeme.id, captionsList).then(function(result){
        finalMeme = result
        socket.emit("submitMeme", finalMeme)
        document.location.href = "/votes"
    })
})

// Timer / Countdown
let countDown = 120000
let timer = setInterval( function() {
    // update the text every second
    document.getElementById("timer").textContent = "Temps restant : " + Math.floor(countDown % ((1000 * 60 * 60)) / (1000 * 60)) + " min " + Math.floor((countDown % (1000 * 60)) / 1000) + " sec"
    countDown -= 1000

    if (countDown < 0) {
        clearInterval(timer)
    }
}, 1000)