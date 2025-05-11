from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password
from usuarios.models import Usuario
import json
from usuarios.models import Aluno
from usuarios.models import Responsavel, Aluno
from usuarios.models import Mensalidade


@csrf_exempt
def criar_mensalidade(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        aluno = Aluno.objects.filter(id=data['id_aluno']).first()
        responsavel = Responsavel.objects.filter(id=data['id_responsavel']).first()
        if not aluno or not responsavel:
            return JsonResponse({'error': 'Aluno ou Responsável não encontrado'}, status=400)

        mensalidade = Mensalidade(
            id_aluno=aluno,
            id_responsavel=responsavel,
            planos=data['planos'],
            valor=data['valor'],
            vencimento=data['vencimento'],
            status=data.get('status', 'pendente')
        )
        mensalidade.save()
        return JsonResponse({'id': str(mensalidade.id), 'valor': mensalidade.valor})

    return JsonResponse({'error': 'Método não permitido'}, status=405)
