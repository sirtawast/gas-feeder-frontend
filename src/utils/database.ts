import { LocalKey, LocalStorage } from "ts-localstorage";
import { Item } from "../types/app";

type QueryList = string[];

const keys = {
  queries: new LocalKey<QueryList>("queries", []),
  hotItems: new LocalKey<Item[]>("hotItems", []),
  excludedItems: new LocalKey<Item[]>("excludedItems", []),
};

export const getQueryLists = (): QueryList =>
  LocalStorage.getItem(keys.queries) || [];

export const saveQueryList = (query: string): void => {
  const queries = getQueryLists();
  if (queries.includes(query)) return;
  queries.push(query);
  LocalStorage.setItem(keys.queries, queries);
  console.log(getQueryLists());
};

export const getHotItems = (): Item[] =>
  LocalStorage.getItem(keys.hotItems) || [];

export const saveHotItem = (item: Item): void => {
  const items = getHotItems();
  if (items.find((i) => i.id === item.id)) return;
  items.push(item);
  LocalStorage.setItem(keys.hotItems, items);
  console.log(getHotItems());
};

export const getExcludedItems = (): Item[] =>
    LocalStorage.getItem(keys.excludedItems) || [];
  
  export const saveExcludedItem = (item: Item): void => {
    const items = getExcludedItems();
    if (items.find((i) => i.id === item.id)) return;
    items.push(item);
    LocalStorage.setItem(keys.excludedItems, items);
    console.log(getExcludedItems());
  };