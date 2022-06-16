const Header = ({ darkTheme, setDarkTheme }) => {
  return (
    <header>
      <div>
        <h1>Wordle</h1>
        <span>Clone</span>
      </div>
      <div className="switch-container">
        <label className="switch">
          <input
            type="checkbox"
            defaultChecked={darkTheme}
            onChange={() => setDarkTheme(!darkTheme)}
          />
          <span className="slider"></span>
        </label>
        <span>☾</span>
      </div>
    </header>
  );
};

export default Header;
