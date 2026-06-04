import { Link } from "react-router";

export default function Header(){
    return(
        <header className="header">
            <h1>Gerenciamento de produtos</h1>
            <Link className="link" to="/">Home</Link>
            <Link className="link" to="/Registration">Cadastro</Link>
            <Link className="link" to="/MyProducts">Meus produtos</Link>
        </header>
    );
}