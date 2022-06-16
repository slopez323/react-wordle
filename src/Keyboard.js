const KeySpans = ({ id, keypress, setKeypress, letterColors }) => {
  const getLetterColors = () => {
    return letterColors[id.toUpperCase()] ? letterColors[id.toUpperCase()] : "";
  };
  return (
    <span
      className={`keys ${getLetterColors()}`}
      id={id}
      onClick={() => {
        setKeypress({ key: id, count: keypress.count + 1 });
      }}
    >
      {id}
    </span>
  );
};

const KeyRows = ({ row, keypress, setKeypress, letterColors }) => {
  return (
    <div className="key-rows">
      {row.map((key, index) => {
        return (
          <KeySpans
            id={key}
            key={index}
            keypress={keypress}
            setKeypress={setKeypress}
            letterColors={letterColors}
          />
        );
      })}
    </div>
  );
};

const Keyboard = ({ keypress, setKeypress, letterColors }) => {
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
            letterColors={letterColors}
          />
        );
      })}
    </div>
  );
};

export default Keyboard;
