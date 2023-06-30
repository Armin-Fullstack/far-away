import { SyntheticEvent, useState } from "react";

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
interface Pack {
  description: string;
  quantity: number;
  packed: boolean;
  id: string;
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
  const [description , setDescription] = useState<string>("")
  const [quantity , setQuantity] = useState<number>(1)
  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault()
    if(!description) return
    const newPack: Pack = {description, quantity, packed: false, id: crypto.randomUUID()}
    console.log(newPack); // We wanna pass data from Form to PackingList but they are siblings(thinking about state and state management)

    setDescription("")
    setQuantity(1)
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to your 😍 trip?</h3>
      <select value={quantity} onChange={e => setQuantity(+e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input type="text" placeholder="item..." value={description} onChange={e => setDescription(e.target.value)}/>
      <button>ADD</button>
    </form>
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
      <span style={packObj.packed ? { textDecoration: "line-through" } : {}}>
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
