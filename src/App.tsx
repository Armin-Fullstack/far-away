const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "charger", quantity: 1, packed: false },
];
interface PackingItemProps {
  packObj: {
    id: number;
    description: string;
    quantity: number;
    packed: boolean;
  };
}
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
  return (
    <div className="list">
      <ul>
        {initialItems.map((packingItem) => {
          return <PackingItem packObj={packingItem} key={packingItem.id} />;
        })}
      </ul>
    </div>
  );
}
function PackingItem({ packObj }: PackingItemProps): JSX.Element {
  return (
    <li>
      <span style={packObj.packed ? {textDecoration: "line-through"} : {}}>
        {packObj.quantity} {packObj.description}
      </span>
      <button>✖️</button>
    </li>
  );
}
function Stats(): JSX.Element {
  return (
    <footer className="stats">
      <em>💼 You have x items on your list, and you already packed x (x%)</em>
    </footer>
  );
}
export default App;
