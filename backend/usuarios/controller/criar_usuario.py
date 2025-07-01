from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password
from usuarios.models import Usuario
import json


@csrf_exempt
def criar_usuario(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        usuario = Usuario(
            name=data['name'], 
            cpf=data['cpf'],
            email=data['email'], 
            type='admin',
            password=make_password(data['password'])
        )
        usuario.save()
        return JsonResponse({'id': str(usuario.id), 'name': usuario.name})
    
    return JsonResponse({'error': 'Método não permitido'}, status=405)
