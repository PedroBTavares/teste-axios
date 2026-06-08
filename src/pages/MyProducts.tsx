import { useState, useEffect, createContext, type SetStateAction, type Dispatch, type Context } from "react";

import type { Load } from "../components/Table";

import api from "../services/api.ts";

import Header from "../components/Header";
import Table from "../components/Table";
import Search from "../components/Search";

let productsChange: boolean = false;

interface ProductsContext {
    setOptions: Dispatch<SetStateAction<null|React.ReactElement>>;
    setConfirmBox: Dispatch<SetStateAction<null|React.ReactElement>>;
    getAllProducts: Function;
}

let productsContext: Context<ProductsContext>;

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
    const [load, setLoad] = useState<Load>("loading");
    const [options, setOptions] = useState<null|React.ReactElement>(null);
    const [confirmBox, setConfirmBox] = useState<null|React.ReactElement>(null);
    
    const getAllProducts = async () => {
        try {
            setLoad("loading");
            await getProducts(setProducts, "id", "");
            setLoad("success");
        } catch (err) {
            throw new Error(String(err));
        }
    }
    
        useEffect(() => {
            async function fetch() {
                try {
                    setLoad("loading");
                    await getProducts(setProducts, "id", id);
                    setLoad("success");
                } catch (err) {
                    setLoad("erro");
                    throw new Error(String(err));
                }
            }
    
            fetch();
        }, [id])
    
        useEffect(() => {
            async function fetch() {
                try {
                    setLoad("loading");
                    await getProducts(setProducts, "name", name);
                    setLoad("success");
                } catch (err) {
                    setLoad("erro");
                    throw new Error(String(err));
                }
            }
    
            fetch();
        }, [name])

    productsContext = createContext<ProductsContext>({setOptions, setConfirmBox, getAllProducts});

    return(
        <div>
            <Header />
            <main>
                <h2>Meus Produtos</h2>
                <Search setId={setId} setName={setName} />
                {productsChange && <button onClick={getAllProducts}>Mostrar todos os produtos</button>}
                <br />
                <Table products={products} load={load} />
                {options}{confirmBox}
            </main>
        </div>
    )
}

export { productsContext };