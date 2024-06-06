import { useRef, useState } from "react";
import Block from "./components/Block";
import SwitchButton from "./components/SwitchButton";
import { useEffect } from "react";

function App() {
  const url = "https://www.cbr-xml-daily.ru/latest.js";

  const ratesRef = useRef({});

  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("RUB");
  const [fromPrice, setFromPrice] = useState(1);
  const [toPrice, setToPrice] = useState(0);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        ratesRef.current = { ...json.rates, RUB: 1 };
        onChangeFromPrice(1);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);

  useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency]);

  const onChangeFromPrice = (price) => {
    const result = +(
      (price / ratesRef.current[fromCurrency]) *
      ratesRef.current[toCurrency]
    ).toFixed(3);
    //Pprevents error
    setToPrice(isNaN(result) ? 0 : result);
    setFromPrice(price);
  };

  const onChangeToPrice = (price) => {
    const result = +(
      (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) *
      price
    ).toFixed(3);
    //Prevents error
    setFromPrice(isNaN(result) ? 0 : result);
    setToPrice(price);
  };

  const oneToOneFrom = () => {
    return `1 ${fromCurrency} = ${(
      (1 / ratesRef.current[fromCurrency]) *
      ratesRef.current[toCurrency]
    ).toFixed(3)} ${toCurrency}`;
  };

  const oneToOneTo = () => {
    return `1 ${toCurrency} = ${(
      (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) *
      1
    ).toFixed(3)} ${fromCurrency}`;
  };

  const handleClickSwitchButton = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromPrice(toPrice);
    setToPrice(fromPrice);
  };

  return (
    <div className="App">
      <h2>Currency converter</h2>
      <div className="container">
        <Block
          oneToOne={oneToOneFrom()}
          price={fromPrice}
          currency={fromCurrency}
          rates={ratesRef.current}
          onChangeCurrency={setFromCurrency}
          onChangePrice={onChangeFromPrice}
        >
          From
        </Block>
        <SwitchButton onClickSwitchButton={handleClickSwitchButton} />
        <Block
          oneToOne={oneToOneTo()}
          price={toPrice}
          currency={toCurrency}
          rates={ratesRef.current}
          onChangeCurrency={setToCurrency}
          onChangePrice={onChangeToPrice}
        >
          To
        </Block>
      </div>
    </div>
  );
}

export default App;
