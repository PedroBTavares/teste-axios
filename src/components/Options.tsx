import { useContext, useEffect, useState } from "react";

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
    const [deleteConfirmed, setDeleteConfirmed] = useState<boolean>(false);

    async function deleteProduct(){
        setConfirmBox(<ConfirmBox productName={productName} productId={productId} setDeleteConfirmed={setDeleteConfirmed} />);
    }
    
    async function UpdateProduct(){
        // 

        // getAllProducts();

        setOptions(null);
    }

    useEffect(() => {
        async function fetch() {
            try {
                if(deleteConfirmed){
                    await api.delete(`/products/${productId}`);

                    setDeleteConfirmed(false);
                
                    await getAllProducts();

                    setOptions(null);
                }
            } catch (err) {
                throw new Error(String(err));
            }
        }

        fetch();
    }, [deleteConfirmed])

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