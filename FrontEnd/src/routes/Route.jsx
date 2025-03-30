{/* Precisamos disso para que ele entenda 
    que estamos usando rotas */}
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

{/* Para incluir novas rotas precisa importar 
    seu nome e o caminho até ela */}
import Login from "../pages/adminitrator/login";
import Relatorios from "../pages/adminitrator/relatorios";


{/* Criada a constante Root para informarmos nossas rotas */}
const Root = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/Login" replace />} />
                
                {/* Para incluir novas rotas, 
                faça assim como a rota login logo abaixo: */}
                <Route path="/Login" element={<Login />} />

                <Route path="/relatorios" element={<Relatorios />} />
                
            </Routes>
        </Router>
    );
};

{/* Exportando para que possa ser usado no Main */}
export default Root;