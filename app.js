console.log("Game");

// Start point
let matches = 0;
let emojisMatched = []; // Track emojis matched
let boxesSelected = []; // Boxes selected  --at most two at a time
let emojis = [
  "😄",
  "😄",
  "😡",
  "😡",
  "✨",
  "✨",
  "💀",
  "💀",
  "❤️️",
  "❤️️",
  "😶",
  "😶",
  "💋",
  "💋",
  "🙈",
  "🙈",
];

emojis = emojis.sort(() => Math.random() - 0.5); // Randomize emojis

const matchCountP = document.getElementById("match-count"); // mATCH COUNT element
const resetButton = document.getElementById("reset");

function handleNoMatch() {
  boxesSelected.forEach((em) => em.classList.remove("show"));
  boxesSelected = [];
}

function handleMatch() {
  boxesSelected.forEach((em) => em.classList.remove("show"));
  boxesSelected.forEach((em) => em.classList.add("matched"));
  increaseCount();
  boxesSelected = [];
  if (matches === 8) {
    endGame();
  }
}

function increaseCount() {
  matches += 1;
  matchCountP.innerHTML = matches;
}

function endGame() {
  alert("You have found all matching pairs");
}

const boxes = document.querySelectorAll(".item");
boxes.forEach((box, i) => {
  box.innerHTML = emojis[i];
  box.id = `item-${i + 1}`;
  box.addEventListener("click", () => {
    let selectedEmoji = box.innerHTML;
    console.log("Selected emoji", selectedEmoji);

    if (
      !emojisMatched.includes(selectedEmoji) &&
      !boxesSelected.includes(box)
    ) {
      console.log("Do Something!");
      box.classList.add("show");
      boxesSelected.push(box);
      console.log("Boxes selected:", boxesSelected.length);

      // If we selected two items
      if (boxesSelected.length === 2) {
        console.log("Check match");

        // Check if they match
        if (boxesSelected.every((e) => e.innerHTML === selectedEmoji)) {
          console.log("match");
          emojisMatched.push(selectedEmoji);
          setTimeout(() => {
            handleMatch();
          }, 300);
        } else {
          // Doesn't match clear
          console.log("no match");
          setTimeout(() => {
            handleNoMatch();
          }, 300);
        }
      }
    }
  });
  // box.addEventListener()
});

function resetGame() {
  window.location.reload();
}

resetButton.addEventListener("click", resetGame);
