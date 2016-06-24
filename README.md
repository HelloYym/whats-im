# 设计文档



## 1 概述

### 1.1 背景

本项目名称为 “Whats IM”，是基于 Web 相关技术开发的一个简单的即时通信系统，实现两种客户端，网页客户端和手机客户端，实现的功能如下：

- **用户注册：**实现用户注册、登录功能，用户注册时需要填写必要的信息并验证
- **好友维护：**可以增加、删除好友，对好友进行分组管理
- **消息通信：**客户端之间可以发送消息、支持离线发送

### 1.2 目的

通过项目实践，掌握 Web前端、服务端开发、手机应用开发等技术。此文档来从程序系统的组织结构以及各个程序的设计说明等方面来详细描述并说明项目的编码与系统实现。

### 1.3 运行环境

#### 1.3.1 客户端平台

**Web 客户端：**使用浏览器输入项目 URL 方式获取应用，测试过程主要使用 Chrome 浏览器，版本 51.0.2704.84 (64-bit)

**手机客户端：**应用支持多种移动平台，提供 Android 平台 apk 安装包，测试过程分别使用 Simulator 和 Genymotion 等模拟器环境。

#### 1.3.2 服务器平台

服务器端程序部署于一台阿里云服务器，操作系统版本为 Ubuntu 14.04 32位，公网 IP：115.28.155.92

#### 1.3.3 开发平台

开发过程主要使用 Mac 本机环境，系统版本 OS X EI Capitan，安装有 PyCharm 集成开发环境，以及多种浏览器及移动端模拟器。

### 1.4 应用访问地址

浏览器打开 http://115.28.155.92 

### 1.5 GitHub 仓库

本项目各个版本及全部源码：

https://github.com/HelloYym/WhatsIM



## 2 功能需求

### 2.1 应用界面

#### 2.1.1 登录／注册

登录和注册页面相互通过连接跳转，页面上具有信息输入框及提交按钮。

#### 2.1.2 主界面

主界面总体分为三部分。

页面顶部有菜单栏，横向布局操作按钮。

页面左侧是联系人框，具有联系人信息展示及相关操作按钮。联系人分组可折叠，联系人按行排列展示。

页面右侧是聊天窗口，窗口顶部显示用户名，中部为聊天信息的逐条滚动显示框，下部是输入框和发送按钮。

### 2.2 用户接口

#### 2.2.1 访问

##### Web 客户端

用户在浏览器输入应用的 URL 地址，可直接进入应用。如果之前尚未注册登录，跳转到登录注册页面，否则直接进入应用主界面。

##### 移动客户端

移动客户端应用与 Web 页面具有相同逻辑。如果之前尚未注册登录，跳转到登录注册页面，否则直接进入应用主界面。

#### 2.2.2 登录

##### 输入

登录需要用户名和密码两部分输入，页面提供两个文本框，用户输入完成点击登录按钮进行登录跳转。

##### 验证

输入用户名之后，继续输入密码过程中会进行一次用户名验证。如果用户名不存在，则焦点定位到用户名输入框并提示相关信息。

密码输入完成，点击登录按钮，进行用户名和密码验证，如果用户信息不匹配则阻止表单提交和页面跳转，并提示重新输入。

用户名和密码验证成功即可以登录应用，并跳转到应用主界面。

#### 2.2.3 注册

##### 信息填写

用户注册时需要在注册界面填写用户名、密码、邮箱信息，点击注册按钮验证信息。信息检查无误后完成注册并跳转到应用主页面，否则提示信息错误重新输入。

##### 信息验证

用户名：3-20 字符，不能与其他用户重复。

密码：4-12 字符，不能包含字母数字之外的其他字符。

Email：按照标准电子邮箱地址格式验证。

#### 2.2.4 登出

应用主界面提供登出按钮，用户点击后注销当前用户的登录，并跳转回登录页面。

#### 2.2.5 联系人维护

##### 添加联系人

在应用主页面点击联系人框中的添加按钮，弹出输入框，输入对方用户名和可选分组，点击添加按钮提交添加联系人请求。如果验证通过则提示添加联系人成功，如果该用户不存在或已经存在该联系人则提示相关信息。

##### 删除联系人

在联系人列表中，每个联系人标签中具有删除按钮，点击该按钮即可删除该联系人，并弹出提示框显示删除信息。

##### 分组管理

添加联系人时，可以给联系人指定一个分组。所有联系人按分组展示，每个分组信息可以折叠和展开。

#### 2.2.6 消息通信

##### 发送消息

点击某个联系人的头像或昵称，可以打开与该联系人的对话框，在对话框底部的输入框中输入信息并点击发送按钮即可将消息发送给对方。如果由于网络断开等原因发送失败，则提示该条消息发送失败。

##### 接收消息

打开与某个联系人的对话框后就可以接受到对方发送过来的消息，发送与接收消息分列左右两边以便于区分。

##### 离线通信

如果通信双方又一方不在线，那么一方发送的消息会暂存在服务器数据库中，待对方登录上线后，打开联系人对话框就可以查看离线消息。

##### 消息通知

当接受到联系人的消息时，该联系人头像闪动提示查看新消息。

### 2.3 服务器接口

