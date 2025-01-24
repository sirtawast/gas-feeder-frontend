import "../App.css";
import MarketItem from "./MarketItem";
import { useContext } from "preact/hooks";
import { ItemCtx } from "./Main";

function MarketItems() {
  const {freeItems, includedItems, excludedItems} = useContext(ItemCtx);
  
  return (
    <>
    <h1>G.A.S Feeder 2000👩‍🎤</h1>
    <hr class="mb-4" />
    {includedItems.value.length > 0 && (
        <section>
          <h2>Hot 🔥</h2>
          <div class="market-items grid sm:grid-cols-2 md:grid-cols-6 justify-items-stretch gap-4">
            {includedItems.value.map((item) => (
              <MarketItem key={item.id} item={item} theme="hot" />
            ))}
          </div>
        <hr class="m-10 opacity-25" />
        </section>
    )}
        <section>
          <h2>New ♻️</h2>
          <div class="market-items grid sm:grid-cols-2 md:grid-cols-6 justify-items-stretch gap-4">
            {freeItems.value.map((item) => (
              <MarketItem key={item.id} item={item} withControl theme="new" />
            ))}
          </div>
        </section>

        {excludedItems.value.length > 0 && (

        <section>
        <hr class="m-10 opacity-25" />

          <h2>Not 🚫</h2>
          <div class="market-items grid sm:grid-cols-2 md:grid-cols-6 justify-items-stretch gap-4">
            {excludedItems.value.map((item) => (
              <MarketItem key={item.id} item={item} theme="cold" />
            ))}
          </div>
        </section>)}
        <button onClick={() => window.localStorage.clear()}>Clear</button>
    </>
  );
}

export default MarketItems;
