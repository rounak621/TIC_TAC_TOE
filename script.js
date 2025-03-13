let boxes = document.querySelectorAll('.box');
let resetButton = document.querySelector('#reset-btn');
let newGameButton = document.querySelector('#new-btn');
let msgContainer = document.querySelector('.msg-container');
let msgText = document.querySelector('#msg');

let turnO = true; // O goes first

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// Reset the game
const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add('hide');
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
        } else {
            box.innerText = "X";
        }
        box.disabled = true;
        turnO = !turnO;
        checkWinner();
    });
});

// Show winner message above the game
const showWinner = (winner) => {
    msgText.innerText = `🎉 Congratulations! ${winner} Wins! 🎉`;
    msgContainer.classList.remove('hide');
    disableBoxes();
};

// Disable all boxes after a win
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

// Enable boxes and clear board for a new game
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

// Check for a winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Value = boxes[pattern[0]].innerText;
        let pos2Value = boxes[pattern[1]].innerText;
        let pos3Value = boxes[pattern[2]].innerText;

        if (pos1Value !== "" && pos1Value === pos2Value && pos2Value === pos3Value) {
            showWinner(pos1Value);
            return;
        }
    }
};

// Event listeners for buttons
newGameButton.addEventListener("click", resetGame);
resetButton.addEventListener("click", resetGame);
