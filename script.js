const words = {
    easy: ["cat", "dog", "bat", "hat", "rat"],
    medium: ["apple", "grape", "melon", "peach", "berry"],
    hard: ["elephant", "dinosaur", "crocodile", "kangaroo", "zebra"],
  };
  
  let currentWord = "";
  let usedWords = [];
  let score = 0;
  
  function scrambleWord(word) {
    return word.split("").sort(() => Math.random() - 0.5).join("");
  }
  
  document.getElementById("start-game").addEventListener("click", () => {
    const difficulty = document.getElementById("difficulty").value;
    startGame(difficulty);
  });
  
  
  function startGame(difficulty) {
    score = 0;
    usedWords = [];
    currentWord = getNewWord(difficulty);
  
    document.getElementById("difficulty-selector").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");
    updateUI();
  }
  
  function getNewWord(difficulty) {
    const availableWords = words[difficulty].filter(word => !usedWords.includes(word));
    if (availableWords.length === 0) {
      endGame();
      return null;
    }
    const word = availableWords[Math.floor(Math.random() * availableWords.length)];
    usedWords.push(word);
    return word;
  }
  
  function updateUI() {
    if (currentWord) {
      document.getElementById("scrambled-word").textContent = scrambleWord(currentWord);
      document.getElementById("guess").value = "";
      document.getElementById("feedback").textContent = "";
      document.getElementById("score").textContent = `Score: ${score}`;
    }
  }
  
  document.getElementById("submit-guess").addEventListener("click", () => {
    const guess = document.getElementById("guess").value.trim().toLowerCase();
    if (guess === currentWord) {
      score++;
      document.getElementById("feedback").textContent = "Correct!";
    } else {
      document.getElementById("feedback").textContent = `Wrong! The word was: ${currentWord}`;
    }
    currentWord = getNewWord(document.getElementById("difficulty").value);
    updateUI();
  });
  
  function endGame() {
    alert(`Game Over! Your final score is ${score}.`);
    document.getElementById("difficulty-selector").classList.remove("hidden");
    document.getElementById("game").classList.add("hidden");
  }
  