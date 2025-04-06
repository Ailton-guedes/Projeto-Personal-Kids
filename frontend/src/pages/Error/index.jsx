import './style.css';
import { useNavigate } from 'react-router-dom';

const Error = () => {
    const navigate = useNavigate();

    return (
        <div className="errorPage">
            <h1>Erro 404</h1>
            <p>Página não encontrada</p>
            <button className="errorButton" onClick={() => navigate(-1)}>Voltar</button>
        </div>
    );
}

export default Error;