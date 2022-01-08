from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view 
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from . models import Playground


from . serializers import (
    UserSerializer,
    PlaygroundSerializer
)

# Create your views here.
@api_view(['POST'])
def register(request):
    data = request.data
    serializer = UserSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        # print(serializer.data)
        user_obj = get_object_or_404(User, id = serializer.data['id'])
        token = get_object_or_404(Token, user = user_obj)

        return Response({"serializer-data":serializer.data, "token":token.key, "username":user_obj.username}, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




@api_view(['POST'])
def get_user_details(request):
    data = request.data
    token_key = data['token']
    token = get_object_or_404(Token, key = token_key)
    user_obj = token.user
    serializer = UserSerializer(user_obj)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_playground_details(request,name):
    # playground = get_object_or_404(Playground, owner__username = name)
    playground = Playground.objects.filter(owner__username = name)
    if(playground):

        serializer = PlaygroundSerializer(playground[0])
        # print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response({"message":"No playground found"}, status=status.HTTP_404_NOT_FOUND)


from . utils import send_wa_msg
@api_view(['POST'])
def invite_others(request):
    try:
        data = request.data
        phone_no = data['no'] 
        link = data['link']
        s= "Someone has invited you to join the CodeTogether Room. Please click on the link to join the room " +" \n " + str(link)
        send_wa_msg(s)
        return Response({"message":"Invitation sent"}, status=status.HTTP_200_OK)
    except:
        return Response({"message":"Something went wrong"}, status=status.HTTP_400_BAD_REQUEST)