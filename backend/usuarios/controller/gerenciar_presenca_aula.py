from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from usuarios.models import OcorrenciaAula, ParticipacaoAula, Professor 
from mongoengine.queryset.visitor import Q 

@csrf_exempt
def gerenciar_presenca_aula(request, ocorrencia_aula_id=None):

    if not ocorrencia_aula_id:
        return JsonResponse({'error': 'ID da ocorrência da aula é obrigatório na URL.'}, status=400)

    try:
        ocorrencia_aula = OcorrenciaAula.objects.get(id=ocorrencia_aula_id)
    except OcorrenciaAula.DoesNotExist:
        return JsonResponse({'error': 'Ocorrência da aula não encontrada.'}, status=404)

    if request.method == 'GET':
        participacoes = ParticipacaoAula.objects(ocorrencia_aula=ocorrencia_aula).order_by('aluno.name')

        lista_chamada = []
        for p in participacoes:
            lista_chamada.append({
                'participacao_id': str(p.id),
                'aluno_id': str(p.aluno.id),
                'aluno_nome': p.aluno.name,
                'presenca': p.presenca,
                'status_reposicao': p.status_reposicao,
                'feedback': p.feedback if p.feedback else None 
            })
        
        return JsonResponse({
            'ocorrencia_aula_id': str(ocorrencia_aula.id),
            'data_aula': ocorrencia_aula.data_aula.strftime('%Y-%m-%d'),
            'modalidade': ocorrencia_aula.modalidade,
            'professor_nome': ocorrencia_aula.id_professor.name,
            'lista_chamada': lista_chamada
        }, status=200)

    elif request.method == 'PUT' or request.method == 'PATCH':
        data = json.loads(request.body)
        updates = data.get('updates', [])

        if not updates:
            return JsonResponse({'error': 'Nenhum dado de atualização fornecido.'}, status=400)

        results = []
        for item in updates:
            participacao_id = item.get('participacao_id')
            nova_presenca = item.get('presenca')
            novo_feedback = item.get('feedback')

            if not participacao_id:
                results.append({'error': 'participacao_id é obrigatório para cada atualização.'})
                continue
            
            try:
                participacao = ParticipacaoAula.objects.get(id=participacao_id, ocorrencia_aula=ocorrencia_aula)
            except ParticipacaoAula.DoesNotExist:
                results.append({'error': f'Participação com ID {participacao_id} não encontrada para esta aula.'})
                continue

            if nova_presenca in ['presente', 'ausente']:
                participacao.presenca = nova_presenca
                if nova_presenca == 'ausente' and participacao.status_reposicao == 'nao_elegivel':
                    participacao.status_reposicao = 'elegivel'
                elif nova_presenca == 'presente' and (participacao.status_reposicao == 'elegivel' or participacao.status_reposicao == 'reposicao_marcada'):
                    participacao.status_reposicao = 'nao_elegivel'
                
                participacao.feedback = novo_feedback

            try:
                participacao.save()
                results.append({
                    'participacao_id': str(participacao.id),
                    'aluno_nome': participacao.aluno.name,
                    'status': 'sucesso',
                    'nova_presenca': participacao.presenca,
                    'novo_status_reposicao': participacao.status_reposicao,
                    'novo_feedback': participacao.feedback
                })
            except Exception as e:
                results.append({'participacao_id': str(participacao.id), 'status': 'erro', 'message': str(e)})
        
        return JsonResponse({'message': 'Atualização de presença e feedback concluída.', 'results': results}, status=200)

    return JsonResponse({'error': 'Método não permitido.'}, status=405)

# Lembre-se de adicionar este endpoint ao seu urls.py:
# from usuarios.controller.gerenciar_chamada_aula import gerenciar_chamada_aula
# path('chamada/<str:ocorrencia_aula_id>/', gerenciar_chamada_aula, name='gerenciar_chamada_aula'),