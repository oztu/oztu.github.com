from ozanturgut.posts.models import Post
from django.contrib import admin

class PostAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("title",)}
    list_display = ('title', 'date')
    list_filter = ['date']
    date_hierarchy = 'date'

admin.site.register(Post, PostAdmin)