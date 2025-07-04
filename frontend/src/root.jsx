import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./fixed/Navbar";
import Error from "./pages/Error";

import Login from "./pages/administrator/Login";
import RecuperarSenha from "./pages/administrator/login/recuperar_senha";
import CadastroAdmin from "./pages/administrator/login/cadastro_responsavel";


import Dashboard from "./pages/administrator/dashboard";

//import Planos from "./pages/administrator/plano";

import Agenda from "./pages/administrator/agenda";
import CriarAgenda from "./pages/administrator/agenda/criar_agenda";
import IncreverAgenda from "./pages/administrator/agenda/increver_agenda";
import AgendaDia from "./pages/administrator/agenda/agenda_dia";



import User from "./pages/administrator/usuarios";
import Cadastro_responsavel from "./pages/administrator/usuarios/cadastro_responsavel";
import Cadastro_professor from "./pages/administrator/usuarios/cadastro_professor";
import Cadastro_aluno from "./pages/administrator/usuarios/Cadastro_aluno";
import Perfil from "./pages/administrator/usuarios/perfil";


import Financeiro from "./pages/administrator/financeiro";
import Relatorios from "./pages/administrator/relatorio";


const Root = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
            
                <Route path="/login" element={<Login />} />
                <Route path="/recuperar-senha" element={<RecuperarSenha />} />
                <Route path="/cadastro-admin" element={<CadastroAdmin />} />

                <Route path="/dashboard" element={<Navbar><Dashboard /></Navbar>} />

                {/*<Route path="/planos" element={<Navbar><Planos /></Navbar>} />*/}


                <Route path="/agenda" element={<Navbar><Agenda /></Navbar>} /> 
                <Route path="/agenda/criar" element={<Navbar><CriarAgenda/></Navbar>} />
                <Route path="/agenda/increver" element={<Navbar><IncreverAgenda/></Navbar>} />
                <Route path="/agenda/dia/:dateStr" element={<Navbar><AgendaDia/></Navbar>}/>
    

                <Route path="/usuarios" element={<Navbar><User /></Navbar>} /> 
                <Route path="/usuarios/cadastro-de-responsavel" element={<Navbar><Cadastro_responsavel /></Navbar>} />
                <Route path="/usuarios/cadastro-de-professor" element={<Navbar><Cadastro_professor /></Navbar>} />
                <Route path="/usuarios/cadastro-de-aluno" element={<Navbar><Cadastro_aluno /></Navbar>} />
                <Route path="/usuarios/perfil/:id" element={<Navbar><Perfil /></Navbar>} />

                <Route path="/relatorios" element={<Navbar><Relatorios /></Navbar>} />
                <Route path="/financeiro" element={<Navbar><Financeiro /></Navbar>} />

                <Route path="*" element={<Error />} />
            </Routes>
        </Router>
    );
};

export default Root;