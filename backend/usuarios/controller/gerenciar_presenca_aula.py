from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from usuarios.models import OcorrenciaAula, ParticipacaoAula, Professor 
from mongoengine.queryset.visitor import Q 
from mongoengine.errors import DoesNotExist, ValidationError 

@csrf_exempt
def gerenciar_presenca_aula(request, ocorrencia_aula_id=None):

    if not ocorrencia_aula_id:
        return JsonResponse({'error': 'ID da ocorrência da aula é obrigatório na URL.'}, status=400)

    try:
        ocorrencia_aula = OcorrenciaAula.objects.get(id=ocorrencia_aula_id)
    except DoesNotExist: 
        return JsonResponse({'error': 'Ocorrência da aula não encontrada.'}, status=404)
    except ValidationError: 
        return JsonResponse({'error': 'ID da ocorrência da aula inválido.'}, status=400)


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
            'professor_id': str(ocorrencia_aula.id_professor.id), 
            'professor_nome': ocorrencia_aula.id_professor.name,
            'status_ocorrencia': ocorrencia_aula.status_ocorrencia,
            'lista_chamada': lista_chamada
        }, status=200)

    # --- PUT / PATCH Request ---
    elif request.method == 'PUT' or request.method == 'PATCH':
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'JSON inválido no corpo da requisição.'}, status=400)

        ocorrencia_aula_update = data.get('ocorrencia_aula_update', {})
        participacao_updates = data.get('participacao_updates', [])

        overall_results = {'ocorrencia_aula': {}, 'participacao_updates': []}
        
        if ocorrencia_aula_update:
            new_modalidade = ocorrencia_aula_update.get('modalidade')
            new_status_ocorrencia = ocorrencia_aula_update.get('status_ocorrencia') 

            has_ocorrencia_aula_changes = False

            if new_modalidade and new_modalidade != ocorrencia_aula.modalidade:
                has_ocorrencia_aula_changes = True
                if ocorrencia_aula.status_ocorrencia == 'realizada':
                    overall_results['ocorrencia_aula']['modalidade_error'] = 'Não é possível alterar a modalidade de uma aula já realizada.'
                else:
                    professor = ocorrencia_aula.id_professor 
                    if new_modalidade not in professor.type_class:
                        overall_results['ocorrencia_aula']['modalidade_error'] = f'Professor {professor.name} não está qualificado para a modalidade "{new_modalidade}".'
                    else:
                        ocorrencia_aula.modalidade = new_modalidade
                        overall_results['ocorrencia_aula']['nova_modalidade'] = ocorrencia_aula.modalidade

            if new_status_ocorrencia and new_status_ocorrencia != ocorrencia_aula.status_ocorrencia:
                has_ocorrencia_aula_changes = True
                valid_statuses = ['agendada', 'realizada', 'cancelada']
                if new_status_ocorrencia not in valid_statuses:
                    overall_results['ocorrencia_aula']['status_error'] = f'Status da ocorrência inválido: "{new_status_ocorrencia}". Opções válidas: {", ".join(valid_statuses)}.'
                else:
                    ocorrencia_aula.status_ocorrencia = new_status_ocorrencia
                    overall_results['ocorrencia_aula']['novo_status_ocorrencia'] = ocorrencia_aula.status_ocorrencia

            if has_ocorrencia_aula_changes and not ('modalidade_error' in overall_results['ocorrencia_aula'] or 'status_error' in overall_results['ocorrencia_aula']):
                try:
                    ocorrencia_aula.save()
                    overall_results['ocorrencia_aula']['status'] = 'sucesso'
                except ValidationError as e:
                    overall_results['ocorrencia_aula']['status'] = 'erro'
                    overall_results['ocorrencia_aula']['message'] = f'Erro de validação ao atualizar a ocorrência da aula: {e}'
                except Exception as e:
                    overall_results['ocorrencia_aula']['status'] = 'erro'
                    overall_results['ocorrencia_aula']['message'] = f'Erro inesperado ao atualizar a ocorrência da aula: {e}'
            elif has_ocorrencia_aula_changes: 
                 overall_results['ocorrencia_aula']['status'] = 'erro'
                 if not overall_results['ocorrencia_aula'].get('message'): 
                     overall_results['ocorrencia_aula']['message'] = 'Não foi possível atualizar a ocorrência da aula devido a erros de validação.'


        if participacao_updates:
            for item in participacao_updates:
                participacao_id = item.get('participacao_id')
                nova_presenca = item.get('presenca')
                novo_feedback = item.get('feedback')

                if not participacao_id:
                    overall_results['participacao_updates'].append({'error': 'participacao_id é obrigatório para cada atualização de participação.'})
                    continue
                
                try:
                    participacao = ParticipacaoAula.objects.get(id=participacao_id, ocorrencia_aula=ocorrencia_aula)
                except DoesNotExist:
                    overall_results['participacao_updates'].append({'error': f'Participação com ID {participacao_id} não encontrada para esta aula.'})
                    continue
                except ValidationError: 
                    overall_results['participacao_updates'].append({'error': f'ID de participação {participacao_id} inválido.'})
                    continue

                if nova_presenca in ['presente', 'ausente', 'pendente']:
                    participacao.presenca = nova_presenca
                    if nova_presenca == 'ausente' and participacao.status_reposicao == 'nao_elegivel':
                        participacao.status_reposicao = 'elegivel'
                    elif nova_presenca == 'presente' and (participacao.status_reposicao == 'elegivel' or participacao.status_reposicao == 'reposicao_marcada'):
                        participacao.status_reposicao = 'nao_elegivel'
                
                if novo_feedback == "": 
                    participacao.feedback = None
                elif novo_feedback is not None: 
                    participacao.feedback = novo_feedback

                try:
                    participacao.save()
                    overall_results['participacao_updates'].append({
                        'participacao_id': str(participacao.id),
                        'aluno_nome': participacao.aluno.name,
                        'status': 'sucesso',
                        'nova_presenca': participacao.presenca,
                        'novo_status_reposicao': participacao.status_reposicao,
                        'novo_feedback': participacao.feedback
                    })
                except Exception as e:
                    overall_results['participacao_updates'].append({'participacao_id': str(participacao.id), 'status': 'erro', 'message': str(e)})
            
        return JsonResponse({'message': 'Atualização concluída.', 'results': overall_results}, status=200)

    return JsonResponse({'error': 'Método não permitido.'}, status=405)