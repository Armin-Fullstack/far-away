import { useState } from "react";
import Logo from "./components/Logo";
import Form from "./components/Form";
import PackingLists from "./components/PackingLists";
import Stats from "./components/Stats";

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
  onClearList: () => void;
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
  //clear list
  function handleClearList(): void {
    const isConfirmed = confirm(
      "Are you sure that you want to delete all items?"
    );
    // isConfirmed && setPack([])
    if (isConfirmed) setPack([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddPack={handleAddPackItems} />
      <PackingLists
        pack={pack}
        onDeletePack={handleDeletePack}
        onTogglePack={handleTogglePack}
        onClearList={handleClearList}
      />
      <Stats pack={pack} />
    </div>
  );
}

export default App;
