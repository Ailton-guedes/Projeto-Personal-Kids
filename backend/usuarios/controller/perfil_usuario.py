
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password
from usuarios.models import Usuario


@csrf_exempt
def perfil_usuario(request, id):
    if request.method == 'GET':
        try:
            usuario = Usuario.objects.get(id=id)
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