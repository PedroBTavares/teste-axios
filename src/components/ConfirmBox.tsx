import { useContext } from "react";

import { productsContext } from "../pages/MyProducts";

interface Properties {
    productName: string;
    productId: number;
}

export default function ConfirmBox({productName, productId}:Properties){
    const {setConfirmBox} = useContext(productsContext);

    return(
        <div className="confirm-box">
            <h3>
                Tem certeza que deseja <strong>DELETAR</strong>
                <br />
                o produto {productName}
                <br />
                de id {productId}?
            </h3>

            <button>deletar</button>
            <button onClick={() => setConfirmBox(null)}>cancelar</button>
        </div>
    )
}