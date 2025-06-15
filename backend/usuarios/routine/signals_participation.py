# usuarios/signals.py
from mongoengine import signals
from datetime import date, datetime, timedelta
from usuarios.models import InscricaoAulaRegular, OcorrenciaAula, ParticipacaoAula, Aluno

def create_immediate_participacoes(sender, document, **kwargs):
    if isinstance(document, InscricaoAulaRegular):
        aluno = document.aluno
        agenda_regular = document.agenda_regular

        if document.status_inscricao == 'ativa':
            print(f"Sinal post_save em InscricaoAulaRegular para {aluno.name}. Verificando aulas próximas...")

            hoje = date.today()
            periodo_antecipacao_imediata = 15
            data_limite_imediata = hoje + timedelta(days=periodo_antecipacao_imediata)

            ocorrencias_proximas = OcorrenciaAula.objects(
                agenda_regular=agenda_regular,
                data_aula__gte=hoje,
                data_aula__lte=data_limite_imediata,
                status_ocorrencia='agendada'
            )

            for ocorrencia in ocorrencias_proximas:
                participacao_existente = ParticipacaoAula.objects(
                    ocorrencia_aula=ocorrencia,
                    aluno=aluno
                ).first()

                if not participacao_existente:
                    participacao = ParticipacaoAula(
                        ocorrencia_aula=ocorrencia,
                        aluno=aluno,
                        presenca='pendente',
                        status_reposicao='nao_elegivel'
                    )
                    participacao.save()
                    print(f" - Participação imediata criada para {aluno.name} em {ocorrencia.data_aula.strftime('%Y-%m-%d')}")
                    
signals.post_save.connect(create_immediate_participacoes, sender=InscricaoAulaRegular)