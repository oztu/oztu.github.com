from ozanturgut.site.models import Project, Post
from django.contrib import admin

class PostAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("title",)}
    list_display = ('title', 'added')
    list_filter = ['added']
    date_hierarchy = 'added'

admin.site.register(Post, PostAdmin)


class ProjectAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("title",)}
    list_display = ('title', 'priority')
    list_filter = ['priority']
    date_hierarchy = 'added'

admin.site.register(Project, ProjectAdmin)