/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" 
 method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function 
function shuffle(arrayList) {
    let currentIndex = arrayList.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = arrayList[currentIndex];
        arrayList[currentIndex].querySelector("i").classList[1] = 
            arrayList[randomIndex].querySelector("i").classList[1];
        arrayList[randomIndex].querySelector("i").classList[1] = 
            temporaryValue.querySelector("i").classList[1];
    }
    return arrayList;
};

// let deck_parent = document.getElementById("main-deck");

//var deck_child = deck_parent.querySelectorAll("li");
let card = document.getElementsByClassName("card");
let restartElement = document.getElementById("restart-option");
let playAgainButton = document.getElementById("play-again");
let modal = document.getElementById('success-modal');
let span = document.getElementsByClassName("close")[0];
let cards = [...card];
let totalMoves = 0;
let totalClics = 0;
let totalSuccessMoves = 0;
document.getElementById("moves").textContent = totalMoves;
let timer = document.getElementById("timer-option");
let timeTaken = 0;
timer.textContent = "00:00:00";
let shuffeledDeck = shuffle(cards);
let previousChild = null;
let date = new Date(null);

let setIntervalTimer = null;
//functions for open model and start timer and reset timer etc...
span.onclick = function () {
    modal.style.display = "none";
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

playAgainButton.addEventListener('click', function () {
    resetFn();
    modal.style.display = "none";
});

let openModal = function () {
    modal.style.display = "block";
    clearInterval(setIntervalTimer);
    let ulStar = document.getElementById("score-panel-id").outerHTML;
    let dStar = document.getElementById("star-model");
    dStar.innerHTML = ulStar;
};

let timerFn = function () {
    timeTaken += 1;
    date.setSeconds(timeTaken);
    let timeString = date.toISOString().substr(11, 8);
    timer.textContent = timeString;
};


let resetFn = function () {
    shuffeledDeck = shuffle(cards);
    shuffeledDeck.forEach(function (eachCard) {
        if (eachCard.classList[1]) {
            eachCard.classList.remove("match");
        }
    });
    setStar(1, 1);
    clearInterval(setIntervalTimer);
    totalMoves = 0;
    totalSuccessMoves = 0;
    document.getElementById("moves").textContent = totalMoves;
    previousChild = null;
    timeTaken = 0;
    date.setSeconds(timeTaken);
    let timeString = date.toISOString().substr(11, 8);
    timer.textContent = timeString;
    totalClics = 0;
};

restartElement.addEventListener('click', function () {
    resetFn();
});
//fuction for setting star based on the user performence
let setStar = function (tSuccess, tMoves) {
    let ul = document.getElementById("stars_ul");
    let li = null
    let iStart = null
    ul.innerHTML = "";
    if (tMoves > 10) {
        li = document.createElement("li");
        iStar = document.createElement("i")
        iStar.className = "fa fa-star";
        li.appendChild(iStar);
        ul.appendChild(li);

        li = document.createElement("li");
        iStar = document.createElement("i")
        iStar.className = "fa fa-star-o";
        li.appendChild(iStar);
        ul.appendChild(li);

        li = document.createElement("li");
        iStar = document.createElement("i");
        iStar.className = "fa fa-star-o"
        li.appendChild(iStar);
        ul.appendChild(li);
    } else if (tMoves > 5) {
        li = document.createElement("li");
        iStar = document.createElement("i");
        iStar.className = "fa fa-star";
        li.appendChild(iStar);
        ul.appendChild(li);

        li = document.createElement("li");
        iStar = document.createElement("i");
        iStar.className = "fa fa-star";
        li.appendChild(iStar);
        ul.appendChild(li);

        li = document.createElement("li");
        iStar = document.createElement("i");
        iStar.className = "fa fa-star-o";
        li.appendChild(iStar);
        ul.appendChild(li);
    } else {
        li = document.createElement("li");
        iStar = document.createElement("i");
        iStar.className = "fa fa-star";
        li.appendChild(iStar);
        ul.appendChild(li);

        li = document.createElement("li");
        iStar = document.createElement("i");
        iStar.className = "fa fa-star";
        li.appendChild(iStar);
        ul.appendChild(li);

        li = document.createElement("li");
        iStar = document.createElement("i");
        iStar.className = "fa fa-star";
        li.appendChild(iStar);
        ul.appendChild(li);
    }
};
//checking and matching cards
shuffeledDeck.forEach(function (eachChild) {
    eachChild.addEventListener('click', function () {
        totalClics++;
        if (totalClics == 1) {
            setIntervalTimer = setInterval(timerFn, 1000);
        }
        let currentChild = eachChild;
        if (currentChild.classList.contains("match")) {
            return;
        }
        if (previousChild === null) {
            previousChild = currentChild;
            previousChild.classList.add("match");

        } else if (previousChild.querySelector("i").classList[1] === 
                   currentChild.querySelector("i").classList[1]) {
            currentChild.classList.add("match");
            previousChild = null;
            totalMoves += 1;
            totalSuccessMoves += 1;
            document.getElementById("moves").textContent = totalMoves;
            setStar(totalSuccessMoves, totalMoves);
            if (totalSuccessMoves >= 8) {
                openModal();
            }
        } else if (previousChild.querySelector("i").classList[1] != 
                   currentChild.querySelector("i").classList[1]) {
            currentChild.classList.add("match");
            setTimeout(function removeMatch() {
                previousChild.classList.remove("match");
                currentChild.classList.remove("match");
                previousChild = null;
            }, 300)
            totalMoves += 1;
            document.getElementById("moves").textContent = totalMoves;
            setStar(totalSuccessMoves, totalMoves);
        }
    });


});



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another 
 function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality 
 in another function that you call from this one)
 *  - if the list already has another card, check to see if the two
 cards match
 *    + if the cards do match, lock the cards in the open position 
 (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and 
 hide the card's symbol (put this functionality in another function that 
 you call from this one)
 *    + increment the move counter and display it on the page (put this 
 functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score
 (put this functionality in another function that you call from this one)
 */