# coding:utf-8
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib import auth
from django.http import JsonResponse

message_list = []
flag = {}


def index(request):
    return render(request, "index.html")


def home(request):
    if request.user.is_authenticated():
        print "username:"
        print request.user.username
        # 消息队列
        flag[request.user.username] = 0
        return render(request, "chat_box.html")
    else:
        return HttpResponseRedirect("/index/")


def login(request):
    username = request.POST.get('username', None)
    password = request.POST.get('password', None)

    user = auth.authenticate(username=username, password=password)

    if user is not None:
        auth.login(request, user)
        return HttpResponseRedirect("/")
    else:
        return HttpResponseRedirect("/index/")


def register(request):
    username = request.POST.get('username', None)
    password = request.POST.get('password', None)
    email = request.POST.get('email', None)
    user = User.objects.filter(username=request.POST['username'])

    if user.count():
        return HttpResponseRedirect("/index/")
    else:
        user = User.objects.create_user(username=username, password=password, email=email)
        user.save()
        user = auth.authenticate(username=username, password=password)
        auth.login(request, user)
        return HttpResponseRedirect("/")


def check_username(request):
    username = request.POST.get('username', None)
    user = User.objects.filter(username=request.POST['username'])
    if user.count():
        return JsonResponse({'pass': 'true'})
    else:
        return JsonResponse({'pass': 'false'})


def check_passwd(request):
    username = request.POST.get('username', None)
    password = request.POST.get('password', None)

    user = User.objects.get(username=username)
    if user.check_password(password):
        return JsonResponse({'pass': 'true'})
    else:
        return JsonResponse({'pass': 'false'})


def logout(request):
    auth.logout(request)
    return HttpResponseRedirect('/')


def chat_box(request):
    return render(request, "chat_box.html")


def contact_list(request):
    return render(request, "contact_list.html")


# def upload_icon(request):
#     un = request.POST.get('username')
#     f = request.FILES.get('uploadfile')
#     filename = '/'.join('d:/upload', f.name)  # 存放内容的目标文件路径
#     with open(filename, 'a+') keys:
#         for chunk in f.chunks():  # chunks()方法将文件切分成为块(<=2.5M)的迭代对象
#             keys.write(chunk)
#
#     # 更新数据表信息
#     uf = UploadFile(username=un, uploadfile=filename)
#     uf.save()
#     return HttpResponse(filename + ' OK')
#
#     return render_to_response('upload.html', {})


def pushMessage(request):
    text = request.POST.get('message', None)
    message = {'username': request.user.username, 'message': text, 'state': "True"}
    message_list.append(message)
    print message_list
    return JsonResponse({'push': 'true'})


def pullMessage(request):
    # for message in message_list:
    #     if (message['username'] != request.user.username and message['state'] == "False"):
    #         message['state'] = "True"
    #         message_list.remove(message)
    #         return JsonResponse(message)
    # return JsonResponse({'state': "False"})

    print len(message_list)
    print request.user.username
    print flag[request.user.username]

    for i in range(flag[request.user.username], len(message_list)):
        message = message_list[i]
        if (message['username'] != request.user.username):
            # message['state'] = "True"
            flag[request.user.username] = i + 1
            return JsonResponse(message)
        else:
            flag[request.user.username] = i + 1
    return JsonResponse({'state': "False"})
