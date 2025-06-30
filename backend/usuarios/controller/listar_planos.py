from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from usuarios.models import Plano 

@csrf_exempt
def listar_planos(request):
    if request.method == 'GET':
        try:
            planos = Plano.objects.all()

            planos_list = []
            for plano in planos:
                planos_list.append({
                    'id': str(plano.id),
                    'name': plano.name,
                    'tipo': plano.tipo,
                    'valor': str(plano.valor),
                    'duracao_meses': plano.duracao_meses,
                    'dia_vencimento': plano.dia_vencimento,
                    'descricao': plano.descricao if plano.descricao else None 
                })
            
            return JsonResponse(planos_list, safe=False, status=200)

        except Exception as e:
            print(f"Erro ao listar planos: {e}")
            return JsonResponse({'error': 'Ocorreu um erro interno ao listar os planos.'}, status=500)
            
    return JsonResponse({'error': 'Método não permitido'}, status=405)