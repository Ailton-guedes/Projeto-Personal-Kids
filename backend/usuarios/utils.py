import jwt
from datetime import datetime, timedelta
from django.conf import settings

def generate_jwt_token(user):
    payload = {
        'user_id': str(user.id),
        'email': user.email,
        'type': user.type,
        'exp': datetime.utcnow() + timedelta(days=1),
        'iat': datetime.utcnow()  
    }
    
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
    return token