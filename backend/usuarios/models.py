from django.db import models

# Create your models here.

from mongoengine import Document, DateTimeField, StringField, EmailField, ListField

class Usuario(Document):
    name = StringField(required=True)
    email = EmailField(required=True, unique=True)
    password = StringField(required=True)
    type = StringField(required=True, choices=['professor', 'aluno', 'responsavel', 'admin'])
    status = StringField(required=True, choices=['ativo', 'desativado'], default = 'ativo')

class Agenda(Document):
    id_professor = StringField(required=True)
    day_week = StringField(required=True, choices=[
        'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'
    ])
    start_time = DateTimeField(required=True) 
    end_time = DateTimeField(required=True)    
    registered_students = ListField(StringField())
    status = StringField(required=True, choices=['ativo', 'desativado'], default = 'ativo')

    meta = {
        'collection': 'horarios_disponiveis'
    }

