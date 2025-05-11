
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from usuarios.models import Usuario


@csrf_exempt
def sessao_usuario(request):
    usuario_id = request.session.get('usuario_id')
    if usuario_id:
        try:
            usuario = Usuario.objects.get(id=usuario_id)
            return JsonResponse({
                'id': str(usuario.id),
                'name': usuario.name,
                'email': usuario.email,
                'type': usuario.type,
            })
        except Usuario.DoesNotExist:
            return JsonResponse({'error': 'Usuário não encontrado'}, status=404)
    return JsonResponse({'error': 'Não autenticado'}, status=401)
