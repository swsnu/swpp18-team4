from django.urls import path 
from Arbeit import views

urlpatterns = [
	path('arbeit/', views.arbeit_list, name='arbeit_list'),
	path('arbeit/<int:arbeit_id>/', views.arbeit_detail, name='arbeit_detail'),
	path('token/', views.token, name='token'),
]
