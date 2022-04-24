import { useState } from "react";

type ListProps = {
  initialItems: string[];
};

function List({ initialItems }: ListProps) {
  const [newItem, setNewItem] = useState("");
  const [list, setList] = useState(initialItems);

  function addToList() {
    setTimeout(() => setList((state) => [...state, newItem]), 500);
  }

  function removeFromList(itemToBeRemoved: string) {
    setTimeout(
      () =>
        setList((state) => state.filter((item) => item !== itemToBeRemoved)),
      500
    );
  }

  return (
    <div>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Novo item"
      />
      <button onClick={addToList}>Adicionar</button>
      <ul>
        {list.map((item) => (
          <li key={item}>
            {item}
            <button onClick={() => removeFromList(item)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;