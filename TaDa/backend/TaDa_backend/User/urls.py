from django.urls import path
from User import views

urlpatterns = [
    path('signup', views.signup, name='signup'),
    path('signin', views.signin, name='signin'),
    path('signout', views.signout, name='signout'),
    path('employee/<int:employee_id>', views.employee_info, name='employee'),
    path('employer/<int:employer_id>', views.employer_info, name='employer'),
    path('token', views.token, name='token')
]
