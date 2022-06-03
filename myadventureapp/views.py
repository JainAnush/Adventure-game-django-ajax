from django.shortcuts import render
from django.core.serializers import serialize
import json
import random
from django.http import HttpResponse


def showGameRulesPage(request):
    return render(request,'gamerules.html')
def startgame(request):
    return render(request,'game.html')
def generate_secret_destination(request):
    dest_x=random.randint(1,3)
    dest_y=random.randint(1,3)
    response={'dest_x':dest_x,'dest_y':dest_y}
    json_response=json.dumps(response,indent=3)
    return HttpResponse(json_response,content_type="application/json")


def getuserlocation(request):
    destx=int(request.GET['destx'])
    desty=int(request.GET['desty'])
    length=int(request.GET['length'])
    direction=int(request.GET['direction'])
    userx=int(request.GET['userx'])
    usery=int(request.GET['usery'])
    if direction==1:
        usery+=length
    elif direction==2:
        userx+=length
    elif direction==3:
        usery-=length
    else:
        userx-=length    
    print("destx=",destx)
    print("desty=",desty)
    print("userx=",userx)
    print("usery=",usery)
    print("direction=",direction)
    print("length=",length)
    x_reached=-1
    y_reached=-1
    if destx==userx :
        x_reached=1
    if desty==usery:
        y_reached=1
    if destx>userx:
        x_reached=0
    if destx<userx:
        x_reached=2
    if desty>usery:
        y_reached=0
    if desty<usery:
        y_reached=2 
    response={'x_reached':x_reached,'y_reached':y_reached,'updated_userx':userx,'updated_usery':usery}
    json_response=json.dumps(response,indent=3)
    return HttpResponse(json_response,content_type="application/json")               


def quitgame(request):
    return render(request,'thankyou.html')

