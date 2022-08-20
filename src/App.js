import { getConfig } from "@testing-library/react";
import { useEffect, useState } from "react";
import MultiselectCheckbox from "./MultiSelectCheckbox";
function App() {
  const options = [
    { label: "Item One" },
    { label: "Item Two" },
    { label: "Item Three" },
    { label: "Item Four" },
  ];
  const [isPressed, setIsPressed] = useState(false);
  const [bitcoinPrice, setBitcoinPrice] = useState([]);
  const getBitcoin = async () => {
    try {
      const call = await fetch(
        "https://api.coinbase.com/v2/prices/BTC-USD/buy",
        {
          method: "GET",
          authorization:
            "Bearer abd90df5f27a7b170cd775abf89d632b350b7c1c9d53e08b340cd9832ce52c2c",
        }
      );
      const response = await call.json();

      return await response;
    } catch {
      return [];
    }
  };

  const setAmount = async () => {
    const data = await getBitcoin();

    if (!data) return;

    console.log(data);
    // {"data":{"base":"BTC","currency":"USD","amount":"19891.09"}}

    const {
      data: { amount },
    } = data;

    // New amount is pushed in front of the old amounts that have been deconstructed.
    // We then slice the array at 2 so we get rid of any old data we don't want to use anymore
    const newPrices = [amount, ...bitcoinPrice].slice(2);
    console.log("new peice", newPrices);
    setBitcoinPrice(newPrices);
  };

  useEffect(() => {
    console.log("here is bitcoin price", bitcoinPrice);
  }, [bitcoinPrice]);

  return (
    <div>
      {/* <MultiselectCheckbox
        options={options}
        onChange={(data) => {
          console.log(data);
        }}
      /> */}
      <button
        onClick={() => {
          setIsPressed(!isPressed);
          setAmount();
        }}
      >
        {isPressed ? "refresh Bitcoin price" : "get Bitcoin price"}
      </button>
      <div>
        <div>
          {bitcoinPrice.map((value, i) => (
            <div key={i}>
              {i === 0 ? "Current price: " : "Previous price: "}{" "}
              <h1>{value.amount}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
