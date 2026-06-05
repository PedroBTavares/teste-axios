import Options from "./Options";

interface Product {
  "id": number;
  "name": string;
  "sale_price": number;
  "purchase_price": number;
  "stock_quantity": number;
}

interface Properties {
    products: Product[];
    setOptions: Function;
    getAllProducts: Function;
}

export default function Table({products, setOptions, getAllProducts}:Properties){
    function exibOptions(e: React.MouseEvent<HTMLTableCellElement>, name:string, id: number){
        const position = e.currentTarget.getBoundingClientRect();
        const y = position?.y as number + window.scrollY;

        setOptions(<Options productName={name} productId={id} setOptions={setOptions} positionY={y} getAllProducts={getAllProducts}/>)
    }
    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Nome</th>
                        <th><abbr title="Preço de venda para o cliente">Preço de venda</abbr></th>
                        <th><abbr title="Preço de compra do fornecedor">Preço de compra</abbr></th>
                        <th>Quantidade em estoque</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => {
                        const {
                            "id": id,
                            "name": name,
                            "sale_price": salePrice,
                            "purchase_price": purchasePrice,
                            "stock_quantity": stockQuantity
                        } = product;
                        
                        return(
                            <tr key={id}>
                                <td>{id}</td>
                                <td>{name}</td>
                                <td>{salePrice}</td>
                                <td>{purchasePrice}</td>
                                <td>{stockQuantity}</td>
                                <td className="clickable" onClick={(e) => exibOptions(e, name, id)}>
                                        ...
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}