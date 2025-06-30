
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password
from usuarios.models import Professor



@csrf_exempt
def listar_professor(request):
    if request.method == 'GET':
        professores = Professor.objects.all()
        
        professores_list = []
        for professor in professores:
            professores_list.append({
                'id': str(professor.id), 
                'name': professor.name,
                'cpf': professor.cpf,
                'type': professor.type,
                'modalidade': professor.type_class,
                'status': professor.status
            })
        return JsonResponse(professores_list, safe=False)
    return JsonResponse({'error': 'Método não permitido'}, status=405)