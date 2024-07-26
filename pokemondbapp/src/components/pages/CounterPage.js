import React, { useEffect, useState } from "react";
import "../styleSheets/CounterPageStyles.css";

function CounterPage() {
  const [total, setTotal] = useState(0);

  const increaseTotal = () => {
    setTotal(total + 1);
  };

  return (
    <div className="counterPageContainer">
      <div className="counterContainer">
        <span>{total}</span>
        <div className="counter" onClick={increaseTotal}></div>
      </div>
    </div>
  );
}
export default CounterPage;
