from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from usuarios.models import Aluno, AgendaRegular, InscricaoAulaRegular 
from datetime import date

@csrf_exempt
def inscrever_aluno_agenda(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        aluno_id = data.get('id_aluno')
        agenda_regular_id = data.get('id_agenda_regular')

        if not aluno_id or not agenda_regular_id:
            return JsonResponse({'error': 'ID do aluno e ID da agenda regular são obrigatórios.'}, status=400)

        try:
            aluno = Aluno.objects.get(id=aluno_id)
        except Aluno.DoesNotExist:
            return JsonResponse({'error': 'Aluno não encontrado.'}, status=404)

        try:
            agenda_regular = AgendaRegular.objects.get(id=agenda_regular_id)
        except AgendaRegular.DoesNotExist:
            return JsonResponse({'error': 'Agenda Regular não encontrada.'}, status=404)

        inscricao_existente = InscricaoAulaRegular.objects(
            aluno=aluno,
            agenda_regular=agenda_regular,
            status_inscricao='ativa'
        ).first()

        if inscricao_existente:
            return JsonResponse({'message': 'Aluno já está inscrito e ativo nesta agenda regular.'}, status=409)

        alunos_ativos_na_agenda = InscricaoAulaRegular.objects(
            agenda_regular=agenda_regular,
            status_inscricao='ativa'
        ).count()

        if alunos_ativos_na_agenda >= agenda_regular.max_alunos:
            if agenda_regular.status != 'cheia':
                agenda_regular.status = 'cheia'
                agenda_regular.save()
            return JsonResponse({'error': 'A turma está cheia, não é possível inscrever mais alunos.'}, status=400)

        try:
            inscricao = InscricaoAulaRegular(
                aluno=aluno,
                agenda_regular=agenda_regular,
                data_inscricao=date.today(),
                status_inscricao='ativa'
            )
            inscricao.save()

            if alunos_ativos_na_agenda + 1 == agenda_regular.max_alunos and agenda_regular.status != 'cheia':
                agenda_regular.status = 'cheia'
                agenda_regular.save()

            return JsonResponse({
                'message': 'Aluno inscrito com sucesso na agenda regular.',
                'inscricao_id': str(inscricao.id),
                'aluno_nome': aluno.name,
                'agenda_modalidade': agenda_regular.modalidade,
                'agenda_day_week': agenda_regular.day_week
            }, status=201)

        except Exception as e:
            return JsonResponse({'error': f'Erro ao criar inscrição: {str(e)}'}, status=500)

    return JsonResponse({'error': 'Método não permitido.'}, status=405)

