from datetime import date, timedelta, datetime
from usuarios.models import AgendaRegular, OcorrenciaAula, InscricaoAulaRegular, ParticipacaoAula, Professor

def gerar_ocorrencia_aula():
    print(f"Iniciando geração de ocorrências de aula em {datetime.now()}")

    dias_semana_map = {
        'segunda': 0, 'terca': 1, 'quarta': 2, 'quinta': 3,
        'sexta': 4, 'sabado': 5, 'domingo': 6
    }

    hoje = date.today()
    periodo_geracao = 15
    data_limite = hoje + timedelta(days=periodo_geracao)

    agendas_regulares_ativas = AgendaRegular.objects(status='ativa')

    for agenda_regular in agendas_regulares_ativas:
        try:
            professor = Professor.objects.get(id=agenda_regular.id_professor.id)
        except Professor.DoesNotExist:
            print(f"Aviso: Professor para AgendaRegular {agenda_regular.id} não encontrado. Pulando.")
            continue
            
        dia_semana_agenda_num = dias_semana_map.get(agenda_regular.day_week)
        if dia_semana_agenda_num is None:
            print(f"Aviso: Dia da semana '{agenda_regular.day_week}' inválido para AgendaRegular {agenda_regular.id}. Pulando.")
            continue

        for i in range(periodo_geracao + 1):
            data_corrente = hoje + timedelta(days=i)

            if data_corrente.weekday() == dia_semana_agenda_num:
                start_datetime_ocorrencia = datetime.combine(data_corrente, agenda_regular.start_time.time())
                end_datetime_ocorrencia = datetime.combine(data_corrente, agenda_regular.end_time.time())

                ocorrencia_existente = OcorrenciaAula.objects(
                    agenda_regular=agenda_regular,
                    data_aula=data_corrente
                ).first()

                if not ocorrencia_existente:
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
                    print(f"Ocorrência de aula criada: {ocorrencia_aula.id} em {data_corrente} para {agenda_regular.modalidade}")

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

    print(f"Geração de ocorrências de aula concluída em {datetime.now()}")
