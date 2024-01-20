document.addEventListener('DOMContentLoaded', function() {
    var analyzeButton = document.getElementById('analyzeButton');
    analyzeButton.addEventListener('click', function() {
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
    scoreText.style.color = color;
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