import { useState } from "react";
import PackingItem from "./PackingItem";
import {PackingListsProps , Pack} from "../types"

export default function PackingLists({
  pack,
  onDeletePack,
  onTogglePack,
  onClearList,
}: PackingListsProps): JSX.Element {
  // removing each pack is happening in this component but state lives in parent component(App) => child-to-parent communication

  const [sort, setSort] = useState("input");

  //sorting an array depends on initinal array(Deriving state)
  let sortedPack: Pack[];
  switch (sort) {
    case "description":
      sortedPack = pack.slice().sort((a, b) =>
        // pack.sort() => mutate
        a.description.localeCompare(b.description)
      );
      break;
    case "packed":
      sortedPack = pack.slice().sort((a, b) => +a.packed - +b.packed);
      break;
    default:
      sortedPack = pack;
      break;
  }

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
        <select
          value={sort}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setSort(e.target.value)
          }
        >
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearList}>Clear List</button>
      </div>
    </div>
  );
}
