// Elements
const playerScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");
const statusTextEl = document.getElementById("status");
const roundResultEl = document.getElementById("round-result");
const playAgainBtn = document.getElementById("play-again");

// Buttons
const choiceBtns = document.querySelectorAll(".choice-btn");

// State
let playerScore = 0;
let computerScore = 0;
let gameActive = true; // game is running

// Helper: pick computer choice
function getRandomChoice() {
  const choices = ["rock", "paper", "scissors"];
  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

// Helper: get result text and winner
function getResultTextAndWinner(player, computer) {
  if (player === computer) {
    return { text: "It's a tie this round!", winner: null };
  }
  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    return { text: `You won this round! 🎉`, winner: "player" };
  }
  return { text: `Computer wins this round! 💻`, winner: "computer" };
}

// Show round result with choices and emojis
function showRoundResult(playerChoice, computerChoice, resultText) {
  const choiceEmojis = {
    rock: "🪨",
    paper: "📄",
    scissors: "✂️",
  };

  const playerEmoji = choiceEmojis[playerChoice] || "";
  const computerEmoji = choiceEmojis[computerChoice] || "";

  roundResultEl.innerHTML = `
    You: ${playerEmoji} ${playerChoice} | 
    Computer: ${computerEmoji} ${computerChoice} — 
    <strong>${resultText}</strong>
  `;
}

// Update scores and UI
function updateScore(playerWon) {
  if (playerWon === "player") {
    playerScore++;
  } else if (playerWon === "computer") {
    computerScore++;
  }

  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;

  // End game if either reaches 15
  if (playerScore >= 15 || computerScore >= 15) {
    endGame(playerWon);
  }
}

// End game message and show Play Again
function endGame(lastWinner) {
  gameActive = false;

  if (playerScore >= 15) {
    statusTextEl.textContent = "🎉 Congratulations! You won the match!";
    roundResultEl.textContent = "You reached 15 points first. Well played!";
  } else {
    statusTextEl.textContent = "😭 Computer wins the match!";
    roundResultEl.textContent = "Computer reached 15 points first. Better luck next time!";
  }

  // Show Play Again button
  playAgainBtn.style.display = "inline-block";

  // Disable all choice buttons
  choiceBtns.forEach((btn) => {
    btn.disabled = true;
    btn.style.opacity = "0.6";
    btn.style.cursor = "not-allowed";
  });
}

// Reset game for Play Again
function resetGame() {
  playerScore = 0;
  computerScore = 0;
  gameActive = true;

  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
  statusTextEl.textContent = "Make your move!";
  roundResultEl.textContent = "";

  // Hide Play Again button
  playAgainBtn.style.display = "none";

  // Re-enable buttons
  choiceBtns.forEach((btn) => {
    btn.disabled = false;
    btn.style.opacity = "1";
    btn.style.cursor = "pointer";
  });
}

// Play one round
function playRound(playerChoice) {
  if (!gameActive) return;

  const computerChoice = getRandomChoice();
  const { text: resultText, winner } = getResultTextAndWinner(
    playerChoice,
    computerChoice
  );

  showRoundResult(playerChoice, computerChoice, resultText);

  statusTextEl.textContent =
    winner === "player"
      ? "You won that round! Keep going!"
      : winner === "computer"
      ? "Computer took this round."
      : "Tie! Go again!";

  updateScore(winner);
}

// Attach click listeners to choice buttons
choiceBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (!gameActive) return;
    const choice = btn.dataset.choice;
    playRound(choice);
  });
});

// Play Again button listener
playAgainBtn.addEventListener("click", resetGame);