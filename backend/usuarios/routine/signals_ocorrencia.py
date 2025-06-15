from mongoengine import signals
from datetime import date, datetime, timedelta
from usuarios.models import InscricaoAulaRegular, OcorrenciaAula, ParticipacaoAula, AgendaRegular, Professor

def create_immediate_ocorrencias_on_agenda_save(sender, document, **kwargs):
    if isinstance(document, AgendaRegular):
        agenda_regular = document

        if agenda_regular.status == 'ativa':
            print(f"Sinal post_save em AgendaRegular para {agenda_regular.day_week} {agenda_regular.modalidade}. Verificando e criando ocorrências próximas...")

            dias_semana_map = {
                'segunda': 0, 'terca': 1, 'quarta': 2, 'quinta': 3,
                'sexta': 4, 'sabado': 5, 'domingo': 6
            }
            dia_semana_agenda_num = dias_semana_map.get(agenda_regular.day_week)

            if dia_semana_agenda_num is None:
                print(f"Aviso: Dia da semana '{agenda_regular.day_week}' inválido na AgendaRegular {agenda_regular.id}. Pulando geração de ocorrências.")
                return

            hoje = date.today()
            periodo_antecipacao_imediata_agenda = 15
            data_limite_imediata_agenda = hoje + timedelta(days=periodo_antecipacao_imediata_agenda)

            for i in range(periodo_antecipacao_imediata_agenda + 1):
                data_corrente = hoje + timedelta(days=i)

                if data_corrente.weekday() == dia_semana_agenda_num:
                    start_datetime_ocorrencia = datetime.combine(data_corrente, agenda_regular.start_time.time())
                    end_datetime_ocorrencia = datetime.combine(data_corrente, agenda_regular.end_time.time())

                    ocorrencia_existente = OcorrenciaAula.objects(
                        agenda_regular=agenda_regular,
                        data_aula=data_corrente
                    ).first()

                    if not ocorrencia_existente:
                        try:
                            professor = Professor.objects.get(id=agenda_regular.id_professor.id)
                        except Professor.DoesNotExist:
                            print(f"Erro: Professor para AgendaRegular {agenda_regular.id} não encontrado. Nenhuma OcorrenciaAula criada.")
                            continue

                        ocorrencia_aula = OcorrenciaAula(
                            agenda_regular=agenda_regular,
                            data_aula=data_corrente,
                            id_professor=professor,
                            modalidade=agenda_regular.modalidade,
                            start_time=start_datetime_ocorrencia,
                            end_time=end_datetime_ocorrencia,
                            status_ocorrencia='agendada'
                        )
                        ocorrencia_aula.save()
                        print(f" - Ocorrência de aula imediata criada: {ocorrencia_aula.id} em {data_corrente.strftime('%Y-%m-%d')} para {agenda_regular.modalidade}")

                        inscricoes_alunos = InscricaoAulaRegular.objects(
                            agenda_regular=agenda_regular,
                            status_inscricao='ativa'
                        )
                        for inscricao in inscricoes_alunos:
                            participacao_existente = ParticipacaoAula.objects(
                                ocorrencia_aula=ocorrencia_aula,
                                aluno=inscricao.aluno
                            ).first()
                            if not participacao_existente:
                                participacao = ParticipacaoAula(
                                    ocorrencia_aula=ocorrencia_aula,
                                    aluno=inscricao.aluno,
                                    presenca='pendente',
                                    status_reposicao='nao_elegivel'
                                )
                                participacao.save()
                                print(f"   - Participação para aluno {inscricao.aluno.name} criada na ocorrência imediata.")

signals.post_save.connect(create_immediate_ocorrencias_on_agenda_save, sender=AgendaRegular)
