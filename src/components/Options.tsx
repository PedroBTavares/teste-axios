import { useContext } from "react";

import api from "../services/api";

import { productsContext } from "../pages/MyProducts";

import ConfirmBox from "./ConfirmBox";

interface Properties {
    productName: string;
    productId: number;
    positionY: number|undefined;
}

export default function Options({productName, productId, positionY}:Properties){
    const {getAllProducts, setOptions, setConfirmBox} = useContext(productsContext);
    async function deleteProduct(){
        setConfirmBox(<ConfirmBox productName={productName} productId={productId} />);

        await api.delete(`/products/${productId}`); 

        getAllProducts();

        setOptions(null);
    }
    
    async function UpdateProduct(){
        // 

        // getAllProducts();

        setOptions(null);
    }

    return(
        <div
            className="options"
            style={{
                position: "absolute",
                top: positionY
            }}
        >
            <header>
                <h3>Produto: {productName}</h3>
                <hr />
            </header>
            <br />
            <ul>
                <li className="clickable" onClick={deleteProduct}>Excluir</li>
                <li className="clickable" onClick={UpdateProduct}>Editar</li>
                <li className="clickable" onClick={() => setOptions(null)}>Fechar</li>
            </ul>
        </div>
    )
}