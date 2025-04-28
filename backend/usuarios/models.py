from django.db import models

# Create your models here.

from mongoengine import Document, StringField, EmailField

class Usuario(Document):
    name = StringField(required=True)
    email = EmailField(required=True, unique=True)
    password = StringField(required=True)
    type = StringField(required=True, choices=['professor', 'aluno', 'responsavel', 'admin'])
    status = StringField(required=True, choices=['ativo', 'desativado'], default = 'ativo')