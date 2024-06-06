const Block = ({
  children,
  rates,
  currency,
  onChangeCurrency,
  onChangePrice,
  price,
  oneToOne,
}) => {
  return (
    <div className="block">
      <h4>{children}</h4>
      <label htmlFor="number-input">{oneToOne}</label>
      <input
        id="number-input"
        type="number"
        value={price}
        onChange={(e) => onChangePrice(e.target.value)}
      />
      <select
        value={currency}
        onChange={(e) => onChangeCurrency(e.target.value)}
      >
        {Object.keys(rates).map((rate, index) => {
          return (
            <option value={rate} key={index}>
              {rate}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Block;
