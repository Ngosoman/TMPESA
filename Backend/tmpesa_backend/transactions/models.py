from django.db import models

# Create your models here.
from django.db import models
from users.models import CustomUser

class Wallet(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    kes_balance = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    usd_balance = models.DecimalField(max_digits=10, decimal_places=2, default=0)

class Transaction(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    amount_kes = models.DecimalField(max_digits=10, decimal_places=2)
    amount_usd = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_type = models.CharField(max_length=10, choices=[('deposit', 'Deposit'), ('withdraw', 'Withdraw')])
    status = models.CharField(max_length=20, default='pending')
    timestamp = models.DateTimeField(auto_now_add=True)