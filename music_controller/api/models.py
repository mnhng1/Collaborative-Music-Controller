from django.db import models
import string 
import random
# Create your models here.

def generate_unique_code():
    length = 6
    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length)) #Generate a random code with "k" length with all ASCII Upper Case
        if Room.objects.filter(code=code).count() == 0:
            break
    return code


class Room(models.Model):
    code = models.CharField(max_length = 8, default = generate_unique_code, unique = True)
    host = models.CharField(max_length= 50, unique=True)
    guest_can_pause = models.BooleanField(null=False, default = False) 
    votes_to_skip = models.IntegerField(null = False, default =1)
    created_at = models.DateTimeField(auto_now_add=True) #Auto register time that the room was createds
    current_song = models.CharField(max_length=50, null = True)
    platform = models.CharField(max_length=50, default = 'spotify') 
    guests = models.ManyToManyField('Guest', related_name='rooms', blank=True)

class Guest(models.Model):
    session_key = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=50)
    def __str__(self):
        return self.name


    


