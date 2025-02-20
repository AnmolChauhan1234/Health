from django.contrib import admin
from .models import BillHistory

class BillHistoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'patient', 'hospital', 'billing', 'total_amount', 'status', 'updated_at')
    search_fields = ('patient__user__full_name', 'hospital__name', 'billing__id', 'status')
    list_filter = ('status', 'updated_at')

admin.site.register(BillHistory, BillHistoryAdmin)
