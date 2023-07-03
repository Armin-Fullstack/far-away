import React, { SyntheticEvent, useState } from "react";

interface PackingItemProps {
  packObj: {
    id: string;
    description: string;
    quantity: number;
    packed: boolean;
  };
  onDeletePack: (id: string) => void;
  onTogglePack: (id: string) => void;
}
interface Pack {
  description: string;
  quantity: number;
  packed: boolean;
  id: string;
}
interface FormProps {
  onAddPack: (packItem: Pack) => void;
}
interface PackingListsProps {
  pack: Pack[];
  onDeletePack: (id: string) => void;
  onTogglePack: (id: string) => void;
}
function App(): JSX.Element {
  const [pack, setPack] = useState<Pack[]>([]);
  function handleAddPackItems(packItem: Pack): void {
    setPack((pack) => [...pack, packItem]); // current new item of array + new added item to array => new state depends on current state
  }
  // Delete pack(setPack)
  function handleDeletePack(id: string): void {
    setPack((pack) =>
      pack.filter((element) => {
        return element.id !== id;
      })
    );
  }
  // Toggle pack item
  function handleTogglePack(id: string): void {
    setPack((pack) =>
      pack.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddPack={handleAddPackItems} />
      <PackingLists
        pack={pack}
        onDeletePack={handleDeletePack}
        onTogglePack={handleTogglePack}
      />
      <Stats pack={pack} />
    </div>
  );
}

function Logo(): JSX.Element {
  return <h1>🏝 Far Away 💼</h1>;
}

function Form({ onAddPack }: FormProps): JSX.Element {
  const [description, setDescription] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    if (!description) return;
    const newPack: Pack = {
      description,
      quantity,
      packed: false,
      id: crypto.randomUUID(),
    };
    onAddPack(newPack);
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setQuantity(+e.target.value)
        }
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item..."
        value={description}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setDescription(e.target.value)
        }
      />
      <button>ADD</button>
    </form>
  );
}
function PackingLists({
  pack,
  onDeletePack,
  onTogglePack,
}: PackingListsProps): JSX.Element {
  // removing each pack is happening in this component but state lives in parent component(App) => child-to-parent communication

  const [sort , setSort] = useState("input")

  //sorting an array depends on initinal array(Deriving state)
  let sortedPack: Pack[];
  sort === "input" && (sortedPack = pack)
  sort === "description" && (sortedPack = pack.slice().sort((a,b) => a.description.localeCompare(b.description)))
  // pack.sort() => mutate
  sort === "packed" && (sortedPack = pack.slice().sort((a,b) => +a.packed - +b.packed))

  return (
    <div className="list">
      <ul>
        {sortedPack.map((packingItem) => {
          return (
            <PackingItem
              packObj={packingItem}
              key={packingItem.id}
              onDeletePack={onDeletePack}
              onTogglePack={onTogglePack}
            />
          );
        })}
      </ul>
      <div className="actions">
        {/* Transform to controlled element */}
        <select value={sort} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSort(e.target.value)}> 
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
      </div>
    </div>
  );
}
function PackingItem({
  packObj,
  onDeletePack,
  onTogglePack,
}: PackingItemProps): JSX.Element {
  return (
    <li>
      <input
        type="checkbox"
        value={packObj.packed.toString()}
        onChange={() => onTogglePack(packObj.id)}
      />
      <span style={packObj.packed ? { textDecoration: "line-through" } : {}}>
        {packObj.quantity} {packObj.description}
      </span>
      <button onClick={() => onDeletePack(packObj.id)}>✖️</button>
    </li>
  );
}
function Stats({ pack }: PackingListsProps): JSX.Element {
  if (!pack.length)
    // conditional rendering(return)
    return (
      <footer className="stats">
        <p>Start adding some items to your packing list 🚀</p>
      </footer>
    );
  const packItems = pack.length; // we are Driving the state bc these data completely depends on pack state
  const packedLength = pack.filter((element) => element.packed).length;
  const percentage = Math.round((packedLength / packItems) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage !== 100
          ? `💼You have ${packItems} items on your list, and you already packed ${packedLength} (${percentage}%)`
          : "You got everything! Ready to go ✈️"}
      </em>
    </footer>
  );
}
export default App;
