import React from "react";
import "./App.css";

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
  const inputs = [];
  for (let i = 0; i < 30; i++) {
    inputs.push(
      <span
        className={`inputs word-${Math.ceil((i + 1) / 5)}`}
        id={`input-${i}`}
        key={i}
      ></span>
    );
  }
  return <div className="Board">{inputs}</div>;
};

const KeySpans = (props) => {
  return (
    <span
      className="keys"
      id={props.id}
      key={props.key}
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
        {keys1.map((key, index) => {
          return <KeySpans id={key} key={index} />;
        })}
      </div>
      <div className="key-rows keys2">
        {keys2.map((key, index) => {
          return <KeySpans id={key} key={index} />;
        })}
      </div>
      <div className="key-rows keys3">
        {keys3.map((key, index) => {
          return <KeySpans id={key} key={index} />;
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
