
import './style.css';

const CadastroDeAluno = () => {
    return (
        <div className="container">
            <h1>Cadastro de Alunos</h1>
            <form action="/processar_cadastro" method="post">
                <label htmlFor="nome">Nome Completo</label>
                <input type="text" id="nome" name="nome" required />
                <br /><br />

                <label htmlFor="data_nascimento">Data de Nascimento</label>
                <input type="date" id="data_nascimento" name="data_nascimento" required />
                <br /><br />

                <label htmlFor="nome_responsavel">Nome do Responsável</label>
                <input type="text" id="nome_responsavel" name="nome_responsavel" required />
                <br /><br />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
                <br /><br />

                <label htmlFor="endereco">Endereço</label>
                <input type="text" id="endereco" name="endereco" required />
                <br /><br />

                <label htmlFor="telefone">Telefone</label>
                <input type="text" id="telefone" name="telefone" required />
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
