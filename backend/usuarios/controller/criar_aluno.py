from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password
from usuarios.models import Usuario, Aluno, Plano
import json

@csrf_exempt
def criar_aluno(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        responsavel = Usuario.objects.filter(id=data['id_responsavel']).first()
        if not responsavel or responsavel.type != 'responsavel':
            return JsonResponse({'error': 'Responsável não encontrado ou não é do tipo correto'}, status=404)

        plano = None
        if 'id_mensalidade' in data and data['id_mensalidade']:
            try:
                plano = Plano.objects.get(id=data['id_mensalidade'])
            except Plano.DoesNotExist:
                return JsonResponse({'error': 'Mensalidade não encontrada'}, status=404)

        aluno = Aluno(
            name=data['name'],
            cpf=data['cpf'],
            email=data['email'],
            type='aluno',
            password=make_password(data['password']),
            id_responsavel=responsavel,
            id_mensalidade=plano
        )
        aluno.save()

        return JsonResponse({
            'id': str(aluno.id), 
            'name': aluno.name,
            'mensalidade': {
                'id': str(plano.id) if plano else None,
                'name': plano.name if plano else None,
                'planos': plano.planos if plano else None,
            }
        })

    return JsonResponse({'error': 'Método não permitido'}, status=405)
