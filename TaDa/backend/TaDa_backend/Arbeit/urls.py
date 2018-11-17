from django.urls import path 
from Arbeit import views

urlpatterns = [
	path('', views.arbeit_list, name='arbeit_list'),
	path('<int:arbeit_id>', views.arbeit_detail, name='arbeit_detail'),
	path('token', views.token, name='token'),
]