#### 2.3.1 URL 功能映射

| URL                | 功能      | 说明                  |
| :----------------- | :------ | :------------------ |
| ／                  | 主页面     | 显示应用主页面，返回页面 HTML   |
| /admin/            | 管理页面    | 提供管理员密码，登录管理页面      |
| /index/            | 登录页面    | 显示登录页面，返回页面 HTML    |
| /login/            | 登录      | 参数为用户名和密码，返回是否成功    |
| /register/         | 注册      | 参数为用户名和密码，返回是否成功    |
| /logout/           | 登出      | 参数为用户名，返回是否成功       |
| /check_username/   | 检查用户名   | 请求参数为用户名，返回是否存在     |
| /check_password/   | 检查密码    | 请求参数为用户名和密码，返回是否匹配  |
| /push_message/     | 发送消息    | 将消息参数发送给当前对话联系人     |
| /pull_message/     | 拉取消息    | 获取与当前对话联系人的未读消息     |
| /new_message/      | 新消息提示   | 检查新消息，返回发送新消息的联系人列表 |
| /add_contact/      | 添加联系人   | 参数为用户名，添加该用户为联系人    |
| /delete_contact/   | 删除联系人   | 参数为用户名，删除该联系人       |
| /get_contact_list/ | 获取联系人列表 | 返回当前用户的所有联系人列表      |
| /get_group_list/   | 获取分组列表  | 返回当前用户的所有分组列表       |
| /chat_with/        | 建立通信连接  | 参数为联系人用户名，与该联系人建立通信 |
| /check_online/     | 检查联系人在线 | 参数为用户名，返回该用户是否在线    |
| 待定                 |         |                     |


#### 2.3.2 服务器内部接口

| 函数接口                                   | 功能     | 说明                  |
| :------------------------------------- | :----- | :------------------ |
| authenticate(username, password)       | 验证用户信息 | 验证用户名和密码是否匹配        |
| login(user)                            | 用户登录   | 将传入的用户状态设置为登录状态     |
| logout(user)                           | 用户登出   | 将传入的用户状态设置为登出状态     |
| create_user(username, password, email) | 建立新用户  | 利用参数信息创建一个新的用户实体    |
| add_message(sender, receiver, text)    | 添加消息   | 在发送方和接收方的消息记录中保存消息  |
| add_contact(user, contact)             | 添加联系人  | 为用户添加一个联系人，并验证联系人信息 |
| delete_contact(user, contact)          | 删除联系人  | 删除用户的指定联系人          |
| 待定                                     |        |                     |


### 2.4 数据库接口

数据库支持标准 SQL 语句，提供插入、删除、更新等基本操作接口。

服务器程序与数据库通过 Python 标准数据库接口 Python DB-API 连接，Python DB-API为开发人员提供了数据库应用编程接口。



## 3 技术方案

### 3.1 服务器

#### 3.1.1 Python

Python 是一种面向对象、解释型计算机程序设计语言，它简单易懂并具有丰富和强大的库。Django 框架基于 Python 编写，本项目的后端程序采用 Python 语言。

#### 3.1.2 Django 框架

Django 是一个开放源代码的 Web 应用框架，由 Python 写成，采用了 MVC 的软件设计模式。Django 的主要目的是简便、快速的开发数据库驱动的网站。它强调代码复用,多个组件可以很方便的以“插件”形式服务于整个框架。

Django 基于 MVC 的设计：

- **对象关系映射 (ORM,object-relational mapping)：**以Python类形式定义你的数据模型，ORM将模型与关系数据库连接起来，你将得到一个非常容易使用的数据库API，同时你也可以在Django中使用原始的SQL语句。
- **URL 分派：**使用正则表达式匹配URL，你可以设计任意的URL，没有框架的特定限定。像你喜欢的一样灵活
- **模版系统：**使用Django强大而可扩展的模板语言，可以分隔设计、内容和Python代码。并且具有可继承性。

### 3.2 数据库

#### 3.2.1 MySQL

MySQL 是当前最流行的开源关系型数据库管理系统，支持标准的关系型数据库查询语句 SQL。其具有体积小、速度快、成本低的特点，并且开放源码。部署于服务器主机，监听端口为 3306。

#### 3.2.2 MySQL-python

MySQL-python 是 Python 访问 MySQL 数据库的接口，它遵循 Python 数据库接口 2.0 版本的标准，具有线程友好的特点。 

#### 3.2.3 Django Model

直接采用标准的数据库接口操纵数据库会产生一些问题，我们不得不做一些与业务逻辑无关的操作以及重复同样的代码： 创建数据库连接、创建数据库游标、执行某个语句、然后关闭数据库。

Django 的设计鼓励松耦合及对应用程序中不同部分的严格分割。 把数据存取逻辑、业务逻辑和表现逻辑组合在一起的概念成为 MVC 架构模式。

Django 模型是用 Python 代码形式表述的数据在数据库中的定义。 模型对象对应于关系型数据库的表，并提供了相应的 Python 接口对模型进行操作。

模型的

### 3.3 Web 前端

#### 3.3.1 HTML

