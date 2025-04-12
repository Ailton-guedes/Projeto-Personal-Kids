{/* Criado uma constante apenas para dar um
     nome para que possemos importar as informações */}
const Dashboard = () => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center gap-4">
            <h1>Dashboard</h1>
            <p>Bem-vindo(a) ao painel de controle!</p>
            <p>Aqui você pode visualizar as informações importantes.</p>
            <p>Em breve, mais funcionalidades estarão disponíveis.</p>
        </div>
    );

};

{/* Criado o Export para que possemos 
    exportar a estrutura que criammos */}
export default Dashboard;