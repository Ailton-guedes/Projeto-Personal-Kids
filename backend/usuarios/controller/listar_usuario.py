
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password
from usuarios.models import Usuario



@csrf_exempt
def listar_usuario(request):
    if request.method == 'GET':
        usuarios = Usuario.objects.all()
        usuarios_list = [{'id': str(usuario.id), 'name': usuario.name, 'cpf': usuario.cpf, 'email': usuario.email, 'type': usuario.type, 'status': usuario.status} for usuario in usuarios]
        return JsonResponse(usuarios_list, safe=False)
    return JsonResponse({'error': 'Método não permitido'}, status=405)