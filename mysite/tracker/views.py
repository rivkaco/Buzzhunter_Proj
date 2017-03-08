from django.http import HttpResponse
from django.shortcuts import render
from .models import itc_user_interaction
from .serializers import user_interactionSerializer
from rest_framework import viewsets


class user_interactionViewSet(viewsets.ModelViewSet):
    queryset = itc_user_interaction.objects.all()
    serializer_class = user_interactionSerializer

def index(request):
    return render(request,'index.html')

def blog(request):
    return render(request,'blog.html')

def buzzlove(request):
    return render(request,'buzzLove.html')

def creative(request):
    return render(request,'creative.html')

def index_all(request):
    return render(request,'index_all.html')

def index_branding(request):
    return render(request,'index_branding.html')

def index_buzzLove(request):
    return render(request,'index_buzzLove.html')

def index_confidential(request):
    return render(request,'index_confidential.html')

def index_web(request):
    return render(request,'index_web.html')

def portfolio(request):
    return render(request,'portfolio.html')

def website(request):
    return render(request,'website.html')


