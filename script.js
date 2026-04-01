// Elements
const playerScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");
const statusTextEl = document.getElementById("status");
const roundResultEl = document.getElementById("round-result");

// Buttons
const choiceBtns = document.querySelectorAll(".choice-btn");

// State
let playerScore = 0;
let computerScore = 0;

// Helper: pick computer choice
function getRandomChoice() {
  const choices = ["rock", "paper", "scissors"];
  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

// Helper: get result text
function getResultText(player, computer) {
  if (player === computer) return "It's a tie!";
  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    return "You win this round!";
  }
  return "Computer wins this round!";
}
// Update scores and UI
function updateScore(playerWon) {
  if (playerWon === true) playerScore++;
  if (playerWon === false) computerScore++;

  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
}

// Play one round
function playRound(playerChoice) {
  const computerChoice = getRandomChoice();
  const resultText = getResultText(playerChoice, computerChoice);

  roundResultEl.textContent = `You: ${playerChoice} | Computer: ${computerChoice} — ${resultText}`;
  statusTextEl.textContent = "Make your move!";

  if (playerChoice === computerChoice) {
    updateScore(null); // tie
  } else if (resultText.includes("You win")) {
    updateScore(true);
  } else {
    updateScore(false);
  }
}

// Event listeners
choiceBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const choice = btn.dataset.choice;
    playRound(choice);
  });
});