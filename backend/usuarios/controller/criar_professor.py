
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password
from usuarios.models import Usuario
import json
from usuarios.models import Professor

@csrf_exempt
def criar_professor(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        professor = Professor(
            name=data['name'],
            cpf=data['cpf'],
            email=data['email'],
            type='professor',
            password=make_password(data['password']),
            type_class=data.get('type_class', []),
        )
        professor.save()
        return JsonResponse({'id': str(professor.id), 'name': professor.name})

    return JsonResponse({'error': 'Método não permitido'}, status=405)
