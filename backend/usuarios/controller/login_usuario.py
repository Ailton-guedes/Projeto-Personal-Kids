
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import check_password
from usuarios.models import Usuario
import json





@csrf_exempt
def login_usuario(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')

        try:
            usuario = Usuario.objects.get(email=email)

            if usuario.status == 'destivado':
                return JsonResponse({'success': False, 'message': 'Conta desativada. Entre em contato com o administrador.'}, status=403)

            if check_password(password, usuario.password):
                request.session['usuario_id'] = str(usuario.id)
                return JsonResponse({'success': True, 'message': 'Login bem-sucedido!'})
            else:
                return JsonResponse({'success': False, 'message': 'Email ou senha incorretos.'}, status=401)

        except Usuario.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'Email ou senha incorretos.'}, status=401)
    
    return JsonResponse({'error': 'Método não permitido'}, status=405)