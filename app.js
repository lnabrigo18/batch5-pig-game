/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let playerTurn = "playerOne";

let dieOne = [1, 2, 3, 4, 5, 6];
let dieTwo = [1, 2, 3, 4, 5, 6];

let playerScores = [
  {
    player: "playerOne",
    roundScore: 0,
    currentScore: 0,
  },
  {
    player: "playerTwo",
    roundScore: 0,
    currentScore: 0,
  },
];

let diceTotalNumber;

//click event listener
document.querySelector(".btn-roll").addEventListener("click", function () {
  rollDice();
});
document.querySelector(".btn-hold").addEventListener("click", function () {
  hold(playerScores);
});
document.querySelector(".btn-new").addEventListener("click", function () {
  reset();
});

function getDieNumbers() {
  return {
    dieOneNumber: dieOne[Math.floor(Math.random() * 6)],
    dieTwoNumber: dieTwo[Math.floor(Math.random() * 6)],
  };
}

function getDiceResult(dieNumbers) {
  const { dieOneNumber, dieTwoNumber } = dieNumbers;

  if (dieOneNumber === 1 || dieTwoNumber === 1) {
    return 0;
  } else {
    return dieOneNumber + dieTwoNumber;
  }
}

function rollDice() {
  if (playerTurn === "playerOne") {
    let dieNumbers = getDieNumbers();
    let result = getDiceResult(dieNumbers);
    displayDice(dieNumbers);
    if (result) {
      playerScores[0].roundScore += result;
      displayP1RoundResult(playerScores[0].roundScore);
    } else {
      playerScores[0].roundScore = 0;
      displayP1RoundResult(playerScores[0].roundScore);
      switchPlayerTurn();
    }
  } else {
    let dieNumbers = getDieNumbers();
    let result = getDiceResult(dieNumbers);
    displayDice(dieNumbers);
    if (result) {
      playerScores[1].roundScore += result;
      displayP2RoundResult(playerScores[1].roundScore);
    } else {
      playerScores[1].roundScore = 0;
      displayP2RoundResult(playerScores[1].roundScore);
      switchPlayerTurn();
    }
  }
}

function hold(playerScores) {
  let p1 = playerScores[0];
  let p2 = playerScores[1];
  if (playerTurn === "playerOne") {
    p1.currentScore += p1.roundScore;
    p1.roundScore = 0;
    displayP1CurrentResult(p1.currentScore);
    displayP1RoundResult(p1.roundScore);
    switchPlayerTurn();
  } else {
    p2.currentScore += p2.roundScore;
    p2.roundScore = 0;
    displayP2CurrentResult(p2.currentScore);
    displayP2RoundResult(p2.roundScore);
    switchPlayerTurn();
  }
  checkWinner();
}

function checkWinner() {
  let p1 = playerScores[0];
  let p2 = playerScores[1];
  if (p1.currentScore > 99) {
    alert("Winner - Player 1");
    reset();
  }
  if (p2.currentScore > 99) {
    alert("Winner  - Player 2");
    reset();
  }
}

function switchPlayerTurn() {
  if (playerTurn === "playerOne") {
    playerTurn = "playerTwo";
  } else {
    playerTurn = "playerOne";
  }
  switchActiveDesign();
}

function reset() {
  playerScores.forEach((player) => {
    player.roundScore = 0;
    player.currentScore = 0;
  });
  playerTurn = "playerOne";
  displayP1RoundResult(playerScores[0].roundScore);
  displayP2RoundResult(playerScores[1].roundScore);
  displayP1CurrentResult(playerScores[0].currentScore);
  displayP2CurrentResult(playerScores[1].currentScore);
  switchActiveDesign();
}

function displayP1RoundResult(roundScore) {
  document.getElementById("score-0").innerHTML = roundScore;
}
function displayP2RoundResult(roundScore) {
  document.getElementById("score-1").innerHTML = roundScore;
}
function displayP1CurrentResult(currentScore) {
  document.getElementById("current-0").innerHTML = currentScore;
}
function displayP2CurrentResult(currentScore) {
  document.getElementById("current-1").innerHTML = currentScore;
}
function displayDice(dieNumbers) {
  document.querySelector(
    ".dice-1"
  ).src = `dice-${dieNumbers.dieOneNumber.toString()}.png`;
  document.querySelector(
    ".dice-2"
  ).src = `dice-${dieNumbers.dieTwoNumber.toString()}.png`;
}

function switchActiveDesign() {
  if (playerTurn === "playerOne") {
    document.querySelector(".player-0-panel").classList.add("active");
    document.querySelector(".player-1-panel").classList.remove("active");
  } else {
    document.querySelector(".player-1-panel").classList.add("active");
    document.querySelector(".player-0-panel").classList.remove("active");
  }
}
