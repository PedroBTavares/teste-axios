import { useState } from "react";

interface Properties {
    setId: Function;
    setName: Function;
}

export default function Search({setId, setName}:Properties){
    const [input, setInput] = useState("");
    
    function submit(column: "id"|"name"){
        if(column === "id"){
            setId(input);
        } else {
            setName(input);
        }
    }
    
    return(
        <form className="form">
            <div className="campo">
                <label htmlFor="id-name">Insira o id ou nome do produto.</label>
                <input type="text" id="id-name" onChange={(e) => setInput(e.target.value)}/>
            </div>
            <button type="button" onClick={() => submit("id")}>procurar por id</button>
            <button type="button" onClick={() => submit("name")}>procurar por nome</button>
        </form>
    );
}