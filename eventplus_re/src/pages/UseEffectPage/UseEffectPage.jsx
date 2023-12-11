import React, { useEffect, useState } from 'react';

const UseEffectPage = () => {

    const [count, setCount] = useState(2);
    const [calculation, setCalculation] = useState(0);

    useEffect(() => {
        setCalculation(count * 2);
        console.log(`Rodou ${count}`);
    },[count]);


    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count +1)}>+</button>
            <p>Calculation: {calculation}</p>
        </div>
    );
};

export default UseEffectPage;