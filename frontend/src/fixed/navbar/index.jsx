import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ children }) => {
    const navigate = useNavigate();

    const buttonsArray = [
        { name: 'Dashboard', link: '/dashboard' },
        { name: 'Agenda', link: '/agenda' },
        { name: 'Usuarios', link: '/usuarios' },
        { name: 'Financeiro', link: '/financeiro' },
        { name: 'Relatorios', link: '/relatorios' },
    ];

    return (
        <>
            {/* Navbar fixada no topo */}
            <nav
                className="d-flex justify-content-between align-items-center px-4 flex-wrap position-fixed w-100"
                style={{ 
                    backgroundColor: '#F8CDE2', 
                    height: 'auto', 
                    paddingTop: '10px', 
                    paddingBottom: '10px', 
                    top: 0, // Fixa a navbar no topo
                    zIndex: 1000 // Garante que a navbar fique acima de outros elementos
                }}
            >
                {/* Botões alinhados à esquerda */}
                <div className="d-flex align-items-center gap-2 w-50">
                    {buttonsArray.map((button, index) => (
                        <button
                            key={index}
                            className="btn"
                            style={{
                                backgroundColor: '#FBA981',
                                borderRadius: '8px',
                                width: 'auto',  // Remover largura fixa
                                height: '40px', // Manter altura consistente
                            }}
                            onClick={() => navigate(button.link)}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#accded'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FBA981'}
                        >
                            {button.name}
                        </button>
                    ))}
                </div>

                {/* Perfil visível apenas em telas médias e maiores */}
                <div className="d-none d-md-flex align-items-center gap-3 w-50 justify-content-end">
                    <div className="d-flex align-items-center gap-2">
                        <span className="fw-medium">Administrador(a),</span>
                        <span className="fw-bold">...</span>
                    </div>
                    <div
                        className="d-flex justify-content-center align-items-center"
                        style={{
                            backgroundColor: '#007AFF',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            color: '#fff',
                            fontWeight: 'bold',
                        }}
                    >
                        img
                    </div>
                </div>
            </nav>

            {/* Conteúdo abaixo da navbar */}
            <main style={{ marginTop: '10vh' }}>{children}</main> {/* Ajuste o espaçamento superior para não sobrepor o conteúdo */}
        </>
    );
};

export default Navbar;
