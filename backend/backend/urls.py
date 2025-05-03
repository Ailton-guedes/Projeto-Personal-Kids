"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from usuarios.views import criar_usuario
from usuarios.views import login_usuario
from usuarios.views import listar_usuario
from usuarios.views import usuario_atual
from usuarios.views import perfil_usuario
from usuarios.views import editar_perfil_usuario

urlpatterns = [
    path('admin/', admin.site.urls),
    path('usuarios/criar/', criar_usuario),
    path('usuarios/login/', login_usuario),
    path('usuarios/listar/', listar_usuario),
    path('usuarios/me/', usuario_atual),
    path('usuarios/perfil/<str:id>/', perfil_usuario),
    path('usuarios/editar/<str:id>/', editar_perfil_usuario),
]


