CREATE DATABASE `dataPersonalKids`;
USE `dataPersonalKids`;
-- --------------------------------------------------------------
-- --------------------------------------------------------------
-- --------------------------------------------------------------
CREATE TABLE administrador (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    status ENUM('ativo', 'inativo') DEFAULT 'ativo' NOT NULL
);

CREATE TABLE aluno (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    nome_responsavel VARCHAR(255) NOT NULL,
    telefone_responsavel VARCHAR(15) NOT NULL,
    email_responsavel VARCHAR(255) NOT NULL,
    status ENUM('ativo', 'inativo') DEFAULT 'ativo' NOT NULL
);

CREATE TABLE modalidade (
    id INT PRIMARY KEY AUTO_INCREMENT,
    categoria VARCHAR(100) NOT NULL,
    descricao TEXT
);

CREATE TABLE vinculo_aluno_modalidade (
    id_aluno INT,
    id_modalidade INT,
    PRIMARY KEY (id_aluno, id_modalidade),
    FOREIGN KEY (id_aluno) REFERENCES aluno(id),
    FOREIGN KEY (id_modalidade) REFERENCES modalidade(id)
);

CREATE TABLE professor (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) NOT NULL,
    e_mail VARCHAR(255) NOT NULL,
    telefone VARCHAR(15) NOT NULL,
    status ENUM('ativo', 'inativo') DEFAULT 'ativo' NOT NULL
);

CREATE TABLE vinculo_professor_modalidade (
    id_professor INT,
    id_modalidade INT,
    PRIMARY KEY (id_professor, id_modalidade),
    FOREIGN KEY (id_professor) REFERENCES professor(id),
    FOREIGN KEY (id_modalidade) REFERENCES modalidade(id)
);

CREATE TABLE agenda (
    id INT PRIMARY KEY AUTO_INCREMENT,
    data_hora DATETIME NOT NULL
);

CREATE TABLE define (
    id_aluno INT,
    id_agenda INT,
    PRIMARY KEY (id_aluno, id_agenda),
    FOREIGN KEY (id_aluno) REFERENCES aluno(id),
    FOREIGN KEY (id_agenda) REFERENCES agenda(id)
);

CREATE TABLE possui (
    id_professor INT,
    id_agenda INT,
    PRIMARY KEY (id_professor, id_agenda),
    FOREIGN KEY (id_professor) REFERENCES professor(id),
    FOREIGN KEY (id_agenda) REFERENCES agenda(id)
);

CREATE TABLE compoe (
    id_modalidade INT,
    id_agenda INT,
    PRIMARY KEY (id_modalidade, id_agenda),
    FOREIGN KEY (id_modalidade) REFERENCES modalidade(id),
    FOREIGN KEY (id_agenda) REFERENCES agenda(id)
);

