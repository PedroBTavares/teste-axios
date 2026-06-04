interface Properties {
    productName: string;
    setOptions: Function;
}

export default function Options({productName, setOptions}:Properties){
    function deleteProduct(){}
    
    function UpdateProduct(){}

    return(
        <div className="options">
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