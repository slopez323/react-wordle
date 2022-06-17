const BoardRows = ({ word, wordindex, boxColors, rowError }) => {
  const isError =
    rowError.row === wordindex && rowError.error === true ? "shake" : "";
  return (
    <div className={`board-row ${isError}`}>
      {word.map((letter, index) => {
        return (
          <BoardLetters
            letter={letter}
            letterindex={index}
            wordindex={wordindex}
            boxColors={boxColors}
            key={index}
          />
        );
      })}
    </div>
  );
};

const BoardLetters = ({ letter, letterindex, wordindex, boxColors }) => {
  const isFilled = letter !== "" ? "filled" : "";

  const colorBox =
    boxColors[wordindex][letterindex] !== ""
      ? `colored ${boxColors[wordindex][letterindex]}`
      : "";

  return <span className={`inputs ${colorBox} ${isFilled}`}>{letter}</span>;
};

const Board = ({ guesses, boxColors, rowError }) => {
  return (
    <div className="Board">
      {guesses.map((word, index) => {
        return (
          <BoardRows
            word={word}
            wordindex={index}
            boxColors={boxColors}
            rowError={rowError}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default Board;
