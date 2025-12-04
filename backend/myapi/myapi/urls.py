# apps/api/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views_auth import LoginView, RefreshView
from core.views_reminders import (
    ReminderListCreateView,
    ReminderRetrieveUpdateDeleteView,
    ReminderMarkDoneView
)
from core.view_provider import ProviderDashboardView, AssignPatientView
from core.view_profile import ProfileView

router = DefaultRouter()

urlpatterns = [
    # Auth
    path('auth/login/', LoginView.as_view(), name='auth_login'),
    path('auth/refresh/', RefreshView.as_view(), name='auth_refresh'),

    # Router (rest of API)
    path('', include(router.urls)),
    path("reminders/", ReminderListCreateView.as_view(), name="reminders_list_create"),
    path("reminders/<str:pk>/", ReminderRetrieveUpdateDeleteView.as_view(), name="reminder_rud"),
    path("reminders/<str:pk>/done/", ReminderMarkDoneView.as_view(), name="reminder_done"),
    path("provider/dashboard/", ProviderDashboardView.as_view(), name="provider_dashboard"),
    path("provider/assign/", AssignPatientView.as_view(), name="assign_patient"),
    path("profile/", ProfileView.as_view(), name="profile"),
]
