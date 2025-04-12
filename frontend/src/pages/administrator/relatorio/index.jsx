


const Relatorios = () => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center gap-4">
            <h1>Relatórios</h1>
            <p>Relatórios disponíveis para download:</p>
            <ul>
                <li><a href="/relatorios/relatorio1.pdf" download>Relatório 1</a></li>
                <li><a href="/relatorios/relatorio2.pdf" download>Relatório 2</a></li>
                <li><a href="/relatorios/relatorio3.pdf" download>Relatório 3</a></li>
            </ul>
        </div>
    );
}

export default Relatorios;