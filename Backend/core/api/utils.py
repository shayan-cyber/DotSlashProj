import requests
import os
from twilio.rest import Client
def send_wa_msg(s):
    account_sid = 'AC5473461a6f2bf3656222a912f4249936'
    auth_token = '5a071453118b01360d0281955726e616'
    client = Client(account_sid, auth_token)
    print("sending...")

    message = client.messages \
        .create(
            body=str(s),
            from_='whatsapp:+14155238886',
            to='whatsapp:+919365456645'
        )