import React, { useState, useRef } from "react";
import api from "../services/api";

export default function Form() {
    const [name, setName] = useState<string|null>(null);
    const [salePrice, setSalePrice] = useState<number|null>(null);
    const [purchasePrice, setPurchasePrice] = useState<number|null>(null);
    const [stockQuantity, setStockQuantity] = useState<number|null>(null);

    const nameRef = useRef<null|HTMLInputElement>(null);
    const salePriceRef = useRef<null|HTMLInputElement>(null);
    const purchasePriceRef = useRef<null|HTMLInputElement>(null);
    const stockQuantityRef = useRef<null|HTMLInputElement>(null);

    function submit(e: React.ChangeEvent<HTMLFormElement>): void {
        e.preventDefault();

        const inputs:HTMLInputElement[] = [
            nameRef.current as HTMLInputElement,
            salePriceRef.current as HTMLInputElement,
            purchasePriceRef.current as HTMLInputElement,
            stockQuantityRef.current as HTMLInputElement,
        ];

        for(const input of inputs){
            if(input.value === ""){
                alert("Preencha todos os campos.");
                input.focus();
                return;
            }
        }

        try {
            api.post("/products",
                {
                    name: name,
                    salePrice: salePrice,
                    purchasePrice: purchasePrice,
                    stockQuantity: stockQuantity,
                }
            )
        } catch (err) {
            throw new Error("" + err);
        }

        setName(null);
        setSalePrice(null);
        setPurchasePrice(null);
        setStockQuantity(null);

        e.target.reset();
    }

    function adjust(input: HTMLInputElement, decimal: number, integer: boolean, setState: Function) {
        let newValue: number;
        if(Number.parseFloat(input.value)){
            newValue = Number.parseFloat(input.value);
        } else {
            newValue = 0;
        }
        

        if (integer && newValue < 0) {
            input.value = "0";
            return;
        }

        newValue = newValue * decimal;
        newValue = Math.round(newValue);
        newValue = newValue / decimal;

        input.value = String(newValue);

        setState(newValue);
    }

    return (
        <form className="form" onSubmit={submit}>

            <div className="campo">
                <label htmlFor="name">Nome do produto:</label>
                <input
                    type="text" id="name" required
                    ref={nameRef}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="campo">
                <label htmlFor="sale-price">Preço de venda do produto para o cliente:</label>
                <input
                    type="number" id="sale-price" min="0.00" step="0.01" required
                    ref={salePriceRef}
                    onBlur={(e) => adjust(e.target, 100, true, setSalePrice)}
                    onChange={(e) => setSalePrice(Number.parseFloat(e.target.value))}
                />
            </div>

            <div className="campo">
                <label htmlFor="purchase-price">Preço de compra do produto do fornecedor:</label>
                <input
                    type="number" id="purchase-price" min="0.00" step="0.01" required
                    ref={purchasePriceRef}
                    onBlur={(e) => adjust(e.target, 100, true, setPurchasePrice)}
                    onChange={(e) => setPurchasePrice(Number.parseFloat(e.target.value))}
                />
            </div>

            <div className="campo">
                <label htmlFor="stock-quantity">Quantidade do produto em estoque:</label>
                <input
                    type="number" id="stock-quantity" step="1" required
                    ref={stockQuantityRef}
                    onBlur={(e) => adjust(e.target, 1, false, setStockQuantity)}
                    onChange={(e) => setStockQuantity(Number.parseInt(e.target.value))}
                />
            </div>

            <button className="clickable" type="submit">enviar</button>
            <button className="clickable" type="reset">limpar</button>

        </form>
    );
}