超文本标记语言，它是万维网的核心语言，页面内可以包含图片、链接，甚至音乐、程序等非文字元素。HTML 以标签的形式指定文本内容，浏览器根据标签渲染页面。

#### 3.3.2 CSS

层叠样式表是一种用来表现 HTML 等文件样式的语言，通常用它丰富 HTML 页面的样式。能够为每个 HTML 元素定义样式，并将之应用于任意多的页面中。如需进行全局的更新，只需简单地改变样式，然后网站中的所有元素均会自动地更新。目前所有的主流浏览器均支持层叠样式表。

#### 3.3.3 Bootstrap

Bootstrap 是目前很受欢迎的开源的前端框架。它是基于 HTML5 和 CSS3 开发的，它在 jQuery 的基础上进行了更为个性化和人性化的完善，形成一套自己独有的网站风格。网站和应用能在 Bootstrap 的帮助下通过同一份代码有效适配多个平台的设备，使得 Web 开发更加快捷。

#### 3.3.4 JavaScript

JavaScript 是一种脚本语言，具有动态类型、弱类型、基于原型的特点。浏览器集成了 JavaScript 引擎，用来给 HTML 网页增加动态功能，为网页提供交互功能。

jQuery 是一个 JavaScript 库，可以极大地简化 JavaScript 编程，使开发更加便捷。

#### 3.3.5 AJAX

AJAX 是指一种创建交互式网页应用的网页开发技术。通过在后台与服务器进行少量数据交换，AJAX 可以使网页实现异步更新。这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更新。传统的网页如果需要更新内容，必须重载整个网页页面。

### 3.4 移动客户端

#### 3.4.1 Cordova/PhoneGap

Cordova 提供了一组设备相关的 API，使得移动应用能够以 JavaScript 访问原生的设备功能。它将以 HTML, CSS and JavaScript 写成的网页打包成运行于移动平台的应用，因此能快速开发支持多个移动平台的应用。

Cordova 是 PhoneGap 的核心引擎，Adobe 公司将这一部分核心剥离出去贡献给 Apache 作为开源项目维护。PhoneGap 提供了打包工具以及图形化界面方便了开发。

#### 3.4.2 多平台客户端

由于 Cordova 可以支持打包为多个移动平台的应用，因此本利用 Cordova 开发可以支持多个移动平台，其中包括 Android，ios 等。

### 3.5 前后端交互

#### 3.5.1 HTTP 协议

HTTP 是在网络上传输 HTML 的协议，用于浏览器和服务器的通信。HTTP 是一个简单的请求－响应协议，它运行于 TCP

之上，制定了客户端发送给服务器什么样的消息以及得到什么样的响应。如今的 HTTP 协议并不只用于浏览器与服务器的通信，它更像是传输层的协议，用于不同主机间交换信息。

#### 3.5.2 AJAX

通过在后台与服务器进行少量数据交换，AJAX 可以使网页实现异步更新，在不重新加载整个网页的情况下，对网页的某部分进行更新。

#### 3.5.3 JSON

JSON 是一种轻量级的数据交换格式，具有自我描述性，更易理解。



## 4 设计说明

### 4.1 建立工程

在设计的开始首先要创建一个新的 Django 工程，运行命令创建相应名称的工程：

```shell
django-admin.py startproject WhatsIM
```

建立我们的应用，Django 中的 app 相当于一个功能，由于我们的工程并不大，所以只建立一个 app：

```python
python manage.py startapp IMapp
```

运行后产生如下目录结构和文件：

```
WhatsIM
├── manage.py
└── WhatsIM
    ├── __init__.py
    ├── settings.py
    ├── urls.py
    └── wsgi.py
└── IMapp
	├── __init__.py
	├── admin.py
	├── models.py
	├── tests.py
	└── views.py
```

### 4.2 数据库设计

#### 4.2.1 实体集

##### 用户(User)

| 属性       | 说明                          |
| :------- | :-------------------------- |
| username | 用户名，3-20 字符，主码              |
| password | 密码，4-12 字符，不能包含字母数字之外的其他字符。 |
| email    | 电子邮件，符合标准邮件格式，可空            |
| icon     | 头像文件名，默认为“default.jpg”      |
| login    | 是否登录状态，默认为 False            |

##### 联系人(Contact)

| 属性      | 说明               |
| :------ | :--------------- |
| user    | 联系人所属的用户，外键，级联删除 |
| contact | 联系人用户名           |
| group   | 联系人所属群组          |

##### 分组(Group)

| 属性    | 说明              |
| :---- | :-------------- |
| user  | 群组所属的用户，外键，级联删除 |
| group | 群组名称            |

##### 消息(Message)

| 属性      | 说明               |
| :------ | :--------------- |
| contact | 消息关联的联系人，外键，级联删除 |
| message | 消息内容             |
| date    | 消息产生时间           |
| receive | 消息的传送方向，是接受还是发送  |
| state   | 消息状态，是否被接收       |

#### 4.2.2 联系集

##### 用户－联系人

每一个用户都有一个联系人列表，其中记录了该用户的所有联系人，而每个联系人实体关联了一个特定的用户。因此，用户实体和联系人实体之间是一对多的关系，在关系型数据库中以外键的形式关联这两个数据表，在联系人数据表中有一个用户属性的外键。

