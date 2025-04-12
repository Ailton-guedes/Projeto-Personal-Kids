




const CadastroDeAluno = () => {
    return (
        <div className="container">
            <h1 className="text-center text-dark mt-2">Cadastro de Alunos</h1>
            <form
                action="/processar_cadastro"
                method="post"
                className="p-3 rounded shadow-sm"
                style={{ backgroundColor: '#f3b9e3', maxWidth: '800px', margin: '10px auto', fontFamily: 'Arial, Helvetica, sans-serif' }}
            >
                <div className="mb-2">
                    <label htmlFor="nome" className="form-label" style={{ fontSize: '16px' }}>Nome Completo</label>
                    <input type="text" id="nome" name="nome" className="form-control py-1" required />
                </div>

                <div className="mb-2">
                    <label htmlFor="cpf_aluno" className="form-label" style={{ fontSize: '16px' }}>CPF do Aluno</label>
                    <input type="text" id="cpf_aluno" name="cpf_aluno" className="form-control py-1" required />
                </div>

                <div className="row mb-2">
                    <div className="col-md-6">
                        <label htmlFor="data_nascimento" className="form-label" style={{ fontSize: '16px' }}>Data de Nascimento</label>
                        <input type="date" id="data_nascimento" name="data_nascimento" className="form-control py-1" required />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="cep" className="form-label" style={{ fontSize: '16px' }}>CEP</label>
                        <input type="text" id="cep" name="cep" className="form-control py-1" required />
                    </div>
                </div>

                <div className="mb-2">
                    <label htmlFor="nome_responsavel" className="form-label" style={{ fontSize: '16px' }}>Nome do Responsável</label>
                    <input type="text" id="nome_responsavel" name="nome_responsavel" className="form-control py-1" required />
                </div>

                <div className="row mb-2">
                    <div className="col-md-4">
                        <label htmlFor="email" className="form-label" style={{ fontSize: '16px' }}>Email</label>
                        <input type="email" id="email" name="email" className="form-control py-1" required />
                    </div>

                    <div className="col-md-4">
                        <label htmlFor="telefone" className="form-label" style={{ fontSize: '16px' }}>Telefone</label>
                        <input type="text" id="telefone" name="telefone" className="form-control py-1" required />
                    </div>

                    <div className="col-md-4">
                        <label htmlFor="cpf_responsavel" className="form-label" style={{ fontSize: '16px' }}>CPF do Responsável</label>
                        <input type="text" id="cpf_responsavel" name="cpf_responsavel" className="form-control py-1" required />
                    </div>
                </div>

                <div className="mb-2">
                    <label htmlFor="endereco" className="form-label" style={{ fontSize: '16px' }}>Endereço</label>
                    <input type="text" id="endereco" name="endereco" className="form-control py-1" required />
                </div>

                <div className="mb-2">
                    <label htmlFor="plano" className="form-label" style={{ fontSize: '16px' }}>Plano</label>
                    <select id="plano" name="plano" className="form-select py-1" required>
                        <option value="mensal">Mensal</option>
                        <option value="trimestral">Trimestral</option>
                        <option value="semestral">Semestral</option>
                    </select>
                </div>

                <div className="form-check mb-3">
                    <input type="checkbox" id="termos" name="termos" className="form-check-input" required />
                    <label htmlFor="termos" className="form-check-label" style={{ fontSize: '16px' }}>
                        Aceito os termos e condições
                    </label>
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
                            width: '50%',
                        }}
                    >
                        Cadastrar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CadastroDeAluno;