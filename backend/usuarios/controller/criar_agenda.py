
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password
from usuarios.models import Usuario
import json
from usuarios.models import Professor, Aluno, Agenda

@csrf_exempt
def criar_agenda(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        professor = Professor.objects.filter(id=data['id_professor']).first()
        if not professor:
            return JsonResponse({'error': 'Professor não encontrado'}, status=400)
        
        agenda = Agenda(
            id_professor=professor,
            day_week=data['day_week'],
            start_time=data['start_time'],
            end_time=data['end_time'],
            list_alunos=[Aluno.objects.filter(id=aluno_id).first() for aluno_id in data.get('list_alunos', [])],
            status=data.get('status', 'ativo')
        )
        agenda.save()
        return JsonResponse({'id': str(agenda.id), 'day_week': agenda.day_week})

    return JsonResponse({'error': 'Método não permitido'}, status=405)
