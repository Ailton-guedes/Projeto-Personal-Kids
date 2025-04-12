import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';
import './style.css'; 

const Error = () => {
    const navigate = useNavigate();

    return (
        <Container
            fluid
            className="d-flex flex-column justify-content-center align-items-center text-white"
            style={{
                backgroundColor: '#FF2727',
                width: '100vw',
                height: '100vh',
                gap: '20px',
                fontSize: 'large',
            }}
        >
            <FaExclamationTriangle className="floating-icon" size={60} color="#fff" />
            <h1>Erro 404</h1>
            <p>Página não encontrada</p>
            <Button
                style={{
                    backgroundColor: '#007AFF',
                    borderRadius: '8px',
                    border: 'none',
                    width: '200px',
                    height: '50px',
                    fontSize: '30px',
                }}
                onClick={() => navigate(-1)}
            >
                Voltar
            </Button>
        </Container>
    );
};

export default Error;