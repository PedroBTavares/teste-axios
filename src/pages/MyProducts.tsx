import { useState, useEffect } from "react";

import api from "../services/api.ts";

import Header from "../components/Header";
import Table from "../components/Table";
import Search from "../components/Search";

let productsChange: boolean = false;

async function getProducts(setProducts: Function, column: "id"|"name", search: string) {
    try {
        let response;
        if(column === "id"){
            response = await api.get("/products/" + search);
        } else {
            response = await api.get("/products?search=" + search);
        }

        if(search !== ""){
            productsChange = true;
        } else {
            productsChange = false;
        }

        setProducts(response.data);
    } catch (err: any) {
        if(err.status === 404){
            alert("Produto não encontrado!");
        }
        throw new Error(err);
    }
}

export default function MyProducts(){
    const [products, setProducts] = useState([]);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [options, setOptions] = useState<null|React.ReactElement>(null);

    const getAllProducts = () => getProducts(setProducts, "id", "");

    useEffect(() => {
        async function fetch() {
            await getProducts(setProducts, "id", id);
        }

        try {
            fetch();
        } catch (err) {
            throw new Error(String(err));
        }
    }, [id])

    useEffect(() => {
        async function fetch() {
            await getProducts(setProducts,"name", name);
        }

        try {
            fetch();
        } catch (err) {
            throw new Error(String(err));
        }
    }, [name])

    return(
        <div>
            <Header />
            <main>
                <h2>Meus Produtos</h2>
                <Search setId={setId} setName={setName} />
                {productsChange && <button onClick={getAllProducts}>Mostrar todos os produtos</button>}
                <br />
                <Table products={products} setOptions={setOptions} getAllProducts={getAllProducts} />
                {options}
            </main>
        </div>
    )
}