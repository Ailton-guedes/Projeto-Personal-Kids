from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from usuarios.serializers import UsuarioSerializer

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated] 

    def get(self, request):
        serializer = UsuarioSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

from rest_framework import serializers
from usuarios.models import Usuario

