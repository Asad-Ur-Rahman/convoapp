// Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = 'bbb352e53fb048f5a5e9560d7ffb9343';

const RAW_TEXT = 'I will kill you';

function sentimentConvertor(RAW_TEXT) {

    // Since you're making inferences outside your app's scope
    const USER_ID = 'openai';
    const APP_ID = 'chat-completion';
    // Change these to whatever model and text URL you want to use
    const MODEL_ID = 'GPT-4';
    const MODEL_VERSION_ID = '5d7a50b44aec4a01a9c492c5a5fcf387';


    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "text": {
                        "raw": `Convert the following text to have a positive sentiment: '${RAW_TEXT}'`
                        // url: TEXT_URL, allow_duplicate_url: true 
                        // raw: fileBytes
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.status.code != 10000) console.log(data.status);
            else {
                console.log(data['outputs'][0]['data']['text']['raw']);

            };
        }).catch(error => console.log('error', error));

    // return corrected
}


function sentimentAnalysier(RAW_TEXT) {


    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'clarifai';
    const APP_ID = 'main';
    // Change these to whatever model and text URL you want to use
    const MODEL_ID = 'social-media-sentiment-english';
    const MODEL_VERSION_ID = 'fa9e29cb33f841b2832508cb41b30b44';
    // const RAW_TEXT = 'I love your product very much';
    // To use a hosted text file, assign the url variable
    // const TEXT_FILE_URL = 'https://samples.clarifai.com/negative_sentence_12.txt';
    // Or, to use a local text file, assign the url variable
    // const TEXT_FILE_BYTES = 'YOUR_TEXT_FILE_BYTES_HERE';

    ///////////////////////////////////////////////////////////////////////////////////
    // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
    ///////////////////////////////////////////////////////////////////////////////////

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "text": {
                        "raw": RAW_TEXT
                        // url: TEXT_URL, allow_duplicate_url: true 
                        // raw: fileBytes
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
        .then(response => response.text())
        .then(result => console.log(JSON.parse(result).outputs[0].data))
        .catch(error => console.log('error', error));

}

// console.log(sentimentAnalysier(RAW_TEXT))
// console.log(sentimentConvertor(RAW_TEXT))

sentimentConvertor(RAW_TEXT)
sentimentAnalysier(RAW_TEXT)