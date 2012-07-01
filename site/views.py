from django.template import Context, loader
from django.shortcuts import render_to_response, get_object_or_404, redirect
from ozanturgut.site.models import Post, Project
import urllib2
from django.http import HttpResponseRedirect, HttpResponse

def index(request):
    posts = Post.objects.order_by('-date')
    projects = Project.objects.order_by('-priority')
    return render_to_response('site/index.html', {'posts': posts, 'projects': projects})
