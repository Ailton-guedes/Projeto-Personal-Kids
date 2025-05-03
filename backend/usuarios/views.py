from django.contrib.auth import login
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
        usuarios_list = [{'id': str(usuario.id), 'name': usuario.name, 'email': usuario.email, 'type': usuario.type, 'status': usuario.status} for usuario in usuarios]
        return JsonResponse(usuarios_list, safe=False)
    return JsonResponse({'error': 'Método não permitido'}, status=405)


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

@csrf_exempt
def editar_perfil_usuario(request, id):
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

@csrf_exempt
def usuario_atual(request):
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
