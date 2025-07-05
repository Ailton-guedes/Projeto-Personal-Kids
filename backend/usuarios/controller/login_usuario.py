from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from usuarios.serializers import CustomTokenObtainPairSerializer
from usuarios.models import Usuario
from usuarios.utils import generate_jwt_token 

class login_usuario(APIView):
    def post(self, request):
        serializer = CustomTokenObtainPairSerializer(data=request.data)
        if serializer.is_valid():
            user = Usuario.objects.get(email=request.data['email'])
            
            refresh_token = serializer.validated_data['refresh']
            access_token = serializer.validated_data['access']
            user_data = serializer.validated_data['user'] 

            response = Response({
                'access': access_token, 
                'user': user_data
            }, status=status.HTTP_200_OK)

            response.set_cookie(
                key='refresh_token',
                value=refresh_token,
                httponly=True,
                secure=False,
                samesite='Lax',
                max_age=3600 * 24 * 7 
            )
            
            return response
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)