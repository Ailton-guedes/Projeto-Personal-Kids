import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../fixed/Navbar";

import Login from "../pages/administrator/Login";

import Agenda from "../pages/administrator/agenda";

import User from "../pages/administrator/usuarios";
import Cadastroaluno from "../pages/administrator/cadastroaluno";
import Cadastroprofessor from "../pages/administrator/cadastroprofessor";

import Relatorios from "../pages/administrator/relatorio";

import Error from "../pages/Error";

const Root = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
            
                <Route path="/login" element={<Login />} />

                <Route path="/agenda" element={<Navbar><Agenda /></Navbar>} /> 

                <Route path="/usuarios" element={<Navbar><User /></Navbar>} /> 
                <Route path="/usuarios/cadastro-de-aluno" element={<Navbar><Cadastroaluno /></Navbar>} />
                <Route path="/usuarios/cadastro-de-professor" element={<Navbar><Cadastroprofessor /></Navbar>} />

                <Route path="/relatorios" element={<Navbar><Relatorios /></Navbar>} />



                <Route path="*" element={<Error />} />
            </Routes>
        </Router>
    );
};

export default Root;