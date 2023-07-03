import { Pack } from "../types";

export default function Stats({ pack }: { pack: Pack[] }): JSX.Element {
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
