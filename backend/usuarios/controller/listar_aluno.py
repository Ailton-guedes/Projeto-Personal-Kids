
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password
from usuarios.models import Aluno



@csrf_exempt
def listar_aluno(request):
    if request.method == 'GET':
        alunos = Aluno.objects.all()
        
        alunos_list = []
        for aluno in alunos:
            alunos_list.append({
                'id': str(aluno.id), 
                'name': aluno.name,
                'cpf': aluno.cpf,
                'type': aluno.type,
                'status': aluno.status
            })
        return JsonResponse(alunos_list, safe=False)
    return JsonResponse({'error': 'Método não permitido'}, status=405)