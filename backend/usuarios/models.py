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
    id_agendas = ListField(ReferenceField('Agenda'), default=list)
    id_plano = ReferenceField('Plano')

class Professor(Usuario):
    type_class = ListField(StringField(choices=['natacao', 'artistica', 'funcional', 'psicomotricidade']), default=list)
    id_agendas = ListField(ReferenceField('Agenda'), default=list)


class Agenda(Document):
    id_professor = ReferenceField(Professor)
    day_week = StringField(required=True, choices=[
        'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'
    ])
    start_time = DateTimeField(required=True) 
    end_time = DateTimeField(required=True)    
    list_alunos = ListField(ReferenceField(Aluno), default=list)
    status = StringField(required=True, choices=['ativo', 'cancelada', 'cheia'], default = 'ativo')

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