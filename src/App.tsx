function App(): JSX.Element {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingLists />
      <Stats />
    </div>
  );
}

function Logo(): JSX.Element {
  return <h1>🏝 Far Away 💼</h1>;
}

function Form(): JSX.Element {
  return (
    <div className="add-form">
      <h3>What do you nedd to your 😍 trip?</h3>
    </div>
  );
}

function PackingLists(): JSX.Element {
  return <div className="list">LIST</div>;
}

function Stats(): JSX.Element {
  return (
    <footer>
      <em>💼 You have x items on your list, and you already packed x (x%)</em>
    </footer>
  );
}
export default App;
