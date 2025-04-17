from django.db import models

# Create your models here.

from mongoengine import Document, StringField, EmailField

class Usuario(Document):
    name = StringField(required=True)
    email = EmailField(required=True, unique=True)
    type = StringField(required=True, choices=['personal', 'aluno', 'admin'])
    password = StringField(required=True)