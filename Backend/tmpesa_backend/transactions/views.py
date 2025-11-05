from django.shortcuts import render

# Create your views here.
import requests

def fund_deriv_account(user, amount_usd):
    # Use Deriv API to deposit
    url = "https://api.deriv.com/v3/accounts/deposit"  # Adjust endpoint
    headers = {"Authorization": f"Bearer {settings.DERIV_API_KEY}"}
    payload = {"account_id": user.deriv_account_id, "amount": amount_usd}
    response = requests.post(url, json=payload, headers=headers)
    return response.json()

def withdraw_from_deriv(user, amount_usd):
    # Similar for withdrawal
    pass