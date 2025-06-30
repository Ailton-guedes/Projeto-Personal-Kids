from django.urls import path

from .views import (
    login_usuario,
    sessao_usuario,
    
    criar_usuario,
    perfil_usuario,
    listar_usuario,
    editar_usuario,
    
    criar_professor,
    listar_professor,
    
    criar_responsavel,
    
    criar_aluno,
    listar_aluno,
    
    criar_plano,
    listar_planos,
    inscrever_aluno_plano,
    
    criar_agenda_regular,
    inscrever_aluno_agenda,
    gerenciar_presenca_aula,
    
    listar_calendario,
    listar_agenda_dia,
    listar_agenda_semana
)

urlpatterns = [
    path('login/', login_usuario),
    path('sessao/', sessao_usuario),
    
    path('criar/', criar_usuario),
    path('perfil/<str:id>/', perfil_usuario),
    path('listar/usuarios/', listar_usuario),
    path('editar/<str:id>/', editar_usuario),
    
    path('criar/professor/', criar_professor),
    path('listar/professor/', listar_professor),
    
    path('criar/responsavel/', criar_responsavel),
    
    path('criar/aluno/', criar_aluno),
    path('listar/aluno/', listar_aluno),
    
    path('criar/plano/', criar_plano),
    path('listar/plano/', listar_planos),
    path('inscrever/plano/', inscrever_aluno_plano),
    
    path('criar/agenda/', criar_agenda_regular),
    path('inscrever/agenda/', inscrever_aluno_agenda),
    path('gerenciar/presenca/<str:ocorrencia_aula_id>/', gerenciar_presenca_aula),
    
    path('listar/calendario/', listar_calendario),
    path('listar/agenda/semana/', listar_agenda_semana),
    path('listar/agenda/dia/<str:date_str>/', listar_agenda_dia)   
]