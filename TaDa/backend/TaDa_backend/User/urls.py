from django.urls import path
from User import views

urlpatterns = [
    path('authenticate/<str:email>', views.authenticate_email, name='email'),
    path('signup', views.signup, name='signup'),
    path('signin', views.signin, name='signin'),
    path('signout', views.signout, name='signout'),
    #path('user/<int:user_id>', views.user, name='user'),
    #path('employee/<int:employee_id>', views.employee_info, name='employee_info'),
    #path('employer', views.employer_list, name='employer_list'),
    #path('employer/<int:employer_id>', views.employer_info, name='employer_info'),
    path('token', views.token, name='token')
]