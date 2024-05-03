// IMGFLIP API IMPLEMENTATION
const imgflip_api_url = "https://api.imgflip.com/get_memes";

const GetAPI = async () => {
    const response = await fetch(imgflip_api_url); //Send API request and wait response
    const myJson = await response.json(); //extract JSON from the http response
    return myJson.data.memes;
}

const GetAPIbyID = async (id) => {
    const memeList = await GetAPI();
    for (let meme of memeList) {
        if (meme.id == id) {
            return meme;
        }
    }
    throw new Error('Meme not found');
}

const PostAPI = async (templateID, textList) => {
    const API_url = new URLSearchParams(); // Create API request with my presonal account and the template ID
    API_url.append("template_id", templateID);
    API_url.append("username", "jgaudin");
    API_url.append("password", "UysZ*pQ9C3Y$RU");

    for (let i = 0; i < textList.length; i++) {  // Add each caption to the API request
        API_url.append("boxes["+i+"][text]", textList[i]);
    }

    const response = await fetch('https://api.imgflip.com/caption_image', {  //Send API request and wait response
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: API_url
    });

    const myJson = await response.json(); //extract JSON from the http response
    return myJson.data;
}

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

const generateMemePage = () => {
    const randomN = Math.floor(Math.random() * 100)
    GetAPI().then(function(memeList) {
        const currentMeme = memeList[randomN]
        console.log(currentMeme)
        document.getElementById("memeTitle").textContent = currentMeme.name
        document.getElementById("meme").src = currentMeme.url
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

generateMemePage()
document.getElementById("changeMeme").onclick = function() {generateMemePage()}

document.getElementById("submit").onclick = function() {
    
}

