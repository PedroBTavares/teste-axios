import Header from "../components/Header";

export default function Home(){
    return(
        <div>
            <Header />
            <main>
                <p className="description">
                    <strong>Bem-vindo ao nosso sistema de gerenciamento de produtos!</strong>
                    <br />
                    <br />
                    Aqui você pode <strong>cadastrar</strong>, <strong>organizar</strong> e acompanhar todas as informações essenciais do seu estoque de forma simples e eficiente. Registre nome, preços de compra e venda, e controle as quantidades disponíveis com praticidade.
                    <br />
                    Nosso objetivo é facilitar o dia a dia da gestão, oferecendo uma plataforma intuitiva e confiável para manter seus produtos sempre sob controle.
                </p>
            </main>
        </div>
    )
}