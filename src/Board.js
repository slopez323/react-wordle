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

const BoardLetters = ({ letter }) => {
  return <span className="inputs">{letter}</span>;
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

export default Board;
