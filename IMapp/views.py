# coding:utf-8
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib import auth
from django.http import JsonResponse
from django.core import serializers
import json
from IMapp.models import Contact, Group, UserProfile, Message

chat_with = {}


def index(request):
    return render(request, "index.html")


def home(request):
    if request.user.is_authenticated():
        # print "username:"
        # print request.user.username
        # 消息队列
        chat_with[request.user.username] = None
        return render(request, "home.html")
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


def add_message(sender, receiver, text):
    # sender 存储消息
    user = User.objects.get(username=sender)
    contact = user.contact_set.get(contact=receiver)
    m = Message.objects.create(contact=contact, message=text, receive=False, state=True)
    m.save()

    # receiver 存储消息
    user = User.objects.get(username=receiver)
    contact = user.contact_set.get(contact=sender)
    m = Message.objects.create(contact=contact, message=text, receive=True, state=False)
    m.save()


def push_message(request):
    try:
        contact = request.user.contact_set.get(contact=chat_with[request.user.username])
    except Contact.DoesNotExist:
        print "no chat with"
        return JsonResponse({'push': "False"})
    else:
        text = request.POST.get('message', None)
        add_message(request.user.username, chat_with[request.user.username], text)
        return JsonResponse({'push': 'True'})


def pull_message(request):
    try:
        contact = request.user.contact_set.get(contact=chat_with[request.user.username])
    except Contact.DoesNotExist:
        print "no chat with"
        return JsonResponse({'pull': "False"})
    else:
        try:
            msg = contact.message_set.get(state=False, receive=True)
        except Message.DoesNotExist:
            return JsonResponse({'pull': "False"})
        else:
            msg.state = True
            msg.save()
            return JsonResponse({'pull': "True", 'message': msg.message})


def add_contact(request):
    contact = request.POST.get('contact', None)
    group = request.POST.get('group', None)
    if group == "":
        group = "DefaultGroup"
    print group

    if contact == request.user.username:
        return JsonResponse({"state": "n", "msg": "can't add yourself."})

    try:
        contact_user = User.objects.get(username=contact)
    except User.DoesNotExist:
        return JsonResponse({"state": "n", "msg": "user don't exist."})

    contact_set = request.user.contact_set

    try:
        contact_set.get(contact=contact)
    except Contact.DoesNotExist:

        try:
            request.user.group_set.get(group=group)
        except Group.DoesNotExist:
            Group.objects.create(group=group, user=request.user)

        c1 = Contact.objects.create(contact=contact, user=request.user, group=group)
        c1.save()
        # 双向添加联系人,之后可以加入验证功能
        c2 = Contact.objects.create(contact=request.user.username, user=contact_user)
        c2.save();

        return JsonResponse({"state": "n", "msg": "add contact success."})
    else:
        return JsonResponse({"state": "n", "msg": "contact has already exist."})


def delete_contact(request):
    contact = request.POST.get('contact', None)

    try:
        contact_user = User.objects.get(username=contact)
    except User.DoesNotExist:
        return JsonResponse({"state": "n", "msg": "user don't exist."})

    contact_set = request.user.contact_set

    try:
        c = contact_set.get(contact=contact)
    except Contact.DoesNotExist:
        return JsonResponse({"state": "n", "msg": "contact not exist."})
    else:
        c.delete()
        # 反向删除
        Contact.objects.get(contact=request.user.username, user=contact_user).delete()
        return JsonResponse({"state": "y", "msg": "delete success."})


def get_contact_list(request):
    contact_set = request.user.contact_set
    contact_list = {}
    for contact in contact_set.all():
        try:
            contact_user = User.objects.get(username=contact)
        except User.DoesNotExist:
            print "contact error"
        else:
            email = contact_user.email
            password = contact_user.password
            group = contact.group
            # 返回用户和用户的信息
            contact_list[contact_user.username] = {'group': group, 'email': email}
    return JsonResponse(contact_list)


def get_group_list(request):
    group_set = request.user.group_set
    group_list = {}
    for group in group_set.all():
        group_list[group.group] = group.user.username

    print group_list
    return JsonResponse(group_list)


def chat_with_contact(request):
    contact = request.POST.get('contact', None)

    try:
        request.user.contact_set.get(contact=contact)
    except Contact.DoesNotExist:
        print "this contact may delete you."
        return JsonResponse({'response': "False"})
    else:
        chat_with[request.user.username] = contact
        return JsonResponse({'response': "True"})


def get_chat_with(request):
    try:
        request.user.contact_set.get(contact=chat_with[request.user.username])
    except Contact.DoesNotExist:
        return JsonResponse({'chat_with': None})
    else:
        return JsonResponse({'chat_with': chat_with[request.user.username]})
