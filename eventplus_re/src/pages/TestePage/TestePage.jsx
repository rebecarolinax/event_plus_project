import React, { useState } from 'react';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Title from '../../components/Title/Title';

const TestePage = () => {
    const [n1, setN1] = useState(0);
    const [n2, setN2] = useState(0);
    const [total, setTotal] = useState();

    function handleCalcular(e) {
        e.preventDefault();
        setTotal(parseFloat(n1) + parseFloat(n2));
    }

    return (
        <div>
            <Title titleText="Testpage (Pagina de POCs)" marginTop='margin_top'/>
            <h2>Calculator</h2>

            <form onSubmit={handleCalcular}>
                <Input 
                    type="number"
                    placeholder="Primeiro número"
                    name="numero1"
                    id="n1"
                    value={n1}
                    onChange={(e) => {setN1(e.target.value)}}
                />
                <br />
                <Input 
                    type="number"
                    placeholder="Segundo número"
                    name="numero2"
                    id="n2"
                    value={n2}
                    onChange={(e) => {setN2(e.target.value)}}
                />
                <br />
                <Button 
                    textButton="Calcular"
                    type="Submit"
                />

                <span>Resultado: <strong>{total}</strong></span>
            </form>

            {/* <p>VALOR DE N1: {n1}</p>
            <p>VALOR DE N2: {n2}</p> */}
        </div>
    );
};

export default TestePage;