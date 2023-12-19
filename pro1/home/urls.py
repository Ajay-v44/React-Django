from rest_framework import routers
from .views import *
router = routers.DefaultRouter()
router.register(r'api/todos', TodoViewssets, 'todos')
urlpatterns = router.urls
