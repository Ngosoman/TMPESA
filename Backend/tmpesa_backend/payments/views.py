from django.shortcuts import render

# Create your views here.
import requests
from django.conf import settings

def initiate_stk_push(amount, phone_number):
    url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"  # Use live URL for prod
    headers = {"Authorization": f"Bearer {get_access_token()}"}
    payload = {
        "BusinessShortCode": settings.MPESA_SHORTCODE,
        "Password": generate_password(),
        "Timestamp": get_timestamp(),
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phone_number,
        "PartyB": settings.MPESA_SHORTCODE,
        "PhoneNumber": phone_number,
        "CallBackURL": settings.MPESA_CALLBACK_URL,
        "AccountReference": "TMPESA",
        "TransactionDesc": "Deposit"
    }
    response = requests.post(url, json=payload, headers=headers)
    return response.json()