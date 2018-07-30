/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function 
function shuffle(array_list) {
    var currentIndex = array_list.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array_list[currentIndex];
        array_list[currentIndex].querySelector("i").classList[1] = array_list[randomIndex].querySelector("i").classList[1];
        array_list[randomIndex].querySelector("i").classList[1] = temporaryValue.querySelector("i").classList[1];
    }
    return array_list;
};

// let deck_parent = document.getElementById("main-deck");

//var deck_child = deck_parent.querySelectorAll("li");
let card = document.getElementsByClassName("card");
let restart_element = document.getElementById("restart-option");
let play_again_button = document.getElementById("play-again");
let modal = document.getElementById('success-modal');
let span = document.getElementsByClassName("close")[0];
let cards = [...card];
var total_moves = 0;
let total_clics = 0;
var total_success_moves = 0;
document.getElementById("moves").textContent = total_moves;
var timer = document.getElementById("timer-option");
var time_taken = 0;
timer.textContent = "00:00:00";
var shuffeledDeck = shuffle(cards);
let previous_child = null;
let date = new Date(null);

var set_interval_timer = null;
//functions for open model and start timer and reset timer etc...
span.onclick = function () {
    modal.style.display = "none";
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

play_again_button.addEventListener('click', function () {
    reset_fn();
    modal.style.display = "none";
});

var openModal = function () {
    modal.style.display = "block";
    clearInterval(set_interval_timer);
    var ul_star = document.getElementById("score-panel-id").outerHTML;
    var d_star = document.getElementById("star_model");
    d_star.innerHTML = ul_star;
};

var timer_fn = function () {
    time_taken += 1;
    date.setSeconds(time_taken);
    var timeString = date.toISOString().substr(11, 8);
    timer.textContent = timeString;
};


let reset_fn = function () {
    shuffeledDeck = shuffle(cards);
    shuffeledDeck.forEach(function (each_card) {
        if (each_card.classList[1]) {
            each_card.classList.remove("match");
        }
    });
    setStar(1, 1);
    clearInterval(set_interval_timer);
    total_moves = 0;
    total_success_moves = 0;
    document.getElementById("moves").textContent = total_moves;
    previous_child = null;
    time_taken = 0;
    date.setSeconds(time_taken);
    var timeString = date.toISOString().substr(11, 8);
    timer.textContent = timeString;
    total_clics = 0;
};

restart_element.addEventListener('click', function () {
    reset_fn();
});
//fuction for setting star based on the user performence
var setStar = function (t_success, t_moves) {
    var ul = document.getElementById("stars_ul");
    ul.innerHTML = "";
    if (t_moves > 10) {
        var li = document.createElement("li");
        var i_star = document.createElement("i")
        i_star.className = "fa fa-star";
        li.appendChild(i_star);
        ul.appendChild(li);

        var li = document.createElement("li");
        var i_star = document.createElement("i")
        i_star.className = "fa fa-star-o";
        li.appendChild(i_star);
        ul.appendChild(li);

        var li = document.createElement("li");
        var i_star = document.createElement("i");
        i_star.className = "fa fa-star-o"
        li.appendChild(i_star);
        ul.appendChild(li);
    } else if (t_moves > 5) {
        var li = document.createElement("li");
        var i_star = document.createElement("i");
        i_star.className = "fa fa-star";
        li.appendChild(i_star);
        ul.appendChild(li);

        var li = document.createElement("li");
        var i_star = document.createElement("i");
        i_star.className = "fa fa-star";
        li.appendChild(i_star);
        ul.appendChild(li);

        var li = document.createElement("li");
        var i_star = document.createElement("i");
        i_star.className = "fa fa-star-o";
        li.appendChild(i_star);
        ul.appendChild(li);
    } else {
        var li = document.createElement("li");
        var i_star = document.createElement("i");
        i_star.className = "fa fa-star";
        li.appendChild(i_star);
        ul.appendChild(li);

        var li = document.createElement("li");
        var i_star = document.createElement("i");
        i_star.className = "fa fa-star";
        li.appendChild(i_star);
        ul.appendChild(li);

        var li = document.createElement("li");
        var i_star = document.createElement("i");
        i_star.className = "fa fa-star";
        li.appendChild(i_star);
        ul.appendChild(li);
    }
};
//checking and matching cards
shuffeledDeck.forEach(function (each_child) {
    each_child.addEventListener('click', function () {
        total_clics++;
        if (total_clics == 1) {
            set_interval_timer = setInterval(timer_fn, 1000);
        }
        let current_child = each_child;
        if (current_child.classList.contains("match")) {
            return;
        }
        if (previous_child === null) {
            previous_child = current_child;
            previous_child.classList.add("match");

        } else if (previous_child.querySelector("i").classList[1] === current_child.querySelector("i").classList[1]) {
            current_child.classList.add("match");
            previous_child = null;
            total_moves += 1;
            total_success_moves += 1;
            document.getElementById("moves").textContent = total_moves;
            setStar(total_success_moves, total_moves);
            if (total_success_moves >= 8) {
                openModal();
            }
        } else if (previous_child.querySelector("i").classList[1] != current_child.querySelector("i").classList[1]) {
            current_child.classList.add("match");
            setTimeout(function removeMatch() {
                previous_child.classList.remove("match");
                current_child.classList.remove("match");
                previous_child = null;
            }, 300)
            total_moves += 1;
            document.getElementById("moves").textContent = total_moves;
            setStar(total_success_moves, total_moves);
        }
    });


});



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */