import {GetAPI, PostAPI } from "/javascripts/api.js";

// Sockets.IO  main page code
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


// Call the GetAPI only once then stocks it into memeList when changing memes
let memeList = []
const getMemeList = () => {
    GetAPI().then(function(allMemes) {
        memeList = allMemes
        generateMemePage()
    })
}

let currentMeme = ""
const generateMemePage = () => {
    const randomN = Math.floor(Math.random() * 100)
    currentMeme = memeList[randomN]
    document.getElementById("memeTitle").textContent = currentMeme.name

    let captionsList = []
    for (let i=0; i< currentMeme.box_count; i++) {
        captionsList.push("Caption " + (i+1))
    }
    PostAPI(currentMeme.id, captionsList).then(function(result){
        document.getElementById("meme").src = result
        let oldForm = document.getElementById("captions");
        oldForm.remove();
        const form = document.createElement('form');
        form.setAttribute("id","captions");
        for (let i=0; i< currentMeme.box_count; i++) {
            var textBox = document.createElement("INPUT");
            textBox.setAttribute("type", "text");
            textBox.setAttribute("name", i);
            textBox.setAttribute("placeholder", "caption " + (i+1))
            form.appendChild(textBox)
        }
        const body = document.getElementById("body");
        body.appendChild(form)
    })
}

getMemeList()
document.getElementById("changeMeme").onclick = function() {generateMemePage()}

let finalMeme = ""
document.getElementById("submit").onclick = function() {
    let captionsList = []
    for (let i=0; i< currentMeme.box_count; i++) {
        captionsList.push(document.forms["captions"][i].value)
    }
    PostAPI(currentMeme.id, captionsList).then(function(result){
        finalMeme = result
        socket.emit("submitMeme", roomID, finalMeme)
        console.log(meme)
        document.location.href = "/wait"
    })
}
