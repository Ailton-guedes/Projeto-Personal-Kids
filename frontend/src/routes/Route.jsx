{/* Precisamos disso para que ele entenda 
    que estamos usando rotas */}
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

{/* Para incluir novas rotas precisa importar 
    seu nome e o caminho até ela */}
import Login from "../pages/administrator/Login";
import Error from "../pages/Error";
import Cadastrodealuno from "../pages/administrator/cadastrodealuno";
{/* Criada a constante Root para informarmos nossas rotas */}
const Root = () => {
    return (
        <Router>
            <Routes>
                {/* Aqui estamos dizendo que quando o usuário
                acessar a rota inicial,
                ele será redirecionado para a rota de login */}
                <Route path="/" element={<Navigate to="/Login" replace />} />
                
                {/* Para incluir novas rotas, 
                faça assim como a rota login logo abaixo: */}
                <Route path="/Login" element={<Login />} />
               <Route path="/CadastroDeAluno" element={<Cadastrodealuno />} />

                <Route path="*" element={<Error />} />
            </Routes>
        </Router>
    );
};

{/* Exportando para que possa ser usado no Main */}
export default Root;