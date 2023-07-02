import { SyntheticEvent, useState } from "react";

interface PackingItemProps {
  packObj: {
    id: string;
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
interface FormProps {
  onAddPack: (packItem: Pack) => void
}
interface PackingListsProps {
  pack: Pack[]
}
function App(): JSX.Element {
  const [pack , setPack] = useState<Pack[]>([])
  function handleAddPackItems(packItem: Pack): void {
    setPack(pack => [...pack , packItem]) // current new item of array + new added item to array => new state depends on current state 
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddPack={handleAddPackItems}/>
      <PackingLists pack={pack}/>
      <Stats />
    </div>
  );
}

function Logo(): JSX.Element {
  return <h1>🏝 Far Away 💼</h1>;
}

function Form({onAddPack}: FormProps): JSX.Element {
  const [description , setDescription] = useState<string>("")
  const [quantity , setQuantity] = useState<number>(1)
  
  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault()
    if(!description) return
    const newPack: Pack = {description, quantity, packed: false, id: crypto.randomUUID()}
    onAddPack(newPack)
    setDescription("")
    setQuantity(1)
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to your 😍 trip?</h3>
      <select value={quantity} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setQuantity(+e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input type="text" placeholder="item..." value={description} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}/>
      <button>ADD</button>
    </form>
  );
}

function PackingLists({pack}: PackingListsProps): JSX.Element {
  return (
    <div className="list">
      <ul>
        {pack.map((packingItem) => {
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
