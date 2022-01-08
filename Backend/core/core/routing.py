from django.urls import path

from channels.routing import URLRouter
from WS.consumers import (
    CodeConsumer,
    WhiteboardConsumer,
    ChatConsumer,
    )

ws_application =[
    path('ws/code/', CodeConsumer.as_asgi()),
    path('ws/whiteboard/',WhiteboardConsumer.as_asgi()),
    path('ws/chat/',ChatConsumer.as_asgi()),
    
]