document.addEventListener('DOMContentLoaded', function () {
    var analyzeButton = document.getElementById('analyzeButton');
    analyzeButton.addEventListener('click', function () {
        var userInput = document.getElementById('postInput').value.trim();
        if (userInput) {
            var score = calculateConvoScore(userInput);
            var [color, message] = getScoreStyle(score);
            displayScore(score, color, message);
        } else {
            alert("Please enter some text to analyze.");
        }
    });
});

function calculateConvoScore(post) {
    var score = 0;
    score += Math.min(post.length / 100, 3); // Up to 3 points for length
    score += (post.match(/\?/g) || []).length * 2; // 2 points for each question mark
    score += (post.match(/!/g) || []).length; // 1 point for each exclamation mark
    return Math.min(score, 10); // Cap the score at 10
}


function getScoreStyle(score) {
    if (score === 10) {
        return ["#0FEF34", "Great post!"]; // Green
    } else if (score >= 7) {
        return ["#FFEB3B", "Pretty good post"]; // Yellow
    } else if (score >= 5) {
        return ["#FF9800", "Could be better"]; // Orange
    } else {
        return ["#f44336", "Needs work"]; // Red
    }
}



function displayScore(score, color, message) {
    var scoreCircle = document.getElementById('scoreCircle');
    var scoreProgress = document.querySelector('.score-progress'); // Ensure this class is set on the progress element
    var scoreText = document.getElementById('scoreText');
    var messageDisplay = document.getElementById('messageDisplay'); // Ensure this ID is set on an element in your HTML

    // Create the message element if it doesn't exist
    if (!messageDisplay) {
        messageDisplay = document.createElement('div');
        messageDisplay.id = 'messageDisplay';
        scoreCircle.insertAdjacentElement('beforebegin', messageDisplay);
    }



    // Update the message
    messageDisplay.textContent = message;
    messageDisplay.style.color = color;
    messageDisplay.style.fontSize = "1.5rem";
    messageDisplay.style.marginBottom = "20px";

    // Update the score circle's appearance
    scoreCircle.style.borderColor = color;
    scoreText.textContent = `${score}/10`;
    scoreText.style.color = '#A7A7A7';



    // Update the score text, keeping your original inline styles
    var scoreText = document.getElementById('scoreText');
    scoreText.innerHTML = `<h1 style="font-size: 1.3em;">${score}</h1><p class="mt-4"style="font-size: 20px;">/10</p>`;


    // Apply the conic-gradient to the scoreProgress element
    scoreProgress.style.background = `conic-gradient(from 0.5turn at 50% 50%, ${color} 0%, ${color} ${deg}deg, #D9D9D9 ${deg}deg 360deg)`;
}

const suggestedPosts = [
    "Based on what I've seen in my travels, it seems that the communities with the fewest financial resources have the most collaborative cultures. Have you seen the same thing?",
    "This suggested post frames the content in a more conversational manner and includes a question.",
    "Part of the reason some cultures rely more on family relationships is due to lack of resources. This is what I keep seeing.",
    // Add more suggested posts as needed
];

// Function to copy the current post to clipboard
function copyToClipboard() {
    const textArea = document.getElementById('suggestedPost');
    textArea.select();
    document.execCommand('copy');
}

// Function to reroll and display a new suggested post
function rerollPost() {
    const randomIndex = Math.floor(Math.random() * suggestedPosts.length);
    document.getElementById('suggestedPost').value = suggestedPosts[randomIndex];
}

// Event listeners for the buttons
document.querySelector('.copy-button').addEventListener('click', copyToClipboard);
document.querySelector('.reroll-button').addEventListener('click', rerollPost);

// Initialize with a post on page load
document.addEventListener('DOMContentLoaded', rerollPost);


// JavaScript for scroll animation
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const circle = document.getElementById('progress-circle');

    // Adjust the following values according to your needs
    const animationStart = 100; // When the animation should start
    const animationEnd = 500; // When the animation should end

    let progress = (scrollPosition - animationStart) / (animationEnd - animationStart);
    progress = Math.min(Math.max(progress, 0), 1); // Clamp value between 0 and 1

    // Apply the progress to circle style, e.g. circle rotation
    circle.style.transform = `rotate(${progress * 360}deg)`;
});

const PAT = 'bbb352e53fb048f5a5e9560d7ffb9343';

const RAW_TEXT = 'I will kill you';

let displayText = document.getElementById("messageDisplay");

async function sentimentConvertor(RAW_TEXT) {

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

    let data = await fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.status.code != 10000) console.log(data.status);
            else {
                return data
                // console.log(data['outputs'][0]['data']['text']['raw']);

            };
        }).catch(error => console.log('error', error));

    return data['outputs'][0]['data']['text']['raw']
}


async function sentimentAnalysier(RAW_TEXT) {


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

    let data = await fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
        .then(response => response.text())
        .then(result => { return result })
        .catch(error => console.log('error', error));

    // console.log(JSON.parse(data).outputs[0].data.concepts);
    return JSON.parse(data).outputs[0].data.concepts

}


function callBoth(RAW_TEXT) {
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    let displayText = document.getElementById("suggestedPost");
    let originalText = document.getElementById("originalpost");

    originalText.innerText = RAW_TEXT;



    // console.log(sentimentAnalysier(RAW_TEXT))
    // console.log(sentimentConvertor(RAW_TEXT))

    sentimentConvertor(RAW_TEXT).then(data => {
        let str1 = ''
        // console.log(String(data));
        for (let i = 0; i < data.length; i++) {

            // h1.innerText += data[i]
            str1 += data[i]
            // console.log(data[i]);
        }
        console.log(str1.slice(1, str1.length - 1))
        // h1.innerText = str1.slice(1, str1.length - 1)
        displayText.innerText = str1.slice(1, str1.length - 1)
        // You can now use globalData elsewhere, but remember it will be populated asynchronously
    });

    sentimentAnalysier(RAW_TEXT).then(data => {
        let senti = {};
        let score = 0;
        analysis = []

        for (let i = 0; i < data.length; i++) {

            senti[data[i].name] = data[i].value
        }
        // console.log(senti)

        if (senti['positive'] > senti['negative'] && senti['positive'] > senti['neutral']) {
            score = round(senti['positive'] * 10);
            // console.log(score);
            analysis = ['Positive', score];
        } else if (senti['negative'] > senti['positive'] && senti['negative'] > senti['neutral']) {
            score = Math.round((senti['negative']) * 10) - 1;
            // console.log(score);
            analysis = ['Negative', score]
        }
        console.log(analysis);
    })
}