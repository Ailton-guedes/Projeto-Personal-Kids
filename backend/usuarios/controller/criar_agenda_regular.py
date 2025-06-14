from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from usuarios.models import Professor, AgendaRegular 
from datetime import date

@csrf_exempt
def criar_agenda_regular(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        try:
            professor = Professor.objects.get(id=data['id_professor']) 
        except Professor.DoesNotExist:
            return JsonResponse({'error': 'Professor não encontrado'}, status=400)

        if 'modalidade' not in data or data['modalidade'] not in ['natacao', 'artistica', 'funcional', 'psicomotricidade']:
            return JsonResponse({'error': 'Modalidade inválida ou não fornecida'}, status=400)
        
        if data['modalidade'] not in professor.type_class:
            return JsonResponse({'error': f'Professor não habilitado para a modalidade {data["modalidade"]}'}, status=400)

        try:
            from datetime import datetime
            start_time_dt = datetime.strptime(data['start_time'], '%H:%M').time() 
            end_time_dt = datetime.strptime(data['end_time'], '%H:%M').time()     
            
            today_date = date.today()
            start_datetime_full = datetime.combine(today_date, start_time_dt)
            end_datetime_full = datetime.combine(today_date, end_time_dt)

        except ValueError:
            return JsonResponse({'error': 'Formato de hora inválido. Use HH:MM:SS'}, status=400)


        agenda_regular = AgendaRegular(
            id_professor=professor,
            modalidade=data['modalidade'],
            day_week=data['day_week'],
            start_time=start_datetime_full, 
            end_time=end_datetime_full,     
            max_alunos=data.get('max_alunos', 10),
            status=data.get('status', 'ativa')
        )
        agenda_regular.save()

        professor.id_agendas_regular.append(agenda_regular)
        professor.save()

        return JsonResponse({
            'id': str(agenda_regular.id),
            'day_week': agenda_regular.day_week,
            'modalidade': agenda_regular.modalidade,
            'start_time': agenda_regular.start_time.strftime('%H:%M'), 
            'end_time': agenda_regular.end_time.strftime('%H:%M')     
        }, status=201) 

    return JsonResponse({'error': 'Método não permitido'}, status=405)