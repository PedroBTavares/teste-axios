import { useContext, type Dispatch, type SetStateAction } from "react";

import { productsContext } from "../pages/MyProducts";

interface Properties {
    productName: string;
    productId: number;
    setDeleteConfirmed: Dispatch<SetStateAction<boolean>>;
}

export default function ConfirmBox({productName, productId, setDeleteConfirmed}:Properties){
    const {setConfirmBox} = useContext(productsContext);

    function confirmDelete(){
        setDeleteConfirmed(true);

        setConfirmBox(null);
    }

    return(
        <div className="confirm-box">
            <h3>
                Tem certeza que deseja <strong>EXCLUIR</strong>
                <br />
                o produto {productName}
                <br />
                de id {productId}?
            </h3>

            <button className="clickable" onClick={confirmDelete}>excluir</button>
            <button className="clickable" onClick={() => setConfirmBox(null)}>cancelar</button>
        </div>
    )
}