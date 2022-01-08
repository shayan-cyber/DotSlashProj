from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.db import database_sync_to_async
from api.models import Playground
from django.contrib.auth.models import User
# from django.shortcuts import get_or_create


class CodeConsumer(AsyncJsonWebsocketConsumer):

    @database_sync_to_async
    def add_user(self, user,groupname):
        print("doinggg")
        owner_obj = User.objects.get(username=groupname)
        group,created = Playground.objects.get_or_create(owner=owner_obj)
        user_obj = User.objects.get(username=user)
        group.members.add(user_obj)
        group.save()
        return group
    @database_sync_to_async
    def make_playground(self,user):
        user = User.objects.get(username=user)
        playground, created = Playground.objects.get_or_create(owner=user)
        print(playground)
        return playground
    
    @database_sync_to_async
    def save_code(self, code, groupname):
        playground = Playground.objects.filter(owner__username=groupname)
        if(playground):
            playground = playground[0]
            playground.code = code
            playground.save()
            return playground


        
    async def connect(self):
        await self.accept()

    async def receive_json(self, content):
        data = content
        if data['command'] == 'join':
            members =[]
            
            await self.channel_layer.group_add(
                data['groupname'],
                self.channel_name
            )
            print("user added")
            print(data['groupname'])
            print(data['user_name'])
            if(data['user_name'] != data['groupname']):
                for i in members:
                    if i != data['user_name']:
                        members.append(data['user_name']) 
                print("not owner")
                print(members)
                playground = await self.add_user(data['user_name'],data['groupname'])
                
            else:
                print("owner")
                print(data['groupname'])
                playground =  await self.make_playground(data['groupname'])
        elif data['command'] == 'send' :
          
            print("no auth")

            playground = await self.save_code(data['message'],data['groupname'])
            await self.channel_layer.group_send(
                data['groupname'],
                {
                    'type':'code.message', #this should be a function . means _ 
                    'message':data['message'],
                    'token':data['token'],
                    'username':data['user_name']
                }
            )
            print(data)
                
            # print(self.scope['user'])
    async def disconnect(self,msg):
        print("disconnect")
    async def code_message(self,event):
        await self.send_json({
            'message':event['message'],
            'token':event['token'],
            'username':event['username']

        })





class WhiteboardConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        await self.accept()
    async def wb_message(self,event):
        await self.send_json({
            'token':event['token'],
            'username':event['username'],
            'command':'canvas-data',
            'data':event['data']

        })
    async def wb_clear(self,event):
        await self.send_json({
            'token':event['token'],
            'username':event['username'],
            'command':'canvas-clear'
        })
    
    async def receive_json(self, content):
        data = content
        if data['command'] == 'join':
            print("join")
            await self.channel_layer.group_add(
                data['groupname'],
                self.channel_name
            )
        elif data['command'] == 'canvas-data':
            print("canvas-data")
            await self.channel_layer.group_send(
                data['groupname'],
                {
                    'type':'wb_message',
                    'token':data['token'],
                    'username':data['user_name'],
                    'data':data['data']
                }
            )
        elif data['command']== 'canvas-clear':
            print("canvas-clear")
            await self.channel_layer.group_send(
                data['groupname'],
                {
                    'type':'wb_clear',
                    'token':data['token'],
                    'username':data['user_name']

                }
            )
    async def disconnect(self,msg):
        print("disconnect")