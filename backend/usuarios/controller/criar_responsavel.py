
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password
from usuarios.models import Usuario
from usuarios.models import Responsavel, Aluno
import json

@csrf_exempt
def criar_responsavel(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        responsavel = Responsavel(
            name=data['name'],
            cpf=data['cpf'],
            email=data['email'],
            type='responsavel',
            password=make_password(data['password'])
        )
        responsavel.save()

        for aluno_id in data.get('dependentes', []):
            aluno = Aluno.objects.filter(id=aluno_id).first()
            if aluno:
                responsavel.dependentes.append(aluno)
        
        responsavel.save()

        return JsonResponse({'id': str(responsavel.id), 'name': responsavel.name})

    return JsonResponse({'error': 'Método não permitido'}, status=405)