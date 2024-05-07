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

module.exports ={
    GetAPI,GetAPIbyID,PostAPI
}