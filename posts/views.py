from django.template import Context, loader
from django.shortcuts import render_to_response, get_object_or_404
from ozanturgut.posts.models import Post
import urllib2
from django.http import HttpResponseRedirect, HttpResponse

def index(request):
    posts = Post.objects.filter(is_promoted_to_front_page=True).order_by('-date')[:10]
    return render_to_response('posts/index.html', {'posts': posts})

def post(request, slug):
    post = get_object_or_404(Post, pk=slug)
    return render_to_response('posts/post.html', {post:post})
    if(len(post.url) == 0):
        return HttpResponse(post.html)
    else:
        return redirect(post.url, permanent=True)