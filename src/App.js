import React, { useState } from "react";
import Board from "./Board";
import Keyboard from "./Keyboard";
import { answerList, wordList } from "./wordleWords";
import "./App.css";

const guessList = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

const Error = () => {
  return <div className="error"></div>;
};

function App() {
  const [guesses, setGuesses] = useState([...guessList]);
  const [guessWord, setGuessWord] = useState(0);
  const [guessLetter, setGuessLetter] = useState(0);
  const [keypress, setKeypress] = useState({ key: "", count: 0 });
  const [gameState, setGameState] = useState("playing");
  const pickWordleAnswer = (index) => answerList[index];
  const [wordleAnswer, setWordleAnswer] = useState(pickWordleAnswer(0));
  const [letterColors, setLetterColors] = useState({});

  const checkGuess = (guess) => {
    setGuessWord(guessWord + 1);
    setGuessLetter(0);
    if (guess === wordleAnswer) {
      setGameState("won");
    } else if (guessWord >= 5) {
      setGameState("lost");
    }
  };

  const handleEnter = () => {
    const guess = guesses[guessWord].join("");
    if (guess.length < 5) {
      //alert missing letters
      return;
    }
    if (!answerList.includes(guess) && !wordList.includes(guess)) {
      //alert not in word list
      return;
    }
    checkGuess(guess.toLowerCase());
  };

  React.useEffect(
    function changeBoxColor() {
      if (guessWord > 0) {
        const guess = guesses[guessWord - 1];
        const guessBoxes = [
          ...document.querySelectorAll(
            `.board-row:nth-child(${guessWord}) .inputs`
          ),
        ];
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
                guessBoxes[index].classList.add("green");
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
                guessBoxes[index].classList.add("yellow");
                instances++;
                return;
              }
              if (!colorsCopy[letter]) colorsCopy[letter] = "gray";
              guessBoxes[index].classList.add("gray");
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
      if (gameState === "playing") {
        if (keypress.key === "Backspace" || keypress.key === "←") {
          if (guesses[guessWord][guessLetter]) {
            guesses[guessWord].splice(guessLetter, 1, "");
            setGuesses([...guesses]);
          } else {
            if (guessLetter > 0) {
              guesses[guessWord].splice(guessLetter - 1, 1, "");
              setGuesses([...guesses]);
              setGuessLetter(guessLetter - 1);
            }
          }
        } else if (keypress.key === "Enter") {
          handleEnter();
        } else if (keypress.key !== "") {
          guesses[guessWord].splice(guessLetter, 1, keypress.key);
          setGuesses([...guesses]);
          if (guessLetter < 4) {
            setGuessLetter(guessLetter + 1);
          }
        }
      }
    },
    [keypress]
  );

  React.useEffect(
    function borderFilled() {
      [...document.querySelectorAll(".inputs")].forEach((input) => {
        if (input.textContent !== "") {
          input.classList.add("filled");
        } else input.classList.remove("filled");
      });
    },
    [guesses]
  );

  React.useEffect(
    function keyboardColor() {
      if (letterColors !== {}) {
        for (const letter in letterColors) {
          document
            .getElementById(letter.toLowerCase())
            .classList.add(letterColors[letter]);
        }
      }
    },
    [letterColors]
  );

  React.useEffect(
    function result() {
      if (gameState !== "playing") {
        setTimeout(() => {
          alert(gameState);
        }, 300);
      }
    },
    [gameState]
  );

  return (
    <div className="App">
      <Error />
      <Board guesses={guesses} />
      <Keyboard keypress={keypress} setKeypress={setKeypress} />
    </div>
  );
}

export default App;
