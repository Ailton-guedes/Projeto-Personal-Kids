from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from usuarios.models import AgendaRegular

@csrf_exempt
def listar_agenda_semana(request):
    if request.method == 'GET':
        try:
            agendas = AgendaRegular.objects.all()
            
            agenda_list = []
            for agenda in agendas:
                professor_name = None
                professor_id_str = None 

                if agenda.id_professor:
                    professor_name = agenda.id_professor.name 
                    professor_id_str = str(agenda.id_professor.id)

                agenda_data = {
                    'id_agenda': str(agenda.id), 
                    'modalidade': agenda.modalidade,
                    'dia_semana': agenda.day_week,
                    'hora_inicio': agenda.start_time.isoformat() if agenda.start_time else None,
                    'hora_fim': agenda.end_time.isoformat() if agenda.end_time else None,
                    'max_aluno': agenda.max_alunos,
                    'status': agenda.status,
                    'id_professor': professor_id_str,
                    'nome_professor': professor_name 
                }
                
                agenda_list.append(agenda_data)
            
            return JsonResponse(agenda_list, safe=False, status=200)
                
        except Exception as e:
            print(f"Error ao listar agenda semanal: {e}")
            return JsonResponse({'error': f'Ocorreu um erro interno ao listar agenda: {e}'}, status=500)
    
    return JsonResponse({'error': 'Metodo não permitido'}, status=405)