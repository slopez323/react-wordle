import React, { useState } from "react";
import Board from "./Board";
import Keyboard from "./Keyboard";
import { answerList, wordList } from "./wordleWords";
import "./App.css";
import Popup from "./Popup";

const guessList = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

const defaultBoxColors = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

const data = JSON.parse(localStorage.getItem("localData"))
  ? JSON.parse(localStorage.getItem("localData"))
  : {
      currentWordIndex: 0,
      guesses: JSON.parse(JSON.stringify(guessList)),
      guessWord: 0,
      guessLetter: 0,
      gameState: "playing",
      boxColors: JSON.parse(JSON.stringify(defaultBoxColors)),
      letterColors: {},
      stats: {
        gamesPlayed: 0,
        gamesWon: 0,
        currentStreak: 0,
        maxStreak: 0,
        winDistribution: [
          { guessCount: 1, value: 0, weight: 0 },
          { guessCount: 2, value: 0, weight: 0 },
          { guessCount: 3, value: 0, weight: 0 },
          { guessCount: 4, value: 0, weight: 0 },
          { guessCount: 5, value: 0, weight: 0 },
          { guessCount: 6, value: 0, weight: 0 },
        ],
      },
    };

const wonMessages = {
  1: "Genius",
  2: "Magnificent",
  3: "Impressive",
  4: "Splendid",
  5: "Great",
  6: "Phew",
};

const Header = () => {
  return (
    <header>
      <h1>Wordle</h1>
      <span>Clone</span>
    </header>
  );
};

const Message = ({ message }) => {
  const showMessage = () => {
    return message.isVisible ? "show" : "";
  };
  return <div className={`message ${showMessage()}`}>{message.message}</div>;
};

