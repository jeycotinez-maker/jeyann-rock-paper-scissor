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
