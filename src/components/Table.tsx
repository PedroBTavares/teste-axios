import Options from "./Options";

import loadingGif from "../assets/loading.gif";

import { productsContext } from "../pages/MyProducts";
import { useContext } from "react";

interface Product {
  "id": number;
  "name": string;
  "sale_price": number;
  "purchase_price": number;
  "stock_quantity": number;
}

export type Load = "loading"|"success"|"erro";

interface Properties {
    products: Product[];
    load: Load;
}

export default function Table({products, load}:Properties){
    const {setOptions} = useContext(productsContext);
    
    function exibOptions(e: React.MouseEvent<HTMLTableCellElement>, name:string, id: number){
        const position = e.currentTarget.getBoundingClientRect();
        const y = position?.y as number + window.scrollY;

        setOptions(<Options productName={name} productId={id} positionY={y} />)
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
                    {load === "loading" ?
                    <tr><td colSpan={6} ><img style={{width: 50}} src={loadingGif} alt="Carregando..." /></td></tr> :
                    products.map((product) => {
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