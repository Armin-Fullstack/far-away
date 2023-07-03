export default function PackingItem({
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
