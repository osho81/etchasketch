// Variables for the canvas to be used in the whole file
var canvas = document.getElementById("canvas-area");
var ctx = canvas.getContext("2d");

// Round style for smoother line corners
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

const width = canvas.width; // Optional renaming
const height = canvas.height;

// Listen to keys down
document.addEventListener('keydown', handleKeyDown); // Keys to draw line
document.addEventListener('keydown', handleClearKeys); // Keys to clear canvas
document.addEventListener('keydown', handleStyleKeys); // Keys to change color & styles

// Starting position/coordinates, but keep some padding for start position
let xPos = Math.floor(Math.random() * (width - 41)) + 21; // xPos between 20 & (width-20)
let yPos = Math.floor(Math.random() * (height - 41)) + 21; // yPos between 20 & (height-20)

// Temporary styling to make a visibile bigger dot at start, for few seconds
ctx.lineWidth = 15;
ctx.strokeStyle = "#FF0000";
ctx.moveTo(xPos, yPos);
ctx.lineTo(xPos, yPos);
ctx.stroke();

// Delete the temporary starting dot, and return to default (black 1 px)
setTimeout(function () {
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.moveTo(xPos, yPos);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000000";
}, 500);

// Set to use as storage for multiple unique keys
let multipleKeysPressed = new Set();

/* Function to: 
 * determine number of (arrow) keys down,
 * defines direction for line draw
 * set number of incremeneted/decremented pixel-steps, 
 * limit line to stay within canvas area
 * draw the defined line */
function handleKeyDown(e) {
    e.preventDefault(); // Disaböe arrow-scroll

    // Only if keydown is arrow key(s), store key(s) to the set
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        multipleKeysPressed.add(e.key);
    }

    // If multiple keys are down
    if (multipleKeysPressed.size > 1) {

        if (multipleKeysPressed.has('ArrowUp') && multipleKeysPressed.has('ArrowLeft')) {
            // Increase pixel-steps accordingly; but limit to canvas width/height
            yPos > 0 && xPos > 0 ? yPos -= 1 : yPos = yPos;
            yPos > 0 && xPos > 0 ? xPos -= 1 : xPos = xPos;
        }
        if (multipleKeysPressed.has('ArrowUp') && multipleKeysPressed.has('ArrowRight')) {
            yPos > 0 && xPos < width ? yPos -= 1 : yPos = yPos;
            yPos > 0 && xPos < width ? xPos += 1 : xPos = xPos;
        }
        if (multipleKeysPressed.has('ArrowDown') && multipleKeysPressed.has('ArrowLeft')) {
            yPos < height && xPos > 0 ? yPos += 1 : yPos = yPos;
            yPos < height && xPos > 0 ? xPos -= 1 : xPos = xPos;
        }
        if (multipleKeysPressed.has('ArrowDown') && multipleKeysPressed.has('ArrowRight')) {
            yPos < height && xPos < width ? yPos += 1 : yPos = yPos;
            yPos < height && xPos < width ? xPos += 1 : xPos = xPos;
        }

    } else { // If not two keys are down simultaneous, i.e. only one key is down:
        switch (e.key) {
            case 'ArrowUp': yPos > 0 ? yPos -= 1 : yPos = yPos;
                break;
            case 'ArrowDown': yPos < height ? yPos += 1 : yPos = yPos;
                break;
            case 'ArrowLeft': xPos > 0 ? xPos -= 1 : xPos = xPos;
                break;
            case 'ArrowRight': xPos < width ? xPos += 1 : xPos = xPos;
                break;
            default:
                break;
        }
    }

    // Execute the defined move above
    ctx.lineTo(xPos, yPos);
    ctx.stroke();

    // Remove keys from key-list, otherwise first if-statement is always true
    document.addEventListener('keyup', function (e) {
        multipleKeysPressed.delete(e.code); // code identifies exact key
    });

}

// If space or c is pressed, clear the canvas area 
function handleClearKeys(e) {
    e.preventDefault();

    if (e.key === " " || e.key === "c") { // " "is key for spacekey

        // Clear a rectangle corresponding to the canvas area
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath(); // Needed to clear previous lines
        ctx.moveTo(xPos, yPos); // Use latest position
    }
}

// Change line style during drawing; r = red etc.; 4 = 4 px line etc.
function handleStyleKeys(e) {
    e.preventDefault();

    // Line color:
    if (e.key === "r") {
        ctx.beginPath();
        ctx.moveTo(xPos, yPos);
        ctx.strokeStyle = "#FF0000";
    }
    if (e.key === "b") {
        ctx.beginPath();
        ctx.moveTo(xPos, yPos);
        ctx.strokeStyle = "#0000FF";
    }
    if (e.key === "g") {
        ctx.beginPath();
        ctx.moveTo(xPos, yPos);
        ctx.strokeStyle = "#00FF00";
    }
    if (e.key === "d") {
        ctx.beginPath();
        ctx.moveTo(xPos, yPos);
        ctx.strokeStyle = "#000000";
    }

    // Line thickness:
    if (e.key === "4") {
        ctx.beginPath();
        ctx.moveTo(xPos, yPos);
        ctx.lineWidth = 4;
    }
    if (e.key === "8") {
        ctx.beginPath();
        ctx.moveTo(xPos, yPos);
        ctx.lineWidth = 8;
    }
    if (e.key === "1") {
        ctx.beginPath();
        ctx.moveTo(xPos, yPos);
        ctx.lineWidth = 1; // Back to default
    }
}

// Functions for opening and closing instructions panel
document.getElementById("instruction-btn").onclick = function () {
    document.getElementById("instruction-panel").style.height = "30vw";
    document.getElementById("instruction-panel").style.width = "40vw";
    document.getElementById("instruction-panel").style.padding = "20px";
}

document.getElementById("closing-x").onclick = function () {
    document.getElementById("instruction-panel").style.height = "0";
    document.getElementById("instruction-panel").style.width = "0";
    document.getElementById("instruction-panel").style.padding = "0";
}

