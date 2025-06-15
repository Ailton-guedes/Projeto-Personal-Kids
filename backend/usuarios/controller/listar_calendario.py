# usuarios/controller/painel_admin.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from usuarios.models import OcorrenciaAula, ParticipacaoAula
from datetime import datetime, date, timedelta
from collections import defaultdict

def get_week_bounds(target_date):
    start_of_week = target_date - timedelta(days=target_date.weekday())
    end_of_week = start_of_week + timedelta(days=6)
    return start_of_week, end_of_week

@csrf_exempt
def listar_calendario(request):
    if request.method == 'GET':
        hoje = date.today()

        start_prev_week, end_prev_week = get_week_bounds(hoje - timedelta(weeks=1))
        start_curr_week, end_curr_week = get_week_bounds(hoje)
        start_next_week, end_next_week = get_week_bounds(hoje + timedelta(weeks=1))

        full_start_date = start_prev_week
        full_end_date = end_next_week

        ocorrencias = OcorrenciaAula.objects(
            data_aula__gte=full_start_date,
            data_aula__lte=full_end_date,
            status_ocorrencia__in=['agendada', 'realizada']
        ).only('id', 'data_aula')

        ocorrencias_map = {str(o.id): o for o in ocorrencias}
        ocorrencia_ids = list(ocorrencias_map.keys())

        participacoes = ParticipacaoAula.objects(
            ocorrencia_aula__in=ocorrencia_ids
        ).only('ocorrencia_aula', 'presenca')


        daily_summary = defaultdict(lambda: {
            'date': None,
            'alunos': 0,
            'presentes': 0,
            'ausentes': 0,
        })
        
        for p in participacoes:
            ocorrencia_aula = ocorrencias_map.get(str(p.ocorrencia_aula.id))
            if ocorrencia_aula:
                data_str_full = ocorrencia_aula.data_aula.strftime('%Y-%m-%d')
                data_str_display = ocorrencia_aula.data_aula.strftime('%d/%m')
                
                daily_summary[data_str_full]['alunos'] += 1
                daily_summary[data_str_full]['date'] = data_str_display

                if p.presenca == 'presente':
                    daily_summary[data_str_full]['presentes'] += 1
                elif p.presenca == 'ausente':
                    daily_summary[data_str_full]['ausentes'] += 1

        response_data = {
            'titulo_painel': 'Painel Administrativo Geral de Aulas', 
            'semana_anterior': [],
            'semana_atual': [],
            'proxima_semana': []
        }

        def populate_week_data(start_date, end_date, target_list):
            current_date = start_date
            while current_date <= end_date:
                data_str_full = current_date.strftime('%Y-%m-%d')
                summary = daily_summary[data_str_full] 
                
                if not summary['date']:
                    summary['date'] = current_date.strftime('%d/%m')

                target_list.append({
                    'date': summary['date'],
                    'alunos': summary['alunos'],
                    'presentes': summary['presentes'],
                    'ausentes': summary['ausentes'],
                })
                current_date += timedelta(days=1)

        populate_week_data(start_prev_week, end_prev_week, response_data['semana_anterior'])
        populate_week_data(start_curr_week, end_curr_week, response_data['semana_atual'])
        populate_week_data(start_next_week, end_next_week, response_data['proxima_semana'])

        return JsonResponse(response_data, status=200)

    return JsonResponse({'error': 'Método não permitido.'}, status=405)