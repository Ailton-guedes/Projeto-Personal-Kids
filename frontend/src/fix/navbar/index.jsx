import './style.css';

const Login = () => {

    const buttonsArray = [
        { name: 'Dashboard', link: '/dashboard' },
        { name: 'Agenda', link: '/agenda' },
        { name: 'Usuarios', link: '/usuarios' },
        { name: 'Financeiro', link: '/financeiro' },
        { name: 'Relatorios', link: '/relatorios' },
    ];


    return (

        <div className="navbar">
            <div className="buttonsArray">
                {buttonsArray.map((buttons, index) => (
                    <button key={index} className="pageButton">{buttons.name}</button>
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



    );
};


export default Login;
