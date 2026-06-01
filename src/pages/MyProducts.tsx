import Header from "../components/Header";
import Table from "../components/Table";

export default function MyProducts(){
    return(
        <div>
            <Header className="header" />
            <main>
                <h2>Meus Produtos</h2>
                <Table />
            </main>
        </div>
    )
}