##### 用户－分组

每一个用户都有一个分组列表，其中记录了该用户的所有分组，而每个分组关联了一个特定的用户。因此，用户和分组之间是一对多的关系，在关系型数据库中以外键的形式关联这两个数据表，在 Group 数据表中有一个用户属性的外键。

##### 联系人－消息

每个用户关联了一组联系人实体，用户与每个联系人之间会产生一组消息，这些消息实体与联系人实体间又是多对一的关系，因此消息表中设置一个联系人属性作为外键关联联系人。

#### 4.2.3 Model

##### 配置数据库

首先在 `settings.py` 配置数据库信息:

> DATABASE_ENGINE 告诉 Django 使用哪个数据库引擎。
>
> DATABASE_NAME 将数据库名称告知 Django 。
>
> DATABASE_USER 告诉 Django 用哪个用户连接数据库。
>
> DATABASE_PASSWORD 告诉Django连接用户的密码。
>
> DATABASE_HOST 告诉 Django 连接哪一台主机的数据库服务器。


```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',	
        'NAME': 'WhatsIM',	
        'USER': 'root',	
        'PASSWORD': 'yang8386885',	
        'HOST': '115.28.155.92',
        'PORT': '3306',
    }
}
```

##### 定义模型

Django 模型是用 Python 代码形式表述的数据在数据库中的定义。 Django 用模型在后台执行 SQL 代码并把结果用  Python 的数据结构来描述。

模型的定义在对应 app 文件夹下的 `model.py` 中：

```python
from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=15)
    password = models.CharField(max_length=15)
    email = models.EmailField()
    icon = models.FileField('default.jpg')
    def __unicode__(self):
        return self.username

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nickname = models.CharField(max_length=10)
    icon = models.FileField('icon/')
    def __unicode__(self):
        return self.user

class Group(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.CharField(max_length=20)
    def __unicode__(self):
        return self.group

class Contact(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    contact = models.CharField(max_length=20)
    group = models.CharField(max_length=20, default="DefaultGroup")
    def __unicode__(self):
        return self.contact

class Message(models.Model):
    contact = models.ForeignKey(Contact, on_delete=models.CASCADE)
    message = models.TextField()
    date = models.DateTimeField(null=True)
    receive = models.BooleanField(default=False)
    state = models.BooleanField(default=False)
    def __unicode__(self):
        return self.message
```

##### 模型安装

命令行下执行：

```shell
python manage.py makemigrate
```

这个命令将本地的模型转换为数据表，并同步到远程数据库中。执行完这条命令之后，可以在数据库中使用 `show tables` 命令查看当前数据库中的表。可以看到，每个模型都对应了数据库中的一张表。

##### 基本数据访问

模型创建完成后，Django 自动为这些模型提供了高级的 Python API，首先导入模型：

```python
from IMapp.models import Contact, Group, UserProfile, Message
```

向数据库插入一条记录就像创建一个 Python 对象一样，因为此时的模型类对应了数据库中的一张表，那么模型类的具体对象就对应了表中的一条记录。

对记录的插入和更新之后使用 `save()` 方法将更改持久化到数据库中。

选择全部对象使用 `Model.objects.all()` 方法，该方法返回该模型的全部实例。

可以用 `filter()` 和 `get()` 方法针对一部分数据进行操作。

删除数据记录使用 `delete()` 方法。



### 4.3 后端设计

#### 4.3.1 视图和 URL 配置

Django 的视图大致对应于 MVC 模型中的控制器，对应的文件是 `view.py`，所有的控制及业务逻辑代码都在这个文件中。其中每个可被访问的功能称之为视图。

需要通过一个详细描述的 URL 来显式的告诉它并且激活视图。为了绑定视图函数和URL，需要配置 URL 的映射关系，它的本质是 URL 模式以及要为该 URL 调用的视图函数之间的映射表。

这些 URL 与视图函数之间的映射关系定义在 `urls.py` 文件中，URL 地址采用正则表达式的方式匹配：

```python
from django.conf.urls import url
from django.contrib import admin
from IMapp import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', views.home),
    url(r'^index/', views.index),

    url(r'^login/', views.login),
    url(r'^register/', views.register),
    url(r'^logout/', views.logout),
    url(r'^check_username/', views.check_username),
    url(r'^check_passwd/', views.check_passwd),

    url(r'^push_message/', views.push_message),
    url(r'^pull_message/', views.pull_message),

    url(r'^add_contact/', views.add_contact),
    url(r'^delete_contact/', views.delete_contact),
    url(r'^get_contact_list/', views.get_contact_list),
    url(r'^get_group_list/', views.get_group_list),
    url(r'^chat_with_contact/', views.chat_with_contact),
    url(r'^get_chat_with/', views.get_chat_with),
]
```

建立了这些映射关系后，访问对应的 URL 地址就可以找到对应的视图函数并执行，然后得到所需的功能。例如访问 `／` 根地址，在映射表中找到该地址对应于 `views.home` 这个视图，该视图功能是返回应用主页面或重定向到登录页面：

```python
def home(request):
    if request.user.is_authenticated():
        return render(request, "home.html")
    else:
        return HttpResponseRedirect("/index/")
```

