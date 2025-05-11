from django.urls import path

from .views import (
    criar_usuario,
    criar_responsavel,
    criar_aluno,
    criar_professor,
    login_usuario,
    listar_usuario,
    sessao_usuario,
    perfil_usuario,
    editar_usuario
)

urlpatterns = [
    path('criar/', criar_usuario),
    path('criar/responsavel/', criar_responsavel),
    path('criar/aluno/', criar_aluno),
    path('criar/professor/', criar_professor),
    path('login/', login_usuario),
    path('listar/', listar_usuario),
    path('sessao/', sessao_usuario),
    path('perfil/<str:id>/', perfil_usuario),
    path('editar/<str:id>/', editar_usuario),
]