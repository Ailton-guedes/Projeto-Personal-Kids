import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../fixed/Navbar";

import Login from "../pages/administrator/Login";
import Cadastrodealuno from "../pages/administrator/cadastroaluno";
import User from "../pages/administrator/usuario";

import Error from "../pages/Error";

const Root = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/Login" replace />} />
            
                <Route path="/Login" element={<Login />} />
                <Route path="/usuarios" element={<Navbar><User /></Navbar>} /> 
                <Route path="/cadastro-de-aluno" element={<Navbar><Cadastrodealuno /></Navbar>} />

                <Route path="*" element={<Error />} />
            </Routes>
        </Router>
    );
};

export default Root;