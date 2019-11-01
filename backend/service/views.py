from django.shortcuts import render
from django.http import JsonResponse


def uppercase_text(request):
    text = request.GET.get("text", "")

    return JsonResponse({"uppercase_text": text.upper()})
