import requests
import os
from twilio.rest import Client
def send_wa_msg(s):
    account_sid = 'Your SID'
    auth_token = '#your token'
    client = Client(account_sid, auth_token)
    print("sending...")

    message = client.messages \
        .create(
            body=str(s),
            from_='whatsapp:+14155238886',
            to='whatsapp:+919365456645'
        )