这样，通过访问该 URL 地址就可以获得服务器端返回的 HTML 页面，浏览器获得该 HTML 后即可渲染成为页面。

#### 4.3.2 详细功能说明

##### 用户名检查

HTTP 请求方式为 POST，携带参数为用户名，检查该用户名是否存在，即查询数据库中的 User 表，查询参数为该用户名，如果存在则返回 True，不存在则返回 False，返回数据采用 JSON 格式：

```python
def check_username(request):
    username = request.POST.get('username', None)
    user = User.objects.filter(username=request.POST['username'])
    if user.count():
        return JsonResponse({'pass': 'true'})
    else:
        return JsonResponse({'pass': 'false'})
```

##### 密码检查

参数为用户名和密码，先检查该用户名是否存在，如果存在再验证密码与用户名是否匹配，验证通过返回 True，否则返回 False，返回数据采用 JSON 格式：

```python
def check_passwd(request):
    username = request.POST.get('username', None)
    password = request.POST.get('password', None)
    user = User.objects.get(username=username)
    if user.check_password(password):
        return JsonResponse({'pass': 'true'})
    else:
        return JsonResponse({'pass': 'false'})
```

##### 登录

POST 请求携带用户名和密码作为参数，验证用户名和密码的合法性，验证通过则将用户状态设置为登录，并返回登录成功信息，否则返回登录失败：

```python
def login(request):
    username = request.POST.get('username', None)
    password = request.POST.get('password', None)
    user = auth.authenticate(username=username, password=password)
    if user is not None:
        auth.login(request, user)
        return JsonResponse({'pass': 'true'})
    else:
        return JsonResponse({'pass': 'false'})
```

##### 注册

POST 请求携带用户名、密码和 Email 作为参数，首先验证信息的合法性，即该联系人是否已经存在，如果用户不存在则同意注册，以注册信息建立一个新的 User 模型，并将该模型保存到数据库，返回是否成功：

```python
def register(request):
    username = request.POST.get('username', None)
    password = request.POST.get('password', None)
    email = request.POST.get('email', None)
    user = User.objects.filter(username=request.POST['username'])
    if user.count():
        return JsonResponse({'pass': 'false'})
    else:
        user = User.objects.create_user(username=username, password=password, email=email)
        user.save()
        user = auth.authenticate(username=username, password=password)
        auth.login(request, user)
        return JsonResponse({'pass': 'true'})
```

##### 登出

将当前用户登出，即将用户状态改为未登录：

```python
def logout(request):
    auth.logout(request)
    return JsonResponse({'logout': 'true'})
```

##### 添加联系人

POST 请求携带联系人的用户名及分组名称，程序首先检查该联系人是否是合法的用户，然后检查该联系人是否已经添加，检查通过后说明可以添加该联系人。

新建一个 Contact 模型，将 user 外键设置为当前登录的用户，如果未填写分组信息，则将该联系人归类到默认分组，然后将该模型保存到数据库中。返回相关提示消息：

```python
def add_contact(request):
    contact = request.POST.get('contact', None)
    group = request.POST.get('group', None)
    if group == "":
        group = "DefaultGroup"
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
```

##### 删除联系人

删除联系人与添加联系人类似，首先检查合法性，然后再数据表中将该联系人删除，其中与该联系人关联的消息会级联删除，因为 Message 表设置了关联于 Contact 联系人的外键：

```python
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
```

##### 联系人列表

该功能返回请求用户的所有联系人列表，每个联系人的相关信息也跟随一起返回，采用 JSON 的格式：

```python
def get_contact_list(request):
    contact_set = request.user.contact_set
    for contact in contact_set.all():
        try:
            contact_user = User.objects.get(username=contact)
        except User.DoesNotExist:
        else:
            email = contact_user.email
            password = contact_user.password
            group = contact.group
            # 返回用户和用户的信息
            contact_list[contact_user.username] = {'group': group, 'email': email}
    return JsonResponse(contact_list)
```

##### 建立消息连接

请求参数为一个联系人的用户名，要检查该联系人是否存在于当前用户的联系人列表中，并建立于该联系人的对话：

```python
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
```

##### 发送消息

接收请求参数为消息文本，程序确定请求用户的当前对话方，如果当前没有对话方则直接返回发送失败，否则，创建消息对象并保存到数据库中，消息对象关联当前对话的联系人，将该消息的状态设置为未读状态：

```python
def push_message(request):
    try:
        contact = request.user.contact_set.get(contact=chat_with[request.user.username])
    except Contact.DoesNotExist:
        return JsonResponse({'push': "False"})
    else:
        text = request.POST.get('message', None)
        add_message(request.user.username, chat_with[request.user.username], text)
        return JsonResponse({'push': 'True'})
```

##### 拉取消息

浏览器会设置 Js 定时器，周期性检查是否有新消息的产生。服务器检查该用户消息列表中是否有状态未读的，如果有的话则返回一条时间最靠前的消息，并将该消息设置为已读状态：

