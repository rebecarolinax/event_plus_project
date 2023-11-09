import React, { useState, useEffect } from "react";

const TestePage = () => {
  const [count, setCount] = useState(10);
  const [calculation, setCalculation] = useState(10);

  useEffect(() => {
    setCalculation(() => count * 2);
  }, [count]);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
      <p>Calculation: {calculation}</p>
    </div>
  );
};

export default TestePage;
