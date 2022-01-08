from django.urls import path

from channels.routing import URLRouter
from WS.consumers import (
    CodeConsumer,
    WhiteboardConsumer
    )

ws_application =[
    path('ws/code/', CodeConsumer.as_asgi()),
    path('ws/whiteboard/',WhiteboardConsumer.as_asgi()),
    
]