```python
def pull_message(request):
	contact = request.user.contact_set.get(contact=chat_with[request.user.username])
    try:
    	msg = contact.message_set.get(state=False, receive=True)
    except Message.DoesNotExist:
   		return JsonResponse({'pull': "False"})
    else:
     	msg.state = True
       	msg.save()
       	return JsonResponse({'pull': "True", 'message': msg.message})
```

##### 添加消息

该功能将一条消息添加到发送方与接收方的消息表中，并且设置消息的方向，是发送还是接收，由于是双向通信，每条消息会对应于双方两个联系人，因此一条消息要添加到两条记录到消息表中：

```python
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
```



### 4.4 Web 前端设计

#### 4.4.1 登录／注册页面

##### 布局

登录和注册功能在一个 index.html 页面中，点击按钮在登录和注册之间切换。该页面主要元素为两个 form 表单，分别对应于登录信息和注册信息，同时每个表单关联一个按钮，点击按钮提交该表单。

```html
<form class="register-form" method="post" action="/register/" id="form_register">
	<input type="text" placeholder="username" name="username" id="username_register"/>
	<input type="password" placeholder="password" name="password" id="password_register"/>
	<input type="text" placeholder="email address" name="email" id="email_register"/>
	<input class="button" type="submit" value="create" id="btn_register"/>
	<p class="message">Already registered? <a href="#">Sign In</a></p>
</form>
```

##### 样式

在 HTML 文件头部 <head> 标签中引入 CSS 样式表文件，其中一个是 Bootstrap 框架的样式表，另外一个是自己编写的样式表，根据实际情况设置 HTML 元素的样式：

```HTML
<link href="/static/css/bootstrap.min.css"/>
<link rel="stylesheet" href="/static/css/style_index.css"/>
```

Bootstrap 样式的使用比较简单，直接在 HTML 元素的标签中添加指定的类名，即可使用 Bootstrap 提供的样式，这些提供的样式具有统一的风格，在快速开发的同时又能保持网页的美观度。

为了使页面的样式更灵活地匹配我们的应用，除了直接使用 Bootstrap 的样式外还可以自行编写 CSS 样式，这样可以让页面元素根据自己的想法来布局。

在登录页面中，在 Bootstrap 基础上，我主要设置了元素的颜色和大小等样式，而不是完全使用 Bootstrap 样式。

#### 4.4.2 应用主页面

##### 总体布局

主界面总体分为三部分。

页面顶部有菜单栏，横向布局操作按钮。

页面左侧是联系人框，具有联系人信息展示及相关操作按钮。联系人分组可折叠，联系人按行排列展示。

页面右侧是聊天窗口，窗口顶部显示用户名，中部为聊天信息的逐条滚动显示框，下部是输入框和发送按钮。​

##### 联系人列表

联系人列表分为顶部按钮栏和下部的联系人列表展示框。其中顶部三个按钮分别为添加、搜索和刷新联系人。

下面列表框中采用分层设计，第一层为分组信息，点击分组名称可以展开该分组。分组展开后可以看到该分组中的联系人条目。

其中每个联系人展示条目为左右结构，第一列显示用户头像，右侧为联系人昵称及相关信息。

点击添加联系人按钮，弹出 Bootstrap 的遮罩窗体，该窗体中具有两个输入框，分别输入用户名和分组名，点击确认按钮即可添加联系人，下面可以提示相关信息。

##### 对话框

对话框上部显示当前会话联系人昵称。

中间部分是双方通信的消息列表，接收的消息显示在左侧，自己发送的消息显示在右侧，并且按照消息发送的时间顺序排列，可以滚动窗体以显示更多历史消息。

下部具有文本输入框，输入文本后点击发送按钮实现消息的发送。

#### 4.4.3 动态页面

浏览器利用 Js 脚本语言动态更新网页，以 AJAX 的形式可以实现网页局部的更新而不用每个功能都重新刷新一次整个页面。下面简要描述一下几个主要的需要动态更新的功能。

##### jQuery AJAX

通过 jQuery AJAX 方法，您能够使用 HTTP Get 和 HTTP Post 从远程服务器上请求文本、HTML、XML 或 JSON，同时能够把这些外部数据直接载入网页的被选元素中。编写常规的 AJAX 代码并不容易，因为不同的浏览器对 AJAX 的实现并不相同。不过，jQuery 团队为我们解决了这个难题，我们只需要一行简单的代码，就可以实现 AJAX 功能。

##### 用户名检查

登录注册页面中，当输入完用户名光标移动到其它地方的时候，进行一次用户名检查，这在登录和注册页面中的逻辑是相反的，登陆页中用户名存在表示验证通过，而在注册页面中如果用户名已经存在则不会允许注册该用户名，因为这会导致重复的用户名。

在 jQuery 中，对于 HTML 元素的选择有很多种方法，例如根据元素的 id 属性或是 class 属性。某个元素的焦点的失去会触发 `blur()` 方法，所以我们在该方法中检查用户名。

用户名的信息存储在后端数据库中，所以要请求后端服务器查询，这就用到了 AJAX 的异步请求，也就是说我们并不要更新整个页面，而只是检查一个元素的内容然后对某个元素做出变化。jQuery 中提供了对 AJAX 的支持，我们利用 post 方法将用户名作为参数提交给服务器，请求 URL 地址为 `/check_username/`，正如我们之前提到的，这个地址被影射到某个具体的视图，该视图查询数据库，并返回查询结果，即该用户名是否已经存在。

