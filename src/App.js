import React, { useState } from "react";
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

const BoardRows = ({ word, wordindex }) => {
  return (
    <div className="board-row">
      {word.map((letter, index) => {
        return (
          <BoardLetters
            letter={letter}
            letterindex={index}
            wordindex={wordindex}
            key={index}
          />
        );
      })}
    </div>
  );
};

const BoardLetters = ({ wordindex, letter, letterindex }) => {
  return (
    <span
      className="inputs"
      data-word={wordindex + 1}
      data-letter={letterindex + 1}
    >
      {letter}
    </span>
  );
};

const Board = ({ guesses }) => {
  return (
    <div className="Board">
      {guesses.map((word, index) => {
        return <BoardRows word={word} wordindex={index} key={index} />;
      })}
    </div>
  );
};

const KeySpans = ({ id, keypress, setKeypress }) => {
  return (
    <span
      className="keys"
      id={id}
      onClick={() => {
        setKeypress({ key: id, count: keypress.count + 1 });
      }}
    >
      {id}
    </span>
  );
};

const KeyRows = ({ row, keypress, setKeypress }) => {
  return (
    <div className="key-rows">
      {row.map((key, index) => {
        return (
          <KeySpans
            id={key}
            key={index}
            keypress={keypress}
            setKeypress={setKeypress}
          />
        );
      })}
    </div>
  );
};

const Keyboard = ({ keypress, setKeypress }) => {
  const keys1 = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
  const keys2 = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
  const keys3 = ["Enter", "z", "x", "c", "v", "b", "n", "m", "←"];
  const allKeys = [keys1, keys2, keys3];
  return (
    <div className="Keyboard">
      {allKeys.map((row, index) => {
        return (
          <KeyRows
            row={row}
            key={index}
            keypress={keypress}
            setKeypress={setKeypress}
          />
        );
      })}
    </div>
  );
};

function App() {
  const [guesses, setGuesses] = useState([...guessList]);
  const [guessWord, setGuessWord] = useState(0);
  const [guessLetter, setGuessLetter] = useState(0);
  const [keypress, setKeypress] = useState({ key: "", count: 0 });
  const [gameState, setGameState] = useState("playing");

  const pickWordleAnswer = (index) => {
    return answerList[index];
  };

  const [wordleAnswer, setWordleAnswer] = useState(pickWordleAnswer(0));

  const changeBoxColor = () => {
    const guessBoxes = [
      ...document.querySelectorAll(
        `.board-row:nth-child(${guessWord + 1}) .inputs`
      ),
    ];
    guessBoxes.forEach((input, index) => {
      const letter = input.textContent.toLowerCase();
      if (wordleAnswer.includes(letter)) {
        if (wordleAnswer[index] === letter) {
          input.classList.add("green");
        } else {
          input.classList.add("yellow");
        }
      } else {
        input.classList.add("gray");
      }
    });
  };

  const checkGuess = (word) => {
    if (word === wordleAnswer) {
      setGameState("won");
    } else {
      setGuessWord(guessWord + 1);
      setGuessLetter(0);
    }
    changeBoxColor();
  };

  const handleEnter = () => {
    const guess = guesses[guessWord].join("");
    if (guess.length < 5) {
      //alert missing letters
      return;
    }
    if (!answerList.includes(guess) && !wordList.includes(guess)) {
      //alert not a word
      return;
    }
    checkGuess(guess.toLowerCase());
  };

  React.useEffect(() => {
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

  React.useEffect(() => {
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
  }, [keypress]);

  React.useEffect(() => {
    [...document.querySelectorAll(".inputs")].forEach((input) => {
      if (input.textContent !== "") {
        input.classList.add("filled");
      } else input.classList.remove("filled");
    });
  }, [guesses]);

  return (
    <div className="App">
      <Board guesses={guesses} />
      <Keyboard keypress={keypress} setKeypress={setKeypress} />
    </div>
  );
}

export default App;
