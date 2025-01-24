import { useContext } from "preact/hooks";
import { Item } from "../types/app";
import { saveExcludedItem, saveHotItem } from "../utils/database";
import { ItemCtx } from "./Main";
function MarketItem({
  item,
  theme,
  withControl,
}: {
  item: Item;
  theme: "hot" | "cold" | "new";
  withControl?: boolean;
}) {
  const { updateItems } = useContext(ItemCtx);

  const handleIncludedClick = (item: Item) => {
    saveHotItem(item);
    updateItems();
  };

  const handleExcludedClick = (item: Item) => {
    saveExcludedItem(item);
    updateItems();
  };

  const bgColor =
    theme === "hot"
      ? "bg-amber-100 hover:bg-amber-50"
      : "bg-sky-50 hover:bg-cyan-50";

  const { title, link, img, desc } = item;
  return (
    <div class={`card rounded-sm transition-colors ${bgColor}`}>
      <div class="flex flex-col">
        <span key={title}>{title}</span>
        {img && img !== "" && (
          <div>
            <a class="flex flex-col" href={link}>
              <img src={img} />
            </a>
          </div>
        )}
        <details class="text-left pt-4 pb-4 whitespace-pre-line">
          {desc}
        </details>
        {withControl && (
          <div class="flex justify-between mt-auto">
            <button
              class="p-2 rounded-md bg-gradient-to-b from-sky-500 from-10% via-sky-500 via-30% to-sky-200 to-90% ..."
              onClick={() => handleExcludedClick(item)}
            >
              Not
            </button>
            <button
              class="p-2 rounded-md bg-gradient-to-t from-orange-500 from-10% via-orange-500 via-30% to-red-600 to-90% ..."
              onClick={() => handleIncludedClick(item)}
            >
              Hot
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MarketItem;
