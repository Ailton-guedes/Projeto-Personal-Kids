import './style.css';

const CadastroDeAluno = () => {
    return (
        <div className="container">
            <h1>Cadastro de Alunos</h1>
            <form action="/processar_cadastro" method="post">
                <label htmlFor="nome">Nome Completo</label>
                <input type="text" id="nome" name="nome" required />
                <br /><br />

                <label htmlFor="cpf_aluno">CPF do Aluno</label>
                <input type="text" id="cpf_aluno" name="cpf_aluno" required />
                <br /><br />

                <div className="half-fields">
                    <div>
                        <label htmlFor="data_nascimento">Data de Nascimento</label>
                        <input type="date" id="data_nascimento" name="data_nascimento" required />
                    </div>

                    <div>
                        <label htmlFor="cep">CEP</label>
                        <input type="text" id="cep" name="cep" required />
                    </div>
                </div>

                <br /><br />

                <label htmlFor="nome_responsavel">Nome do Responsável</label>
                <input type="text" id="nome_responsavel" name="nome_responsavel" required />
                <br /><br />

                <div className="half-fields">
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required />
                    </div>

                    <div>
                        <label htmlFor="telefone">Telefone</label>
                        <input type="text" id="telefone" name="telefone" required />
                    </div>

                    <div>
                        <label htmlFor="cpf_responsavel">CPF do Responsável</label>
                        <input type="text" id="cpf_responsavel" name="cpf_responsavel" required />
                    </div>
                </div>

                <br /><br />

                <label htmlFor="endereco">Endereço</label>
                <input type="text" id="endereco" name="endereco" required />
                <br /><br />

                <label htmlFor="plano">Plano</label>
                <select id="plano" name="plano" required>
                    <option value="mensal">Mensal</option>
                    <option value="trimestral">Trimestral</option>
                    <option value="semestral">Semestral</option>
                </select>
                <br /><br />

                <label htmlFor="termos">Aceito os termos e condições</label>
                <input type="checkbox" id="termos" name="termos" required />
                <br /><br />

                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
};

export default CadastroDeAluno;
