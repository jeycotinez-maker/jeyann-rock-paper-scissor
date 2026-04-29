// Game elements
const playerScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");
const statusTextEl = document.getElementById("status");
const roundResultEl = document.getElementById("round-result");
const playAgainBtn = document.getElementById("play-again");
const choiceBtns = document.querySelectorAll(".choice-btn");
const scoreItems = document.querySelectorAll(".score-item");

// Game state
let playerScore = 0;
let computerScore = 0;
let gameActive = true;
const WINNING_SCORE = 10;

// Initialize game
function initGame() {
  updateDisplay();
  attachEventListeners();
}

// Update display elements
function updateDisplay() {
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
  updateScoreVisuals();
}

// Update score item visuals (highlight leader)
function updateScoreVisuals() {
  scoreItems.forEach(item => item.classList.remove('winner'));
  
  if (playerScore > computerScore) {
    document.querySelector('.player-score').classList.add('winner');
  } else if (computerScore > playerScore) {
    document.querySelector('.computer-score').classList.add('winner');
  }
}

// Computer choice generator
function getComputerChoice() {
  const choices = ['rock', 'paper', 'scissors'];
  return choices[Math.floor(Math.random() * 3)];
}

// Determine round winner and result message
function getRoundResult(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return {
      text: `It's a tie! Both chose ${capitalize(playerChoice)}.`,
      winner: null
    };
  }
   const winningCombos = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper'
  };
  
  if (winningCombos[playerChoice] === computerChoice) {
    return {
      text: `You win this round! ${capitalize(playerChoice)} beats ${computerChoice}.`,
      winner: 'player'
    };
  }
  
  return {
    text: `Computer wins this round! ${capitalize(computerChoice)} beats ${playerChoice}.`,
    winner: 'computer'
  };
}

// Helper: Capitalize first letter
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Display round result with emojis
function showRoundResult(playerChoice, computerChoice, resultText) {
  const emojis = {
    rock: '🪨',
    paper: '📄',
    scissors: '✂️'
  };
  
  roundResultEl.innerHTML = `
    <span>👤 You: ${emojis[playerChoice]} ${capitalize(playerChoice)}</span>
    <span>🤖 Computer: ${emojis[computerChoice]} ${capitalize(computerChoice)}</span>
    <strong>${resultText}</strong>
  `;
}

// Update scores and check for game end
function updateScores(winner) {
  if (winner === 'player') {
    playerScore++;
  } else if (winner === 'computer') {
    computerScore++;
  }
  
  updateDisplay();
  
  if (playerScore >= WINNING_SCORE || computerScore >= WINNING_SCORE) {
    endGame();
    return;
  }
  
  // Update status
  if (winner === 'player') {
    statusTextEl.textContent = 'Great round! Keep it up! 🔥';
  } else if (winner === 'computer') {
    statusTextEl.textContent = 'Computer got you that time. Next round!';
  } else {
    statusTextEl.textContent = 'Tie! Make your next move!';
  }
}

// End game
function endGame() {
  gameActive = false;
  
  if (playerScore >= WINNING_SCORE) {
    statusTextEl.innerHTML = '🎉 <strong>Congratulations! You won the match!</strong>';
    roundResultEl.innerHTML = `
      <strong>You reached ${WINNING_SCORE} points first!</strong><br>
      Final Score: ${playerScore} - ${computerScore}
    `;
  } else {
    statusTextEl.innerHTML = '😤 <strong>Computer wins the match!</strong>';
    roundResultEl.innerHTML = `
      <strong>Computer reached ${WINNING_SCORE} points first!</strong><br>
      Final Score: ${playerScore} - ${computerScore}
    `;
  }
  
  playAgainBtn.style.display = 'inline-block';
  disableChoiceButtons();
}

// Disable choice buttons
function disableChoiceButtons() {
  choiceBtns.forEach(btn => {
    btn.disabled = true;
    btn.setAttribute('aria-disabled', 'true');
  });
}

// Enable choice buttons
function enableChoiceButtons() {
  choiceBtns.forEach(btn => {
    btn.disabled = false;
    btn.removeAttribute('aria-disabled');
  });
}

// Reset game
function resetGame() {
  playerScore = 0;
  computerScore = 0;
  gameActive = true;
  
  statusTextEl.textContent = 'Make your move!';
  roundResultEl.textContent = '';
  playAgainBtn.style.display = 'none';
  
  updateDisplay();
  enableChoiceButtons();
}