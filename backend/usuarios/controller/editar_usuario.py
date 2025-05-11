from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password
from usuarios.models import Usuario
import json


@csrf_exempt
def editar_usuario(request, id):
    if request.method == 'PATCH':  
        try:
            usuario = Usuario.objects.get(id=id)

            data = json.loads(request.body)

            if 'name' in data:
                usuario.name = data['name']
            if 'email' in data:
                usuario.email = data['email']
            if 'type' in data:
                usuario.type = data['type']
            if 'status' in data:
                usuario.status = data['status']
            if 'password' in data:
                usuario.password = make_password(data['password'])

            usuario.save()

            return JsonResponse({
                'id': str(usuario.id),
                'name': usuario.name,
                'email': usuario.email,
                'type': usuario.type,
                'status': usuario.status
            })
        
        except Usuario.DoesNotExist:
            return JsonResponse({'error': 'Usuário não encontrado'}, status=404)

    return JsonResponse({'error': 'Método não permitido'}, status=405)