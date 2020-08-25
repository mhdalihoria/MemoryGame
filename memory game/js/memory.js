let hasFlippedCard = false;
let lockBoard = false;
let isClicked = false;
let firstCard, secondCard;
let flippedCounter = 0;
let x = 35;
let time = x;
const timer = document.querySelector(".timer");
const cards = document.querySelectorAll(".memory-card");
const startBtn = document.querySelector(".start");
const btn = document.querySelector("button");
const timerStart = startBtn.addEventListener("click", gameTimer);

function gameTimer() {
  let playTimer = setInterval(() => {
    time--;
    timer.textContent = time;

    if (flippedCounter == 6) {
      clearInterval(playTimer);
      this.disabled = false;// idk why this is not working 
      
    }
    if (time == 0) {
      lockBoard = true;
      this.disabled = false;// why in the name of god this is not working
    }
    if (time <= 0) {
      clearInterval(playTimer);
    }
    this.disabled = true;
  }, 1000);

 


  function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flip");

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;

      return;
    }

    secondCard = this;
    checkForMatch();
  }

  function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disablePickedCards() : unflipPickedCards();
    /* 
  here we used the tetnary operator:
  condition  ?  exprIfTrue : exprIfFalse
  */
  }

  function disablePickedCards() {
    // If it's match
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    flippedCounter++;

    resetBoard();
  }

  function unflipPickedCards() {
    // If it's not a match
    lockBoard = true;

    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");

      resetBoard();
    }, 1500);
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  (function shuffle() {
    cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 12);
      card.style.order = randomPos;
    });
  })();

  // the flipping when clicking event //THE MAIN THING//
  cards.forEach(card => card.addEventListener("click", flipCard));
}
