from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    mpesa_number = models.CharField(max_length=15, unique=True)
    deriv_account_id = models.CharField(max_length=50, unique=True)
    