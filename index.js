
let xPos = 100;
let yPos = 100;
let xSteps = xPos + 1;
let ySteps = yPos + 1;

// Test function, test if canvas basics works
document.getElementById("outer-container").onclick = function () {


    var canvas = document.getElementById("canvas-area");
    var ctx = canvas.getContext("2d");
    ctx.moveTo(xPos, yPos);
    ctx.lineTo(xSteps, ySteps);
    ctx.stroke();

    // xSteps-= 10;
    ySteps -= 10;

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
