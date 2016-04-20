from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User


# Create your models here.


class Person(User):
    nickname = models.CharField(max_length=30)
    def __unicode__(self):
        return self.username

class Contact(models.Model):
    person = models.ForeignKey(Person)


