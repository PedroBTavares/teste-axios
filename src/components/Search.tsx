import { useState } from "react";

import api from "../services/api.ts";

import Table from "./Table";

export default function Search(props){
    const [input, setInput] = useState("");
    function submit(e: React.ChangeEvent<HTMLFormElement>, column: "id"|"name"){
        e.preventDefault();

        if(column === "id"){
            props.setId(input);
        } else {
            props.setName(input);
        }
    }
    
    return(
        <form className="form" onSubmit={submit}>
            <div className="campo">
                <label htmlFor="id-name">Insira o id ou nome do produto.</label>
                <input type="text" id="id-name" onChange={(e) => setInput(e.target.value)}/>
            </div>
            <button type="submit" onClick={(e) => submit(e, "id")}>procurar por id</button>
            <button type="submit" onClick={(e) => submit(e, "name")}>procurar por nome</button>
        </form>
    );
}