```javascript
    //用户名检查
    $('#username_login').blur(function() {
        $.post("/check_username/", $("#form_login").serialize(), function(data) {
            if (data["pass"] == "false") {
                $("#username_login").val("");
                $("#username_login").attr("placeholder": "用户名不存在");
                $('#username_login').focus();
            }
        })
    })
```

##### 登录验证

除了检查用户名外，点击登录或注册按钮提交表单时，要进行更全面的检查，比如密码是否匹配、邮箱是否符合标准等，如果验证失败就要阻止表单提交，并显示错误信息。

具体的做法是在按钮的 `click()` 方法中加入验证的程序，同样用 AJAX 的 Post 方式请求服务器数据，对长度、格式等信息则在本地检查。

验证失败是要阻止表单的提交，在表单的 `submit()` 方法中将返回值设置为 False。

验证成功后，直接请求后端服务器的 `/login/` 地址，并获得能否登录的通知，如果登录成功，则跳转到应用主页面。

```javascript
	$('#btn_login').click(function() {
        $.post("/check_passwd/", $("#form_login").serialize(), function(data, status) {
            if (data["pass"] == "false") {
                $("#password_login").val("");
                $("#password_login").attr("placeholder": "密码错误");
                $('#password_login').focus();
                return false;
            }
        })

        $.post("/login/", $("#form_login").serialize(), function(data) {
            if (data["pass"] == "true") {
                window.location.href = "/";
            } else {
                $("#username_login").val("");
                $("#password_login").val("");
                $('#username_login').focus();
            }
        })
    })
```

##### 添加联系人

点击添加按钮会自动弹出一个遮罩窗体，该窗体中具有两个输入框，分别输入用户名和分组名，点击确认按钮即可添加联系人，下面可以提示相关信息。

给添加按钮添加点击事件的响应，将联系人用户名和分组名作为参数请求服务器的对应方法，并将返回信息显示出来，每次点击按钮之后刷新联系人列表，不过这应该延时一段时间，因为服务器可能还没有将联系人添加完毕。

```javascript
    $('#addContactBtn').click(function () {
        $.post("/add_contact/", {
            contact: $('#inputContactName').val(),
            group: $('#inputContactGroup').val()
        }, function (data) {
            $('#contact_msg').html(data["msg"])
        })
        setTimeout(refresh_contact_list(), 500);
    })
```

##### 刷新

由于联系人信息会变化，所以提供了一个刷新联系人信息的功能，该功能首先清空所有联系人，然后请求服务器获取联系人和分组列表，并将返回的信息显示在页面上。这个功能在页面加载完毕的时候也要调用一次。

```javascript
var refresh_contact_list = function () {
        $('.contacts').html("");
        $('.groups').html("");
        $.post("/get_group_list/", function (data) {
            for (group in data)
                addGroup(group);
        })
        $.post("/get_contact_list/", function (data) {
            for (contact in data)
                addContact(contact, data[contact]);
        })
    }
```

对于联系人条目的动态添加，具体的做法是，在 HTML 中有一个模版元素，设置为隐藏，当需要添加元素时，就复制一个模版，并将其中的信息赋值为需要的信息，然后用 `append()` 方法将元素添加到联系人列表的末尾。

```javascript
    var addContact = function (name, info) {
        var $contacts, contact;
        $contacts = $('.' + info.group + ' .contacts');
        contact = new Contact({
            name: name,
            info: info
        });
        contact.draw();
        return $contacts.animate({scrollTop: $contacts.prop('scrollHeight')}, 300);
    }
```

##### 建立会话

在与联系人建立会话的过程是一方发起会话，发送消息，然后另一方接受到新消息提醒，并打开会话连接。因此会话连接是单向的，点击联系人头像或昵称就会向服务器发送建立连接请求，连接的建立实际上是在服务器记录一下该用户的当前对话方，其实这一点也可以在浏览器记录，效果是一样的。

需要注意的是，Js 添加的元素并不会被绑定事件监听器，解决的办法是利用 `on()` 方法在监听元素的父元素上设置监听。

```javascript
    $('.groups').on("click", ".name", function () {
        $.post("/chat_with_contact/", {contact: $(this).text()}, function (data) {
            if (data['response'] == "True")
                update_chat_box();
            else
                refresh_contact_list();
        });
    })
```

##### 发送消息

发送消息的逻辑比较简单，在点击发送按钮时，将输入框中的内容作为参数发送到服务器，而不需要将联系人作为参数，因为当前对话的联系人已经在服务器记录了。

服务器将调用相应的视图将该条消息插入到数据库中并与指定联系人相关联。

同时要生成一条新的消息元素，并插入到当前页面中，在聊天框右侧显示为发送的消息。

```javascript
        sendMessage = function (text) {
            $('.message_input').val('');    //清空消息框

            $.post("/push_message/", {"message": text}, function (data) {
                if (data['push'] == "False") 
                    showMessage("消息未发送", 'right');   
                else 
                    showMessage(text, 'right');
            })
        };
```

##### 请求消息

