from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from usuarios.models import Plano
import json

@csrf_exempt
def criar_plano(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        plano = Plano(
            name=data['name'],
            tipo=data['tipo'],
            valor=data['valor'],
            duracao_meses=data['duracao_meses'],
            dia_vencimento=data['dia_vencimento'],
            descricao=data.get('descricao', '')
        )
        plano.save()

        return JsonResponse({'id': str(plano.id), 'name': plano.name})

    return JsonResponse({'error': 'Método não permitido'}, status=405)
