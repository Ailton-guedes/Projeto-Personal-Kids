import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../fixed/Navbar";
import Error from "../pages/Error";

import Login from "../pages/administrator/Login";

import Dashboard from "../pages/administrator/dashboard";

import Agenda from "../pages/administrator/agenda";

import User from "../pages/administrator/usuarios";
import Cadastroaluno from "../pages/administrator/usuarios/cadastro_aluno";
import Cadastroprofessor from "../pages/administrator/usuarios/cadastro_professor";
import Perfil from "../pages/administrator/usuarios/perfil";

import Financeiro from "../pages/administrator/financeiro";
import Relatorios from "../pages/administrator/relatorio";


const Root = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
            
                <Route path="/login" element={<Login />} />

                <Route path="/dashboard" element={<Navbar><Dashboard /></Navbar>} />

                <Route path="/agenda" element={<Navbar><Agenda /></Navbar>} /> 

                <Route path="/usuarios" element={<Navbar><User /></Navbar>} /> 
                <Route path="/usuarios/cadastro-de-aluno" element={<Navbar><Cadastroaluno /></Navbar>} />
                <Route path="/usuarios/cadastro-de-professor" element={<Navbar><Cadastroprofessor /></Navbar>} />
                <Route path="/usuarios/perfil/:id" element={<Navbar><Perfil /></Navbar>} />

                <Route path="/financeiro" element={<Navbar><Relatorios /></Navbar>} />
                <Route path="/relatorios" element={<Navbar><Financeiro /></Navbar>} />

                <Route path="*" element={<Error />} />
            </Routes>
        </Router>
    );
};

export default Root;