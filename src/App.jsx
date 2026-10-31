function App() {
  return (
    <main className="container" style={{ paddingTop: "20vh" }}>
      <p className="mono muted">vineet@portfolio:~$</p>
      <h1 style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}>
        Hi, I'm <span style={{ color: "var(--accent)" }}>Vineet</span>
        <span className="cursor" />
      </h1>
      <p className="muted">
        Style check: cyan name, blinking cursor, dark background.
      </p>
    </main>
  );
}

export default App;