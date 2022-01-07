from django.db import models

# Create your models here.
from django.contrib.auth.models import User


class Playground(models.Model):
    owner = models.OneToOneField(User, on_delete=models.CASCADE)
    members = models.ManyToManyField(User, related_name='members')
    timestamp = models.DateTimeField(auto_now_add = True)
    code = models.TextField(default="")
    def __str__(self):
        return self.owner.username