from django.db import models
from datetime import datetime

class Post(models.Model):
    added = models.DateTimeField(auto_now_add=True, db_index=True)
    slug = models.SlugField(primary_key=True, max_length=64, db_index=True)
    url = models.CharField(max_length=140, blank=True)    
    title = models.CharField(max_length=140, blank=True, db_index=True)
    title_card = models.ImageField(blank=True, upload_to='/static/image/title-card/')
    
    def __unicode__(self):
        return self.title

class Project(models.Model):
    added = models.DateTimeField(auto_now_add=True)
    priority = models.PositiveIntegerField(default='1', db_index=True)
    slug = models.SlugField(primary_key=True, max_length=64, db_index=True)
    url = models.CharField(max_length=140, blank=True)    
    title = models.CharField(max_length=140, blank=True, db_index=True)
    title_card = models.ImageField(blank=True, upload_to='/static/image/title-card/')

    def __unicode__(self):
        return self.title
	