# coding:utf-8
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib import auth
from django.http import JsonResponse


def index(request):
    # if request.user.is_authenticated():
    #     return render(request, "home.html")
    return render(request, "index.html")


def login(request):
    username = request.POST.get('username', None)
    password = request.POST.get('password', None)
    print username, password
    user = auth.authenticate(username=username, password=password)
    print user
    if user is not None:
        auth.login(request, user)
        return render(request, "home.html")
    else:
        return HttpResponse('false')


def register(request):
    username = request.POST.get('username', None)
    password = request.POST.get('password', None)
    email = request.POST.get('email', None)
    user = User.objects.filter(username=request.POST['username'])
    print username, password, email
    if user.count():
        return HttpResponse('account has already exits.')
    else:
        user = User.objects.create_user(username=username, password=password, email=email)
        user.save()
        return render(request, "home.html")


def check_username(request):
    username = request.POST.get('username', None)
    user = User.objects.filter(username=request.POST['username'])
    if user.count():
        return HttpResponse("yes")
    else:
        return HttpResponse("no")


def check_passwd(request):
    username = request.POST.get('username', None)
    password = request.POST.get('password', None)

    user = User.objects.get(username=username)
    if user.check_password(password):
        return HttpResponse("yes")
    else:
        return HttpResponse("no")



def logout(request):
    auth.logout(request)
    return render(request, 'index.html')
