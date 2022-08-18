var board;
var totalCards = 10;
var count = 0;
var cards;
var compare = [];
var score = 0;
var lives = 5;

window.onload = function () {
    setGame();
}

function setGame() {
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    shuffle();

    for (let c = 0; c < board.length; c++) {
        let card = document.createElement("div");
        card.id = board[c].toString();
        card.classList.value = "";
        card.classList.add("card");
        document.getElementById("board").append(card);
    }
    gameEngine();
}

function shuffle() {
    for (var i = 0; i < totalCards / 2; i++) {
        let found = false;
        while (!found) {
            let x = Math.floor(Math.random() * totalCards);
            let y = Math.floor(Math.random() * totalCards);
            if (board[x] === 0 && board[y] === 0 && x !== y) {
                board[x] = board[y] = i + 1;
                found = true;
            }
        }
    }
}

function gameover() {
    document.querySelector(".container").style.pointerEvents = "none";
}

function reShuffle() {
    setTimeout(() => {
        cards.forEach(card => {
            card.classList.remove("rotate");
            setTimeout(() => {
                card.classList.remove("x" + card.id);
            }, 300);
        })
        setTimeout(() => {
            cards.forEach(card => {
                card.remove();
            })
            cards = undefined;
            setGame();
            setTimeout(() => {
                flipCards();
            }, 300);
        }, 1000);
    }, 1000);
}

function matching() {
    if (compare[0].id === compare[1].id) {
        score += 10;
        compare[0].style.pointerEvents = "none";
        compare[1].style.pointerEvents = "none";
        document.querySelector(".score").innerText = score;
        if (score % 50 === 0) {
            reShuffle();
        }
    }
    else {
        lives--;
        document.querySelector(".lives").innerText = lives;
        setTimeout(() => {
            console.log(compare[0]);
            compare[0].classList.remove("rotate");
            compare[1].classList.remove("rotate");
            setTimeout(() => {
                compare[0].classList.remove("x" + compare[0].id);
                compare[1].classList.remove("x" + compare[1].id);
            }, 300);
        }, 1000);
        if (lives === 0) {
            gameover();
        }
    }
}

function gameEngine() {
    cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (compare.length === 2) {
                compare = [];
            }
            card.classList.add("rotate");
            setTimeout(() => {
                card.classList.add("x" + card.id);
            }, 300);
            count++;
            compare.push(card);
            if (count === 2) {
                matching();
                count = 0;
            }
        })
    })
}

function flipCards() {
    cards.forEach(card => {
        card.classList.add("rotate");
        setTimeout(() => {
            card.classList.add("x" + card.id);
        }, 300);
    })
    setTimeout(() => {
        cards.forEach(card => {
            card.classList.remove("rotate");
            setTimeout(() => {
                card.classList.remove("x" + card.id);
            }, 300);
        })
    }, 1500);
}

document.getElementById("start").addEventListener("click", () => {
    document.querySelector(".container").style.pointerEvents = "all";
    flipCards();
})