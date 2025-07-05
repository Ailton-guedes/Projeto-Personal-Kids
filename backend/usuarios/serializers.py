from rest_framework import serializers
from usuarios.models import Usuario
from django.contrib.auth.hashers import check_password
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework_simplejwt.settings import api_settings
from bson import ObjectId 

class MongoObjectIdSerializer(serializers.Field):
    def to_representation(self, value):
        if isinstance(value, ObjectId):
            return str(value)
        return value

    def to_internal_value(self, data):
        try:
            return ObjectId(str(data))
        except Exception:
            raise serializers.ValidationError("ID de usuário inválido (ObjectId esperado).")


class CustomTokenObtainPairSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    
    def validate(self, data):
        email = data['email']
        password = data['password'] 

        try:
            user = Usuario.objects.get(email=email)
        except Usuario.DoesNotExist:
            raise serializers.ValidationError("Usuário não encontrado com este email.")
        
        if not check_password(password, user.password):
            raise serializers.ValidationError("Senha incorreta.")
        
        if user.status != 'ativo':
            raise serializers.ValidationError("Usuário está desativado.")
        
        refresh = RefreshToken()
        
        refresh[api_settings.USER_ID_CLAIM] = str(user.id)
        
        access = refresh.access_token

        return {
            'refresh': str(refresh),
            'access': str(access), 
            'user': {
                'id': str(user.id),
                'email': user.email,
                'type': user.type,
                'name': user.name
            }
        }
    
class UsuarioSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True) 

    class Meta:
        model = Usuario
        fields = ['id', 'email', 'name', 'type', 'status']