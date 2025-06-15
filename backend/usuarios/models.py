from django.db import models

# Create your models here.

from mongoengine import Document, DateTimeField, StringField, EmailField, ListField, ReferenceField, DecimalField, DateField, IntField
from datetime import date

class Usuario(Document):
    meta = {'allow_inheritance': True}
    name = StringField(required=True)
    cpf = StringField(required=True, unique=True)
    email = EmailField(required=True, unique=True)
    password = StringField(required=True)
    type = StringField(required=True, choices=['professor', 'aluno', 'responsavel', 'admin'])
    status = StringField(required=True, choices=['ativo', 'desativado'], default = 'ativo')


class Responsavel(Usuario):
    dependentes = ListField(ReferenceField('Aluno'), default=list)
 

class Aluno(Usuario):
    id_responsavel = ReferenceField(Responsavel)

class Professor(Usuario):
    type_class = ListField(StringField(choices=['natacao', 'artistica', 'funcional', 'psicomotricidade']), default=list)
    id_agendas_regular = ListField(ReferenceField('AgendaRegular'), default=list)


class Plano(Document):
    name = StringField(required=True, unique=True)  
    tipo = StringField(required=True, choices=['mensal', 'trimestral', 'semestral', 'anual'])
    valor = DecimalField(required=True, precision=2)
    duracao_meses = IntField(required=True)
    dia_vencimento = IntField(required=True, min_value=1, max_value=31)
    descricao = StringField() 

class InscricaoPlano(Document):
    id_aluno = ReferenceField(Aluno, required=True)
    id_responsavel = ReferenceField(Responsavel, required=True)
    plano = ReferenceField('Plano', required=True)
    data_inicio = DateField(required=True, default=date.today)
    data_fim = DateField(required=True)
    status_pagamento = StringField(required=True, choices=['pago', 'pendente', 'cancelado'], default='pendente')


class AgendaRegular(Document):
    id_professor = ReferenceField(Professor, required=True)
    modalidade = StringField(required=True, choices=['natacao', 'artistica', 'funcional', 'psicomotricidade'])
    day_week = StringField(required=True, choices=[
        'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'
    ])
    start_time = DateTimeField(required=True)
    end_time = DateTimeField(required=True)  
    max_alunos = IntField(required=True, default=10)
    status = StringField(required=True, choices=['ativa', 'cancelada', 'cheia'], default='ativa')
    
class OcorrenciaAula(Document):
    agenda_regular = ReferenceField(AgendaRegular, required=True)
    data_aula = DateField(required=True) 
    id_professor = ReferenceField(Professor, required=True) 
    modalidade = StringField(required=True, choices=['natacao', 'artistica', 'funcional', 'psicomotricidade'])
    start_time = DateTimeField(required=True)
    end_time = DateTimeField(required=True)
    status_ocorrencia = StringField(required=True, choices=['agendada', 'realizada', 'cancelada'], default='agendada')

class ParticipacaoAula(Document):
    ocorrencia_aula = ReferenceField(OcorrenciaAula, required=True)
    aluno = ReferenceField(Aluno, required=True)
    presenca = StringField(required=True, choices=['presente', 'ausente', 'pendente'], default='pendente')
    status_reposicao = StringField(required=True, choices=['elegivel', 'reposicao_marcada', 'reposicao_concluida', 'nao_repor', 'nao_elegivel'], default='nao_elegivel')
    feedback = StringField()
    
class InscricaoAulaRegular(Document):
    aluno = ReferenceField(Aluno, required=True)
    agenda_regular = ReferenceField(AgendaRegular, required=True)
    data_inscricao = DateField(required=True, default=date.today)
    status_inscricao = StringField(required=True, choices=['ativa', 'inativa'], default='ativa')

class AulaRepor(Document):
    id_professor = ReferenceField(Professor, required=True)
    modalidade = StringField(required=True, choices=['natacao', 'artistica', 'funcional', 'psicomotricidade'])
    data_aula = DateField(required=True)
    start_time = DateTimeField(required=True)
    end_time = DateTimeField(required=True)
    max_alunos = IntField(required=True, default=5)
    alunos_inscritos = ListField(ReferenceField(Aluno), default=list) 
    status = StringField(required=True, choices=['aberta', 'fechada', 'cancelada'], default='aberta')

class ReposicaoSolicitada(Document):
    aluno = ReferenceField(Aluno, required=True)
    participacao_original = ReferenceField(ParticipacaoAula, required=True) 
    data_solicitacao = DateField(required=True, default=date.today)
    aula_reposicao_marcada = ReferenceField(AulaRepor) 
    status_solicitacao = StringField(required=True, choices=['pendente', 'marcada', 'concluida', 'cancelada'], default='pendente')
    data_reposicao_concluida = DateField() 
