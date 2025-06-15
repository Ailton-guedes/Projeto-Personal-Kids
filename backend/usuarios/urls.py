from django.urls import path

from .views import (
    criar_usuario,
    criar_responsavel,
    criar_aluno,
    criar_plano,
    criar_professor,
    criar_agenda_regular,
    
    inscrever_aluno_plano,
    inscrever_aluno_agenda,
    
    gerenciar_presenca_aula,
    
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
    
    path('criar/plano/', criar_plano),
    path('inscrever/plano/', inscrever_aluno_plano),
    
    path('criar/agenda/', criar_agenda_regular),
    path('inscrever/agenda/', inscrever_aluno_agenda),
    
    path('gerenciar/presenca/<str:ocorrencia_aula_id>/', gerenciar_presenca_aula),
    
    path('login/', login_usuario),
    
    path('listar/', listar_usuario),
    
    path('sessao/', sessao_usuario),
    
    path('perfil/<str:id>/', perfil_usuario),
    path('editar/<str:id>/', editar_usuario),
]