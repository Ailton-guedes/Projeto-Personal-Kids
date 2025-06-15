from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from datetime import date
from dateutil.relativedelta import relativedelta
import json
from usuarios.models import Aluno, Responsavel, Plano, InscricaoPlano

@csrf_exempt
def inscrever_aluno_plano(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        aluno = Aluno.objects.filter(id=data['id_aluno']).first()
        responsavel = Responsavel.objects.filter(id=data['id_responsavel']).first()
        plano = Plano.objects.filter(id=data['id_plano']).first()

        if not aluno or not responsavel or not plano:
            return JsonResponse({'error': 'Aluno, responsável ou plano não encontrado'}, status=404)

        data_inicio = date.today()
        data_fim = data_inicio + relativedelta(months=plano.duracao_meses)

        inscricao = InscricaoPlano(
            id_aluno=aluno,
            id_responsavel=responsavel,
            plano=plano,
            data_inicio=data_inicio,
            data_fim=data_fim,
            status_pagamento='pendente'
        )
        inscricao.save()

        return JsonResponse({
            'id': str(inscricao.id),
            'aluno': aluno.name,
            'plano': plano.name,
            'data_inicio': str(data_inicio),
            'data_fim': str(data_fim)
        })

    return JsonResponse({'error': 'Método não permitido'}, status=405)
