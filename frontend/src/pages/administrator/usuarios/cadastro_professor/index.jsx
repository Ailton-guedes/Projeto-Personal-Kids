const CadastroProfessor = () => {
    return (
        <div className="container">
            <h1 className="text-center text-dark mt-2">Cadastro de Professor</h1>
            <form
                className="p-3 rounded shadow-sm"
                style={{
                    backgroundColor: '#f3b9e3',
                    maxWidth: '800px',
                    margin: '10px auto',
                    fontFamily: 'Arial, Helvetica, sans-serif'
                }}
            >
                <div className="mb-2">
                    <label htmlFor="nome" className="form-label" style={{ fontSize: '16px' }}>Nome Completo</label>
                    <input type="text" id="nome" name="nome" className="form-control py-1" required />
                </div>

                {/* Email e Telefone lado a lado */}
                <div className="row mb-2">
                    <div className="col-md-6">
                        <label htmlFor="email" className="form-label" style={{ fontSize: '16px' }}>Email</label>
                        <input type="email" id="email" name="email" className="form-control py-1" required />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="telefone" className="form-label" style={{ fontSize: '16px' }}>Telefone</label>
                        <input type="text" id="telefone" name="telefone" className="form-control py-1" required />
                    </div>
                </div>

                {/* CPF */}
                <div className="mb-2 text-center">
                    <label htmlFor="cpf" className="form-label" style={{  fontSize: '16px' }}>CPF</label>
                    <input type="text" id="cpf" name="cpf" className="form-control py-1 w-50 mx-auto" required />
                </div>
 
                <div className="text-center">
                    <button
                        type="submit"
                        className="btn"
                        style={{
                            backgroundColor: 'rgb(9, 1, 166)',
                            color: 'rgb(221, 214, 238)',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            fontSize: '16px',
                            width: '25%',
                        }}
                    >
                        Cadastrar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CadastroProfessor;
