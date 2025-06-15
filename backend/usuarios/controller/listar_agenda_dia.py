from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from usuarios.models import OcorrenciaAula, ParticipacaoAula, Professor, Aluno
from datetime import datetime, date

@csrf_exempt
def listar_agenda_dia(request, data_str=None):
    if request.method == 'GET':
        if not data_str:
            return JsonResponse({'error': 'A data é obrigatória na URL (formato YYYY-MM-DD).'}, status=400)

        try:
            target_date = datetime.strptime(data_str, '%Y-%m-%d').date()
        except ValueError:
            return JsonResponse({'error': 'Formato de data inválido. Use YYYY-MM-DD.'}, status=400)

        ocorrencias_do_dia = OcorrenciaAula.objects(
            data_aula=target_date,
            status_ocorrencia__in=['agendada', 'realizada']
        ).order_by('start_time')

        if not ocorrencias_do_dia:
            return JsonResponse({'message': f'Nenhuma aula encontrada para o dia {data_str}.', 'aulas': []}, status=200)

        aulas_detalhadas = []
        for ocorrencia in ocorrencias_do_dia:
            participacoes = ParticipacaoAula.objects(ocorrencia_aula=ocorrencia)

            total_alunos_programados = 0
            alunos_na_aula = [] 

            for p in participacoes:
                total_alunos_programados += 1
                
                aluno_nome = "Aluno Desconhecido"
                if p.aluno:
                    try:
                        aluno_obj = Aluno.objects.get(id=p.aluno.id)
                        aluno_nome = aluno_obj.name
                    except Aluno.DoesNotExist:
                        pass
                
                alunos_na_aula.append({
                    'id': str(p.aluno.id),
                    'nome': aluno_nome,   
                    'presenca': p.presenca,
                    'status_reposicao': p.status_reposicao, 
                    'feedback': p.feedback if p.feedback else None 
                })
            
            professor_nome = "Desconhecido"
            if ocorrencia.id_professor:
                try:
                    professor_obj = Professor.objects.get(id=ocorrencia.id_professor.id)
                    professor_nome = professor_obj.name
                except Professor.DoesNotExist:
                    pass

            aulas_detalhadas.append({
                'id_aula': str(ocorrencia.id),
                'professor': professor_nome,
                'modalidade': ocorrencia.modalidade,
                'hora_inicio': ocorrencia.start_time.strftime('%H:%M'),
                'hora_fim': ocorrencia.end_time.strftime('%H:%M'),
                'status_ocorrencia': ocorrencia.status_ocorrencia,
                'resumo_alunos': { 
                    'programados': total_alunos_programados,
                },
                'alunos_na_aula': alunos_na_aula
            })
        
        return JsonResponse({
            'date': target_date.strftime('%Y-%m-%d'),
            'aulas': aulas_detalhadas
        }, status=200)

    return JsonResponse({'error': 'Método não permitido'}, status=405)