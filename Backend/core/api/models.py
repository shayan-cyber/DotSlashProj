from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Playground(models.Model):
    owner = models.OneToOneField(User, on_delete=models.CASCADE)
    members = models.ManyToManyField(User, related_name='members')
    timestamp = models.DateTimeField(auto_now_add = True)
    code = models.TextField(default="")
    def __str__(self):
        return self.owner.username


class OpenTokSession(models.Model):
    owner = models.OneToOneField(User, on_delete=models.CASCADE, related_name='session')
    session_id = models.CharField(max_length=100,blank= True, null=True)
    token = models.CharField(max_length=100, blank=True, null=True)
    def __str__(self):
        return self.owner.username