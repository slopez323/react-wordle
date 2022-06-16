// update when localstorage is set up
const stats = [
  { value: 4, title: "Played" },
  { value: 100, title: "Win %" },
  { value: 1, title: "Current Streak" },
  { value: 1, title: "Max Streak" },
];

const distribution = [
  { guessCount: 1, value: 1 },
  { guessCount: 2, value: 0 },
  { guessCount: 3, value: 0 },
  { guessCount: 4, value: 3 },
  { guessCount: 5, value: 0 },
  { guessCount: 6, value: 0 },
];

const Popup = () => {
  return (
    <div className="popup-container">
      <Stats />
    </div>
  );
};

const Stats = () => {
  return (
    <div className="popup">
      <h3>Statistics</h3>
      <StatSummary />
      <h3>Guess Distribution</h3>
      <GuessDistribution />
    </div>
  );
};

const StatSummary = () => {
  return (
    <div className="statSummary">
      {stats.map((stat) => {
        return <StatBox stat={stat} key={stat.title} />;
      })}
    </div>
  );
};

const StatBox = ({ stat }) => {
  return (
    <div className="statBox">
      <div className="statValue">{stat.value}</div>
      <div className="statLabel">{stat.title}</div>
    </div>
  );
};

const GuessDistribution = () => {
  const computeDistribution = (() => {
    const distributionCopy = JSON.parse(JSON.stringify(distribution));
    distributionCopy.sort((item1, item2) => item2.value - item1.value);
    console.log(distributionCopy);
    console.log(distribution);
    // distribution.forEach((number) => {
    //   const weight =
    //     number.value / stats.find((stat) => stat.title === "Played").value;
    //   number.weight = weight;
    // });
  })();

  return (
    <div className="distribution">
      {distribution.map((count, index) => {
        return <DistChart count={count} key={index} />;
      })}
    </div>
  );
};

const DistChart = ({ count }) => {
  return (
    <div className="chart">
      <span>{count.guessCount}</span>
      <span>{count.value}</span>
    </div>
  );
};

export default Popup;