function App() {
  const [guesses, setGuesses] = useState(
    JSON.parse(JSON.stringify(data.guesses))
  );
  const [guessWord, setGuessWord] = useState(data.guessWord);
  const [guessLetter, setGuessLetter] = useState(data.guessLetter);
  const [keypress, setKeypress] = useState({ key: "", count: 0 });
  const [gameState, setGameState] = useState(data.gameState);
  const [currentWordIndex, setCurrentWordIndex] = useState(
    data.currentWordIndex
  );
  const [wordleAnswer, setWordleAnswer] = useState(
    answerList[currentWordIndex]
  );
  const [boxColors, setBoxColors] = useState(
    JSON.parse(JSON.stringify(data.boxColors))
  );
  const [letterColors, setLetterColors] = useState(data.letterColors);
  const [message, setMessage] = useState({
    message: "",
    type: "",
    isVisible: false,
  });
  const [rowError, setRowError] = useState({ row: "", error: false });
  const [showPopup, setShowPopup] = useState(false);
  const [stats, setStats] = useState(JSON.parse(JSON.stringify(data.stats)));

  React.useEffect(function updateLocalStorage() {
    const localData = {
      currentWordIndex,
      guesses,
      guessWord,
      guessLetter,
      gameState,
      boxColors,
      letterColors,
      stats,
    };
    localStorage.setItem("localData", JSON.stringify(localData));
  });

  const checkGuess = (guess) => {
    setGuessWord(guessWord + 1);
    setGuessLetter(0);
    if (guess === wordleAnswer) {
      setGameState("won");
    } else if (guessWord >= 5) {
      setGameState("lost");
    }
  };

  const handleMessage = (type) => {
    if (type === "lost") {
      setMessage({
        message: wordleAnswer.toUpperCase(),
        type: type,
        isVisible: true,
      });
    } else if (type === "won") {
      setMessage({
        message: wonMessages[guessWord],
        type: type,
        isVisible: true,
      });
    } else if (gameState === "playing") {
      if (type === "missing") {
        setMessage({
          message: "Not enough letters",
          type: type,
          isVisible: true,
        });
      } else if (type === "not-word") {
        setMessage({
          message: "Not in word list",
          type: type,
          isVisible: true,
        });
      }
      setRowError({ row: guessWord, error: true });
    }
  };

  const handleEnter = () => {
    const guess = guesses[guessWord].join("");
    if (guess.length < 5) {
      handleMessage("missing");
      return;
    }
    if (!answerList.includes(guess) && !wordList.includes(guess)) {
      handleMessage("not-word");
      return;
    }
    checkGuess(guess.toLowerCase());
  };

  const startNewGame = () => {
    setCurrentWordIndex(currentWordIndex + 1);
    setGuesses(JSON.parse(JSON.stringify(guessList)));
    setGuessWord(0);
    setGuessLetter(0);
    setGameState("playing");
    setBoxColors(JSON.parse(JSON.stringify(defaultBoxColors)));
    setLetterColors({});
  };

  React.useEffect(() => {
    setWordleAnswer(answerList[currentWordIndex]);
  }, [currentWordIndex]);

  React.useEffect(
    function changeBoxColor() {
      if (guessWord > 0) {
        const guess = [...guesses[guessWord - 1]];
        const guessColors = JSON.parse(JSON.stringify(boxColors));
        const letterSet = new Set(guess);
        const colorsCopy = { ...letterColors };
        letterSet.forEach((letter) => {
          const guessIndices = [];
          while (guess.indexOf(letter) >= 0) {
            const index = guess.indexOf(letter);
            guessIndices.push(index);
            guess.splice(index, 1, letter.toUpperCase());
          }
          const wordCopy = wordleAnswer.split("");
          const wordIndices = [];
          while (wordCopy.indexOf(letter) >= 0) {
            const index = wordCopy.indexOf(letter);
            wordIndices.push(index);
            wordCopy.splice(index, 1, letter.toUpperCase());
          }
          let instances = 0;
          guessIndices
            .filter((index) => {
              if (wordIndices.includes(index)) {
                const letter = guess[index];
                colorsCopy[letter] = "green";
                guessColors[guessWord - 1][index] = "green";
                setBoxColors([...guessColors]);
                instances++;
                return false;
              }
              return true;
            })
            .forEach((index) => {
              const letter = guess[index];
              while (instances < wordIndices.length) {
                if (colorsCopy[letter] !== "green")
                  colorsCopy[letter] = "yellow";
                guessColors[guessWord - 1][index] = "yellow";
                setBoxColors([...guessColors]);
                instances++;
                return;
              }
              if (!colorsCopy[letter]) colorsCopy[letter] = "gray";
              guessColors[guessWord - 1][index] = "gray";
              setBoxColors([...guessColors]);
            });
          setLetterColors({ ...colorsCopy });
        });
      }
    },
    [guessWord]
  );

  React.useEffect(function typingListener() {
    window.addEventListener("keydown", (e) => {
      if (
        e.key === "Backspace" ||
        e.key === "Enter" ||
        (e.which >= 65 && e.which <= 90)
      ) {
        const keyData = { key: e.key, count: keypress.count + 1 };
        setKeypress(keyData);
      }
    });
  }, []);

  React.useEffect(
    function handleInput() {
      const guessesCopy = JSON.parse(JSON.stringify(guesses));
      if (gameState === "playing") {
        if (keypress.key === "Backspace" || keypress.key === "←") {
          if (guessesCopy[guessWord][guessLetter]) {
            guessesCopy[guessWord].splice(guessLetter, 1, "");
            setGuesses([...guessesCopy]);
          } else {
            if (guessLetter > 0) {
              guessesCopy[guessWord].splice(guessLetter - 1, 1, "");
              setGuesses([...guessesCopy]);
              setGuessLetter(guessLetter - 1);
            }
          }
        } else if (keypress.key === "Enter") {
          handleEnter();
        } else if (keypress.key !== "") {
          guessesCopy[guessWord].splice(guessLetter, 1, keypress.key);
          setGuesses([...guessesCopy]);
          if (guessLetter < 4) {
            setGuessLetter(guessLetter + 1);
          }
        }
      }
    },
    [keypress]
  );

  React.useEffect(
    function handleEndGameData() {
      if (gameState !== "playing") {
        window.endMessage = setTimeout(() => {
          handleMessage(gameState);
        }, 300);

        if (gameState === "won" || gameState === "lost") {
          const statsCopy = JSON.parse(JSON.stringify(stats));
          if (gameState === "won") {
            statsCopy.winDistribution[guessWord - 1].value += 1;
            const distributionCopy = JSON.parse(
              JSON.stringify(statsCopy.winDistribution)
            );
            distributionCopy.sort((item1, item2) => item2.value - item1.value);
            const max = distributionCopy[0].value;
            statsCopy.winDistribution.forEach((item) => {
              const weight = item.value / max;
              item.weight = weight;
            });

            statsCopy.maxStreak =
              statsCopy.maxStreak > statsCopy.currentStreak + 1
                ? statsCopy.maxStreak
                : statsCopy.currentStreak + 1;

            statsCopy.currentStreak += 1;
            statsCopy.gamesWon += 1;
            setGameState("saved-won");
          } else if (gameState === "lost") {
            statsCopy.currentStreak = 0;
            setGameState("saved-lost");
          }
          statsCopy.gamesPlayed += 1;
          setStats({ ...statsCopy });
        }

        window.popupVisible = setTimeout(() => {
          setShowPopup(true);
        }, 1000);
      }

      return () => {
        clearTimeout(window.endMessage);
        clearTimeout(window.popupVisible);
      };
    },
    [gameState]
  );

  React.useEffect(
    function clearMessage() {
      if (message.type === "missing" || message.type === "not-word") {
        window.errorOut = setTimeout(() => {
          setMessage({ ...message, isVisible: false });
        }, 600);
      } else if (message.type === "won") {
        window.wonOut = setTimeout(() => {
          setMessage({ ...message, isVisible: false });
        }, 2000);
      }
      return () => {
        clearTimeout(window.errorOut);
        clearTimeout(window.wonOut);
      };
    },
    [message]
  );

  React.useEffect(
    function removeShake() {
      const rowShake = setTimeout(() => {
        setRowError({ ...rowError, error: false });
      }, 600);
      return () => clearTimeout(rowShake);
    },
    [rowError]
  );

  return (
    <div className="App">
      <Popup
        gameState={gameState}
        guessWord={guessWord}
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        stats={stats}
        startNewGame={startNewGame}
      />
      <Header />
      <Message message={message} />
      <Board guesses={guesses} boxColors={boxColors} rowError={rowError} />
      <Keyboard
        keypress={keypress}
        setKeypress={setKeypress}
        letterColors={letterColors}
      />
    </div>
  );
}

export default App;
