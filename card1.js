
var cardList = ["11","12","13","14","15","16"]
var cardSet;
var card1;
var card2;

var tries = 0;
var score = 0;
var progress = 0;
var board = [];
var rows = 6;
var columns = cardList.length/rows*2;


window.onload = function() {
    shuffleCards();
    startGame();
}

function shuffleCards() {
    cardSet = cardList.concat(cardList); //merger two arrays into one
    //shuffle
    for (let i = 0; i < cardSet.length; i++) {
        let j = Math.floor(Math.random() * cardSet.length); //get random index
        //bubble swap
        let temp = cardSet[i];
        cardSet[i] = cardSet[j];
        cardSet[j] = temp;
    }
}

function startGame() {
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < columns; j++) {
            let cardImg = cardSet.pop();
            row.push(cardImg); //JS

            let card = document.createElement("img");
            card.id = i.toString() + "-" + j.toString();
            card.src = cardImg + ".png";
            card.classList.add("card");
            card.addEventListener("click", selectCard);
            document.getElementById("board").append(card);

        }
        board.push(row);
    }
    setTimeout(hideCards, 1000);
}

function hideCards() {
//loop trough all cards to hide
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let card = document.getElementById(i.toString() + "-" + j.toString());
            card.src = "10.png";
        }
    }
}

function selectCard() {

    if (this.src.includes("10")) {
        if (!card1) {
            card1 = this;

            let coords = card1.id.split("-"); //"0-1" -> ["0", "1"]
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card1.src = board[r][c] + ".png";
        }
        else if (!card2 && this != card1) {
            card2 = this;

            let coords = card2.id.split("-"); //"0-1" -> ["0", "1"]
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card2.src = board[r][c] + ".png";
            setTimeout(update, 1000);
        }
    }
}

function update() {
    if (card1.src != card2.src) {
        card1.src = "10.png";
        card2.src = "10.png";
        tries++;
        document.getElementById("tries").innerText = tries;
    }
    else
    {
        card1.src = "9.png";
        card2.src = "9.png";
        score++;
        if(score==cardList.length)
        {
            tries = 100 - tries*5;
            window.location.href = "http://localhost:63342/IdenticalPaird/ScoreBoard.html";
            localStorage.setItem('score', tries)
        }
    }

    card1 = null;
    card2 = null;
}

