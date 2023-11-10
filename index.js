const boxes = document.querySelector(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

// starting me current palyer X hoga
// aur game grid matlab staring me cells empty hogi
let currentPlayer;
let gameGrid;
// these are all possible  winning position 
const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]

]
// lets create a function to initialise the game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    // UI par empty bhi karna padega boxes ko
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // initialise box with css properties again
        box.classList = `box box${index + 1}`;

    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
initGame();

function swapTurn() {
    if (currentPlayer == "X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }
    // UI Update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

//main game logic-------------------
//~~~~~~~~~~~~~~~~IMPORTANT~~~~~~~~~~~~~~~
function checkGameOver() {

    let answer = "";
    winningPositions.forEach((position) => {
        //all three boxes should be non-empty and exactly same in value
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
            && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {
            //check is winner is X
            if (gameGrid[position[0]] === "X")
                answer = "X";
            else {
                answer = "O";
            }
            //disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })
            //now we know x/o is winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

        }
    });

    //it means we have a winner
    if (answer != "") {
        gameInfo.innerText = `winner Player - ${answer} `;
        newGameBtn.classList.add("active");
        return;

    }

    //let's check whether there is tie 
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if (box !== "")
            fillCount++;
    });
    //board is full game is tied
    if (fillCount == 9) {
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");

    }


}

function handleClick(index) {
    if (gameGrid[index] == "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        // swapping the other`s turn
        swapTurn();
        // check that is anybody wins or not
        checkGameOver();
    }
}

//boxes ke andar event listner laga denge onclick wala aur indexes bhi takhi pata chal sakhe ksi box pe click kiya hai 
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);
