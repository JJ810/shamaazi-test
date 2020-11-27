import React, { useState } from "react";
import { times } from "lodash";
import "./App.css";

function App() {
  const [value, setValue] = useState<number>();
  const [equalValue, setEqualValue] = useState<number>(0);
  const [oddValue, setOddValue] = useState<number>(0);
  const [evenValue, setEvenValue] = useState<number>(0);
  const [renderTable, setRenderTable] = useState<boolean>();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value) {
      setEqualValue(Math.floor((value / 10) * 100) / 100);
      setEvenValue(Math.floor((value / 15) * 100) / 100);
      setOddValue(Math.floor((value / 15) * 2 * 100) / 100);
      setRenderTable(true);
    }
  };

  const numberFormat = (value: number, currency: string) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(value);

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <label>Input amount: $</label>
        <input
          type="number"
          className="App__input"
          value={value || ""}
          onChange={(e) => {
            setValue(Number(e.target.value))
            setRenderTable(false)
          }}
        />
        <button type="submit">submit</button>
      </form>
      {value && renderTable ? (
        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Split</th>
              {times(10, (i) => (
                <th key={i}>Day {i + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${value}</td>
              <td>equal</td>
              {times(9, (i) => (
                <td key={i}>{numberFormat(equalValue, "USD")}</td>
              ))}
              <td>{numberFormat(value - equalValue * 9, "USD")}</td>
            </tr>
            <tr>
              <td>${value}</td>
              <td>more-odd</td>
              {times(9, (i) => (
                <td key={i}>
                  {numberFormat((i + 1) % 2 ? oddValue : evenValue, "USD")}
                </td>
              ))}
              <td>
                {numberFormat(value - oddValue * 5 - evenValue * 4, "USD")}
              </td>
            </tr>
          </tbody>
        </table>
      ) : null}
    </div>
  );
}

export default App;
