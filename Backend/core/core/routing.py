from django.urls import path

from channels.routing import URLRouter
from WS.consumers import CodeConsumer

ws_application =[
    path('ws/code/', CodeConsumer.as_asgi()),
    
]