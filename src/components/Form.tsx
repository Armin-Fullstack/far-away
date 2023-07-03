import { SyntheticEvent, useState } from "react";

export default function Form({ onAddPack }: FormProps): JSX.Element {
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
