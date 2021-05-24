// Create variables to store DOM element

var divSquares = document.querySelectorAll('.square');
var restart = document.querySelector('.restart');
var gameMessage = document.querySelector('.message');
var gameBoard = document.querySelector('.game-container')

var image = new Image(); // create a new image element: document.createElement('img')
image.src = 'star.png';
xImageSrc = image.src;
var image = new Image();
image.src = 'flower.jpeg';
oImageSrc = image.src;

var player1 = document.querySelector('.player1');
var player2 = document.querySelector('.player2')

var score1 = document.querySelector('.player1_score');
var score2 = document.querySelector('.player2_score');

// Create variables for using in functions
var turn = 1;
var gameOver = false;
var xScore = 0;
var oScore = 0;

// Create variables for winning lines (horizontal/vertical/diagonal)
var winCondition = [
    [divSquares[0], divSquares[1], divSquares[2]],
    [divSquares[3], divSquares[4], divSquares[5]],
    [divSquares[6], divSquares[7], divSquares[8]],
    [divSquares[0], divSquares[3], divSquares[6]],
    [divSquares[1], divSquares[4], divSquares[7]],
    [divSquares[2], divSquares[5], divSquares[8]],
    [divSquares[0], divSquares[4], divSquares[8]],
    [divSquares[2], divSquares[4], divSquares[6]]
]

// When square is clicked, put start/flower img on the square;
function changeSquareContent(event) {
    if (gameOver) { //(flag) if true, exist; otherwise, continue;
        return;
    }

    var squareClicked = event.currentTarget;

    // has image on current clicked cell.
    if (squareClicked.children != null && squareClicked.children.length > 0) {
        return;
    }

    // loop the squares, 'star' for player turn is odd; 'flower' for player turn is even;
    if (turn % 2 !== 0) {
        var xImage = new Image(80, 80);
        xImage.src = xImageSrc;
        squareClicked.appendChild(xImage);
        var audio = new Audio('coin.mp3')
        audio.play();
    } else {
        var oImage = new Image(100, 100);
        oImage.src = oImageSrc;
        squareClicked.appendChild(oImage);
        var audio = new Audio('jump.mp3')
        audio.play()
    }

    turn++ // after player put the mark on the game board, counts the turns

    // loop in the winning line;

    for (var i = 0; i < winCondition.length; i++) {
        if (check(squareClicked, winCondition[i])) { //if check function below return true, continue;
            if (squareClicked.children[0].src == xImageSrc) {
                xScore++; //count X' score;
                score1.textContent = xScore; // change the score result for X
            } else {
                oScore++; //count O' score;
                score2.textContent = oScore; // change the score result for O
            }

            // **** Code for future to development, still thinking how to make img + text!!
            // var image = new Image(40, 40);
            // image.src = squareClicked.children[0].src;

            gameMessage.textContent = ''; // change 'start game' to ''

            if (gameOver = true) {
                return
            }
        }
    }
    if (turn > 9) {
        gameMessage.textContent = 'Draw'
        var audio = new Audio('draw.mp3')
        audio.play();
    }
}

//add event listener;
for (var i = 0; i < divSquares.length; i++) {
    divSquares[i].addEventListener('click', changeSquareContent);
}

// Create function to check winning condition;

function check(squareClicked, winCondition) {

    // if cannot find the square in the winning line, exit function;
    if (winCondition.indexOf(squareClicked) == -1) {
        return false;
    }

    //loop in the winning line;

    for (var i = 0; i < winCondition.length; i++) {

        if (winCondition[i].children == null || winCondition[i].children.length === 0) {
            return false;
        }
        if (squareClicked.children[0].src !== winCondition[i].children[0].src) {
            return false;
        }
    }
    //loop in the winning line;
    // if the img is the same, hightlight the square background in mistyrose color;

    for (var i = 0; i < winCondition.length; i++) {
        winCondition[i].style.backgroundColor = 'mistyrose';
        var audio = new Audio('winner.mp3')
        audio.play();
    }
    return true;
}

// Restart Game Setting;

function restartGame() {
    turn = 1; // start from first turn;
    gameOver = false; // could click the game board after restart;
    for (var i = 0; i < divSquares.length; i++) {
        divSquares[i].textContent = '';
        divSquares[i].style.backgroundColor = '';
        divSquares[i].classList.remove('X-class');
        divSquares[i].classList.remove('O-class');
        player1.classList.remove('pink');
        player2.classList.remove('blue');
    }
    gameMessage.textContent = 'Start Game!';
    gameBoard.classList.toggle('rotate-scale-up'); // game board will rotate in odd time;

}
restart.addEventListener('click', restartGame);


var audio = new Audio('coin.mp3')
audio.play();