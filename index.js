const startButton = document.getElementById("startButton");
const nextStepButton = document.getElementById("nextStepButton");
const restartButton = document.getElementById("restartButton");
const numPlayersInput = document.getElementById("numPlayers");
const numDiceInput = document.getElementById("numDice");
const outputDiv = document.getElementById("output");

let numPlayers;
let playerDiceCounts = [];
let playerScores = [];
let currentPlayerIndex = 0;

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function displayOutput(outputText) {
  outputDiv.innerHTML += `<p>${outputText}</p>`;
}

function playGame() {
  outputDiv.innerHTML = ""; // Clear previous output
  currentPlayerIndex = 0;
  playerScores = Array(numPlayers).fill(0);

  for (let i = 0; i < numPlayers; i++) {
    playerDiceCounts.push(parseInt(numDiceInput.value));
  }

  startButton.disabled = true;
  nextStepButton.disabled = false;
  restartButton.disabled = true;

  displayOutput(`Game started with ${numPlayers} players.`);
  nextStep();
}

function nextStep() {
  const currentPlayer = currentPlayerIndex + 1;
  const diceCount = playerDiceCounts[currentPlayerIndex];
  let currentPlayerScore = 0;

  displayOutput(`Player ${currentPlayer} is rolling ${diceCount} dice.`);

  for (let i = 0; i < diceCount; i++) {
    const diceResult = rollDice();

    if (diceResult === 6) {
      currentPlayerScore += 6;
    } else if (diceResult === 1) {
      playerScores[(currentPlayerIndex + 1) % numPlayers] += 1;
    }
  }

  displayOutput(`Player ${currentPlayer} scored ${currentPlayerScore} points.`);
  playerScores[currentPlayerIndex] += currentPlayerScore;

  if (diceCount === 0) {
    displayOutput(`Player ${currentPlayer} has finished playing.`);
  }

  currentPlayerIndex++;

  if (currentPlayerIndex < numPlayers) {
    setTimeout(nextStep, 1000); // Simulated delay for readability
  } else {
    displayOutput("All players have finished playing.");
    finishGame();
  }
}

function finishGame() {
  const winner = playerScores.indexOf(Math.max(...playerScores)) + 1;
  displayOutput(
    `Player ${winner} wins with ${playerScores[winner - 1]} points!`
  );
  nextStepButton.disabled = true;
  restartButton.disabled = false;
}

function restartGame() {
  startButton.disabled = false;
  nextStepButton.disabled = true;
  restartButton.disabled = true;
  numPlayersInput.value = "";
  numDiceInput.value = "";
  numPlayers = null;
  playerDiceCounts = [];
  playerScores = [];
  currentPlayerIndex = 0;
  outputDiv.innerHTML = "";
}

startButton.addEventListener("click", () => {
  numPlayers = parseInt(numPlayersInput.value);
  playGame();
});

nextStepButton.addEventListener("click", () => {
  nextStep();
});

restartButton.addEventListener("click", () => {
  restartGame();
});
