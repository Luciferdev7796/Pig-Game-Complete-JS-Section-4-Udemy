/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, currentRoundScore, activePlayer, gamePlaying;

initializeGame();

// var btn = () => {
// };

var diceDOM = document.querySelector(".dice");
// document.querySelector(".btn-roll").addEventListener("click", btn); // The Boring Way
document.querySelector(".btn-roll").addEventListener("click", function() {
	// Known as Anonymous Function which doesnt have a name and cannot be used again(coz no name to reference it with)
	if (gamePlaying) {
		var dice = Math.floor(Math.random() * 6) + 1;
		diceDOM.style.display = "block";
		diceDOM.src = "dice-" + dice + ".png";

		if (dice !== 1) {
			currentRoundScore += dice;
			document.querySelector(
				"#current-" + activePlayer
			).textContent = currentRoundScore;
		} else {
			currentRoundScore = 0;
			// document.querySelector("#current-" + activePlayer).textContent = 0;
			// // document
			// // 	.querySelector(".player-" + activePlayer + "-panel")
			// //     .classList.remove("active");

			// document
			// 	.querySelector(".player-" + activePlayer + "-panel")
			// 	.classList.toggle("active");

			// //      Change the active player and add the active class to it
			// activePlayer = (activePlayer + 1) % 2;
			// document
			// 	.querySelector(".player-" + activePlayer + "-panel")
			// 	.classList.toggle("active");

			switchPlayer();

			diceDOM.style.display = "none";
		}
	}
});

document.querySelector(".btn-hold").addEventListener("click", () => {
	if (gamePlaying) {
		scores[activePlayer] += currentRoundScore;
		document.querySelector("#score-" + activePlayer).textContent =
			scores[activePlayer];

		if (scores[activePlayer] >= 100) {
			document.querySelector("#name-" + activePlayer).textContent =
				"WINNER";
			diceDOM.style.display = "none";
			document
				.querySelector(".player-" + activePlayer + "-panel")
				.classList.add("winner");
			document
				.querySelector(".player-" + activePlayer + "-panel")
				.classList.remove("active");
			gamePlaying = false;
		} else {
			switchPlayer();
		}
	}
});

document.querySelector(".btn-new").addEventListener("click", initializeGame);
/* We Used this and not ...addEventListener("click", initializeGame()); because the brackets would immediately invoke the function*/

function switchPlayer() {
	currentRoundScore = 0;
	document.querySelector("#current-" + activePlayer).textContent = 0;
	document
		.querySelector(".player-" + activePlayer + "-panel")
		.classList.toggle("active");

	//      Change the active player and add the active class to it
	activePlayer = (activePlayer + 1) % 2;
	document
		.querySelector(".player-" + activePlayer + "-panel")
		.classList.toggle("active");
}

function initializeGame() {
	scores = [0, 0];
	currentRoundScore = 0;
	activePlayer = 0;
	gamePlaying = true;
	document.querySelector(".dice").style.display = "none";
	document.getElementById("score-0").textContent = "0";
	document.getElementById("score-1").textContent = "0";
	document.getElementById("current-0").textContent = "0";
	document.getElementById("current-1").textContent = "0";
	document.querySelector("#name-0").textContent = "Player 1";
	document.querySelector("#name-1").textContent = "Player 2";
	document.querySelector(".player-0-panel").classList.remove("winner");
	document.querySelector(".player-1-panel").classList.remove("winner");
	document.querySelector(".player-0-panel").classList.remove("active");
	document.querySelector(".player-1-panel").classList.remove("active");
	document.querySelector(".player-0-panel").classList.add("active");
}
