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