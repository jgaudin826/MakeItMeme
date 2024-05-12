// Randomly assign a Profile Picture and save it in the cookies
const setProfilePicture = () => {
    let randomN = Math.floor(Math.random() * 20) + 1
    let profilePictureURL = '/images/ProfilePictures/pp' + randomN +'.jpg'
    document.getElementById("profilePicture").src = profilePictureURL
    document.cookie = 'profilePictureURL='+profilePictureURL
}
setProfilePicture()

// Change the profile picture
document.getElementById("nextPP").onclick = function() {setProfilePicture()}

// Enter already existing room
document.getElementById("joinRoom").onclick = function() {
    let roomID = document.forms["roomID"]["roomID"].value // Get the room ID from the user
    let username = document.forms["username"]["username"].value // Get the username from the user
    if (username === '') {
        alert('No username found !')
    } else if (roomID === '') {
        alert('No room ID found !')
    } else {
        document.cookie = 'username='+username;
        document.cookie = 'roomID='+roomID
        document.location.href="/rooms"
    }
}

// Get random 6 digit room ID
const getRandomRoomID = () => {
    let roomID = ""
    for (var i = 0; i < 6; i++) {
        roomID += Math.floor(Math.random() * 10)
    }
    return roomID
}

// Generate a random room id
document.getElementById("newRoom").onclick = function() {
    let username = document.forms["username"]["username"].value // Get the username from the user
    if (username === '') {
        alert('No username found !')
    } else {
        document.cookie = 'username='+username;
        document.cookie = 'roomID='+ getRandomRoomID()
        document.location.href="/rooms"
    }
}