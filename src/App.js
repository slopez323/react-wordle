import React from "react";
import "./App.css";

const guessList = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

const changeCurrentBox = (keypress) => {
  const first = document.getElementById("input-0");
  if (!first.textContent) {
    first.classList.add("currentbox");
  }

  const currentBox = document.querySelector(".currentbox");
  const currentWord = currentBox.classList[1];
  if (keypress === "Backspace") {
    if (currentBox.textContent) {
      currentBox.textContent = "";
    } else {
      if (currentBox.previousElementSibling.classList.contains(currentWord)) {
        currentBox.classList.remove("currentbox");
        currentBox.previousElementSibling.classList.add("currentbox");
        currentBox.textContent = "";
      }
    }
  } else if (keypress === "Enter") {
    // on submit
  } else {
    if (currentBox.nextElementSibling.classList.contains(currentWord)) {
      currentBox.classList.remove("currentbox");
      currentBox.nextElementSibling.classList.add("currentbox");
    }
  }
};

const addListeners = () => {
  window.addEventListener("keydown", (e) => {
    if (
      e.key === "Backspace" ||
      e.key === "Enter" ||
      (e.which >= 65 && e.which <= 90)
    ) {
      changeCurrentBox(e.key);
    }
  });
};

const Board = () => {
  return (
    <div className="Board">
      {guessList.map((word, wordindex) => {
        return (
          <div className="board-row">
            {word.map((letter, letterindex) => {
              return (
                <span
                  className={`inputs word-${wordindex + 1}`}
                  id={`input-${wordindex + 1}-${letterindex + 1}`}
                >
                  {letter}
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

const KeySpans = (props) => {
  return (
    <span
      className="keys"
      id={props.id}
      onClick={() => {
        //// input key type function here
      }}
    >
      {props.id}
    </span>
  );
};

const Keyboard = () => {
  const keys1 = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
  const keys2 = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
  const keys3 = ["enter", "z", "x", "c", "v", "b", "n", "m", "←"];
  return (
    <div className="Keyboard">
      <div className="key-rows keys1">
        {keys1.map((key) => {
          return <KeySpans id={key} />;
        })}
      </div>
      <div className="key-rows keys2">
        {keys2.map((key) => {
          return <KeySpans id={key} />;
        })}
      </div>
      <div className="key-rows keys3">
        {keys3.map((key) => {
          return <KeySpans id={key} />;
        })}
      </div>
    </div>
  );
};

function App() {
  React.useEffect(() => {
    // changeCurrentBox();
    addListeners();
  }, []);

  return (
    <div className="App">
      <Board />
      <Keyboard />
    </div>
  );
}

export default App;
