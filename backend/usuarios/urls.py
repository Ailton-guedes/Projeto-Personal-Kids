from django.urls import path

from .views import (
    criar_usuario,
    criar_responsavel,
    criar_aluno,
    criar_plano,
    inscricao_plano,
    criar_professor,
    criar_agenda,
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
    path('criar/plano/', criar_plano),
    path('inscricao/plano/', inscricao_plano),
    path('criar/professor/', criar_professor),
    path('criar/agenda/', criar_agenda),
    path('login/', login_usuario),
    path('listar/', listar_usuario),
    path('sessao/', sessao_usuario),
    path('perfil/<str:id>/', perfil_usuario),
    path('editar/<str:id>/', editar_usuario),
]