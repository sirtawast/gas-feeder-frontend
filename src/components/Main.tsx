import { createContext } from "preact";
import "../App.css";
import { computed, ReadonlySignal, signal, } from "@preact/signals";
import { Item, Items } from "../types/app";
import { getExcludedItems, getHotItems } from "../utils/database";
import { useQuery$ } from "@preact-signals/query";
import MarketItems from "./MarketItems";

export const ItemCtx = createContext<ItemCtxType>({
  freeItems: signal<Items>([]),
  includedItems: signal<Item[]>([]),
  excludedItems: signal<Item[]>([]),
  updateItems: () => {},
});

interface ItemCtxType  {
    freeItems: ReadonlySignal<Items>;
    includedItems: ReadonlySignal<Items>;
    excludedItems: ReadonlySignal<Items>;
    updateItems: () => void
}

export const populateContext = ():ItemCtxType => {
  const items = signal<Items>([]);
  const hotItems = signal<Item[]>(getHotItems());
  const notItems = signal<Item[]>(getExcludedItems());

  const updateItems = () => {
    hotItems.value = getHotItems();
    notItems.value = getExcludedItems();
  }

  const fetchItems = async (): Promise<Items> => {
    const data = await fetch("/results.json");
    const json = await data.json();
    items.value = json;
    return json;
  };

  const {} = useQuery$<Items>(() => ({
    queryKey: ["items"],
    queryFn: () => fetchItems(),
  }));

  const includedItems = computed(() =>
    items.value.filter((item) =>
      hotItems.value.find((hotItem) => hotItem.id === item.id)
    )
  );

  const excludedItems = computed(() =>
    items.value.filter((item) =>
      notItems.value.find((hotItem) => hotItem.id === item.id)
    )
  );

  const freeItems = computed(() =>
    items.value.filter(
      (item) =>
        !hotItems.value.find((hotItem) => hotItem.id === item.id) &&
        !notItems.value.find((excludedItem) => excludedItem.id === item.id)
    )
  );

  return { 
    freeItems, 
    includedItems, 
    excludedItems,
    updateItems
  }
};

function Main() {
  return (
    <>
      <ItemCtx.Provider value={populateContext()}>
        <MarketItems />
      </ItemCtx.Provider>
    </>
  );
}

export default Main;
