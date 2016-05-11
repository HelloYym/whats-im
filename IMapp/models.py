from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User


# Create your models here.

# class User(models.Model):
#     username = models.CharField(max_length=15)
#     password = models.CharField(max_length=15)
#     email = models.EmailField()
#     login = models.BooleanField()
#     def __unicode__(self):
#         return self.username


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nickname = models.CharField(max_length=10)
    icon = models.FileField('icon/')

    def __unicode__(self):
        return self.user


class Contact(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    contact = models.CharField(max_length=20)
    # contact = models.ForeignKey(User, on_delete=models.CASCADE)

    def __unicode__(self):
        return self.contact


class Message(models.Model):
    contact = models.ForeignKey(Contact, on_delete=models.CASCADE)
    message = models.TextField()
    date = models.DateTimeField(null=True)
    receive = models.BooleanField(default=False)
    state = models.BooleanField(default=False)

