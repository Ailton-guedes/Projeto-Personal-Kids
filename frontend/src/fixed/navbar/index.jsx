import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../../service/UserContext'; 

const Navbar = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser(); // acessa os dados do usuário logado

  const buttonsArray = [
    { name: 'Dashboard', link: '/dashboard' },
    { name: 'Agenda', link: '/agenda' },
    { name: 'Usuarios', link: '/usuarios' },
    { name: 'Relatorios', link: '/relatorios' },
    { name: 'Financeiro', link: '/financeiro' },
  ];

  return (
    <>
      <nav
        className="d-flex justify-content-between align-items-center px-4 flex-wrap position-fixed w-100"
        style={{
          backgroundColor: '#F8CDE2',
          height: 'auto',
          paddingTop: '10px',
          paddingBottom: '10px',
          top: 0,
          zIndex: 1000
        }}
      >
        <div className="d-flex align-items-center gap-2 w-50">
          {buttonsArray.map((button, index) => {
            const isActive = location.pathname === button.link;

            return (
              <button
                key={index}
                className="btn"
                style={{
                  backgroundColor: isActive ? '#4B9CD3' : '#FBA981',
                  borderRadius: '8px',
                  width: 'auto',
                  height: '40px',
                  color: isActive ? '#ffffff' : '#000000'
                }}
                onClick={() => navigate(button.link)}
                onMouseOver={(e) =>
                  e.currentTarget.style.backgroundColor = isActive ? '#4B9CD3' : '#accded'
                }
                onMouseOut={(e) =>
                  e.currentTarget.style.backgroundColor = isActive ? '#4B9CD3' : '#FBA981'
                }
              >
                {button.name}
              </button>
            );
          })}
        </div>

        <div className="d-none d-md-flex align-items-center gap-3 w-auto justify-content-end">
          <div className="d-flex align-items-center gap-2">
            <span className="fw-medium">{user?.type === 'admin' ? 'Administrador(a),' : 'Usuário(a),'}</span>
            <span className="fw-bold">{user?.name || '...'}</span>
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
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
        </div>
      </nav>

      <main style={{ marginTop: '10vh' }}>
        {children}
      </main>
    </>
  );
};

export default Navbar;
