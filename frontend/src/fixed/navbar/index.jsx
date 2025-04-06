import './style.css';
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
            <div className="navbar">
                <div className="buttonsArray">
                    {buttonsArray.map((button, index) => (
                        <button
                            key={index}
                            className="pageButton"
                            onClick={() => navigate(button.link)}
                        >
                            {button.name}
                        </button>
                    ))}
                </div>

                <div className="perfil">
                    <div className="info">
                        <div className="role">Administrador(a),</div>
                        <div className="name">...</div>
                    </div>
                    <div className="self">img</div>
                </div>
            </div>

            <main>
                {children}
            </main>
        </>
    );
};

export default Navbar;
