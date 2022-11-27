// Variables for the canvas to be used in the whole file
var canvas = document.getElementById("canvas-area");
var ctx = canvas.getContext("2d");
const width = canvas.width; // Optional renaming
const height = canvas.height;

// Listen keys pressed within the whole open window
document.addEventListener('keydown', handleKeyDown);
// document.onkeydown = handleKeyDown;

document.addEventListener('runOnKeys', handleKeyDown);


// Variables for setting and controlling the draw pixel-steps
let xPos = 100;
let yPos = 100;
ctx.moveTo(xPos, yPos);

let multipleKeysPressed = new Set(); // Set of multiple unique keys

/* Function to: 
 * determine number of (arrow) keys down,
 * defines number of incremeneted/decremented pixel-steps, 
 * draw the defined line */
function handleKeyDown(e) {
    e.preventDefault(); // Disaböe arrow-scroll

    multipleKeysPressed.add(e.key); // Store key to the set

    // If multiple keys are down
    if (multipleKeysPressed.size > 1) {

        if (multipleKeysPressed.has('ArrowUp') && multipleKeysPressed.has('ArrowLeft')) {
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

    // If not two keys are down, i.e. only one key is down:
    } else {
        switch (e.key) {
            // For each arrow-key-case, also keep line-drawings inside canvas
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
        multipleKeysPressed.delete(e.code);
    });

}


// Solution from stackoverflow for null type error when get unloaded element by id
function waitForLoad(id, callback) {
    var timer = setInterval(function () {
        if (document.getElementById(id)) {
            clearInterval(timer);
            callback();
        }
    }, 100);
}

// Function for opening and closing instructions panel
waitForLoad("instruction-btn", function () {
    document.getElementById("instruction-btn").onclick = function () {
        document.getElementById("instruction-panel").style.height = "30vw";
        document.getElementById("instruction-panel").style.width = "40vw";
        document.getElementById("instruction-panel").style.padding = "20px";
    }
});

waitForLoad("closing-x", function () {
    document.getElementById("closing-x").onclick = function () {
        document.getElementById("instruction-panel").style.height = "0";
        document.getElementById("instruction-panel").style.width = "0";
        document.getElementById("instruction-panel").style.padding = "0";
    }
});
