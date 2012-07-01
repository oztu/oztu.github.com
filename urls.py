from django.conf.urls.defaults import *

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    (r'^admin/', include(admin.site.urls)),
    (r'^$', 'ozanturgut.site.views.index'),
    (r'^(?P<slug>[\w\-]+)(/|$)', 'ozanturgut.site.views.post'),
)
