import api from "../services/api.ts";

const response = await api.get("/products/");
const products = response.data;

export default function Table(){
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
                            <tr>
                                <td>{id}</td>
                                <td>{name}</td>
                                <td>{salePrice}</td>
                                <td>{purchasePrice}</td>
                                <td>{stockQuantity}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}