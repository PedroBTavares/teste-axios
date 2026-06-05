import api from "../services/api";

interface Properties {
    productName: string;
    productId: number;
    setOptions: Function;
    positionY: number|undefined;
    getAllProducts: Function;
}

export default function Options({productName, productId, setOptions, positionY, getAllProducts}:Properties){
    async function deleteProduct(){
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