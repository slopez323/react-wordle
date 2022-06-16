const Popup = ({
  gameState,
  guessWord,
  showPopup,
  setShowPopup,
  stats,
  startNewGame,
}) => {
  const popupVisible = () => {
    return showPopup ? "show" : "";
  };
  return (
    <div
      className={`popup-container ${popupVisible()}`}
      onClick={() => {
        setShowPopup(false);
      }}
    >
      <Stats
        gameState={gameState}
        guessWord={guessWord}
        setShowPopup={setShowPopup}
        stats={stats}
        startNewGame={startNewGame}
      />
    </div>
  );
};

const Stats = ({ gameState, guessWord, setShowPopup, stats, startNewGame }) => {
  const { winDistribution, ...rest } = stats;
  return (
    <div className="popup">
      <div
        id="close"
        onClick={() => {
          setShowPopup(false);
        }}
      >
        X
      </div>
      <h3>Statistics</h3>
      <StatSummary stats={rest} />
      <h3>Guess Distribution</h3>
      <GuessDistribution
        gameState={gameState}
        guessWord={guessWord}
        distribution={winDistribution}
      />
      <NextWord startNewGame={startNewGame} />
    </div>
  );
};

const StatSummary = ({ stats }) => {
  const summary = {
    Played: stats.gamesPlayed,
    "Win %": Math.round((stats.gamesWon / stats.gamesPlayed) * 100),
    "Current Streak": stats.currentStreak,
    "Max Streak": stats.maxStreak,
  };
  return (
    <div className="statSummary">
      {Object.keys(summary).map((statTitle) => {
        return (
          <StatBox statTitle={statTitle} summary={summary} key={statTitle} />
        );
      })}
    </div>
  );
};

const StatBox = ({ statTitle, summary }) => {
  return (
    <div className="statBox">
      <div className="statValue">{summary[statTitle]}</div>
      <div className="statLabel">{statTitle}</div>
    </div>
  );
};

const GuessDistribution = ({ gameState, guessWord, distribution }) => {
  return (
    <div className="distribution">
      {distribution.map((count, index) => {
        return (
          <DistChart
            gameState={gameState}
            guessWord={guessWord}
            count={count}
            key={index}
          />
        );
      })}
    </div>
  );
};

const DistChart = ({ gameState, guessWord, count }) => {
  const barColor =
    (gameState === "won" || gameState === "saved-won") &&
    count.guessCount === guessWord
      ? "green"
      : "";
  const width = `${count.weight * 100}%`;
  return (
    <div className="chart" style={{ width: width }}>
      <span>{count.guessCount}</span>
      <span className={`bar ${barColor}`}>{count.value}</span>
    </div>
  );
};

const NextWord = ({ startNewGame }) => {
  return (
    <button
      onClick={() => {
        startNewGame();
      }}
    >
      Next Wordle
    </button>
  );
};

export default Popup;
