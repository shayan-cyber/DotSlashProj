from django.contrib import admin

# Register your models here.
from . models import Playground, OpenTokSession
# Register your models here.
admin.site.register(Playground)
admin.site.register(OpenTokSession)
