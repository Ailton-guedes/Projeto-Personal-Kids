from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import check_password, make_password
from usuarios.models import Usuario
import json


@csrf_exempt 
def criar_usuario(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        usuario = Usuario(
            name=data['name'], 
            email=data['email'], 
            type=data['type'],
            password=make_password(data['password'])
        )
        usuario.save()
        return JsonResponse({'id': str(usuario.id), 'name': usuario.name})
    return JsonResponse({'error': 'Método não permitido'}, status=405)

@csrf_exempt
def listar_usuario(request):
    if request.method == 'GET':
        usuarios = Usuario.objects.all()
        usuarios_list = [{'id': str(usuario.id), 'name': usuario.name, 'email': usuario.email} for usuario in usuarios]
        return JsonResponse(usuarios_list, safe=False)
    return JsonResponse({'error': 'Método não permitido'}, status=405)

@csrf_exempt
def login_usuario(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')

        try:
            usuario = Usuario.objects.get(email=email)

            if check_password(password, usuario.password):
                return JsonResponse({'success': True, 'message': 'Login bem-sucedido!'})
            else:
                return JsonResponse({'success': False, 'message': 'Email ou senha incorretos.'}, status=401)

        except Usuario.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'Email ou senha incorretos.'}, status=401)
    
    return JsonResponse({'error': 'Método não permitido'}, status=405)
