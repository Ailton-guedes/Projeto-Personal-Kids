{/* Import é igual ao link, que usamos no html */}
import './style.css';

{/* Criado uma constante apenas para dar um
     nome para que possemos importar as informações */}
const Login = () => {
    return (
        /* aqui é como se fosse nosso body, 
        dentro dele funciona igual ao HTML, 
        porém é possível usar JavaScrip caso precise também*/
        <div className="container">

            <h1>Comece por aqui!</h1>

        </div>
    );
};

{/* Criado o Export para que possemos 
    exportar a estrutura que criammos */}
export default Login;