浏览器与服务器的地位是不对等的，消息存储于服务器，而服务器无法将消息直接发送给浏览器用户，因此，浏览器要定时去请求服务器检查是否有新消息的产生，我们采用的定时间隔为 1s，如果有新消息产生则返回最先的一条，前端收到消息后将新建一个消息元素，并显示在聊天框左侧。

```javascript
        receiveMessage = function () {
            $.post("/pull_message/", {}, function (data) {
                if (data['pull'] == "True") 
                    showMessage(data['message'], 'left');
            })
        };
        // 定时请求服务器，更新新消息
        setInterval(receiveMessage(), 1000);
```



### 4.5 移动端设计

#### 4.5.1 Cordova 工程

使用 Cordova 可以将基于 JS/HTML 的应用包装成在多种移动平台上的移动应用。我们已经完成了 Web 应用的开发，这使得编写移动应用变得非常简单，只需要稍微调整网页的布局即可完美适配移动平台。

首先要安装 Cordova 命令行工具，然后以 `cordova create` 命令建立一个新的工程，其中包含了一个测试的网页。再执行 `build` 命令将网页编译为指定的的移动平台安装包，打开模拟器即可进行测试。

#### 4.5.2 调整前端页面

即便 Cordova 帮我们做了绝大多数的工作，我们仍然需要对前端页面做一些调整，而且并不只是布局的问题。

首先一点区别是，原来我们的页面是存储于服务器之上的，浏览器输入 URL 地址来请求页面，服务器送回页面给浏览器渲染。而现在的情况是，我们的页面就是移动端的应用，而不是浏览器向服务器请求得来的，因此服务器给模版页面中添加的元素将不会正常工作。

其次移动端的窗口与浏览器大小相差悬殊，因此我们要修改布局使之适应移动端用户的使用习惯，Bootstrap 框架提供了很好的响应式布局，能够根据页面的尺寸动态调整页面元素。

下面简要介绍几个方面的调整。

##### 顶部菜单栏

浏览器页面中的菜单栏固定在顶部，占据了一定的空间，在移动端应用中我们将其收进下拉菜单中，节省了空间，更符合移动端应用的设计。

##### 标签页

浏览器页面中聊天框和联系人列表框左右横向排列，这显然在移动端是无法正常显示的，因为移动端屏幕是上下比左右宽的。所以采用标签页选项卡的布局方式，聊天框和联系人框分别是一个标签页，而应用界面只能显示一个标签页，点击联系人头像切换到聊天界面，在聊天界面中点击左上角的关闭按钮返回联系人页。

##### 请求方式

由于所有的前端页面都包涵在了移动端应用中，所以不需要像浏览器那样输入 URL 地址请求服务器上的页面，应用启动后直接进入登录界面，然后点击按钮后由 Post 请求验证，界面的跳转完全由前端控制。

 

## 5 测试与展示

##### 测试与应用展示见视频文件。



## 6 开发体会

##### 一些想说的话

时间这么快就来到了大三的期末，从刚开学时候就已经着手开始写这个项目了了，后来每周都会抽出时间写一写，到现在基本上完成了项目的开发。可以说这是我大学期间开发周期最长的一个课程项目了，不断学习尝试新的技术，对不满意的地方进行调整再调整，在这过程中产生了很多感触。

开始的时候对 Web 相关的技术只是一知半解，因为之前有用过 Django 这个框架开发过一个简单的网站，所以这次也就选用了这个框架。选好框架之后又大致看了一下这个框架的基本功能，然后着手搭建了项目的基本模型，并且利用仅有的前端知识搭出了一个登录页面。之后的时间基本就是有空就查查资料看看能用到什么技术，然后把技术边学边用到项目中，所以就这样一直持续到了期末，这期间使功能不断地完善了，基本的功能都已经实现，前端页面的美观度跟开始相比也有了质的飞跃。

虽然说项目的完善是持续螺旋上升的，但是其间也做过几次大的结构改动，这些改动都是经过了很长时间的思考的，在我看来，虽然这些改动影响了进度，但是对之后功能的开发还是有很大好处的，因为它们让项目整体的结构变得更清晰了。

除了大的改动，小的问题遇到了好多好多，可能有的问题查一查资料就解决了，有的棘手的问题无法解决又只好换一种方式避开这种问题。比较遗憾的是，这些开发中遇到的问题并没有及时地记录下来，在写设计文档的过程中，无法将开发过程中的方方面面都包涵进来，只能描述一下最后这个版本的实现方式，也就没有了自己开发思路的逻辑连贯性。现在看来这些问题也许是最宝贵的知识了，希望在之后项目中能养成记录问题的习惯，这样肯定是有利于技术的进步的。

这个项目的开发确实让我学到了很多新的知识，把以前的知识也都梳理了一下，可能现在看来它的功能并没有很多，其实主要的精力都放在了完善基本功能上，而不是一味地追求更多的功能，这是因为我觉得这样更有利于对技术的理解，尝试一个问题用不同技术解决的优劣。

这也许是对这个项目做的最后一点工作了，也可能之后有时间会进一步完善它，总之这次的开发经历让自己感到很有乐趣，同时也期望能取的好的成绩吧。








