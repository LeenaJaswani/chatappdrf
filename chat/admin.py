from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from chat.models import User, Profile, ChatMessage
from django.contrib.auth.hashers import make_password

class UserAdmin(admin.ModelAdmin):
    
    list_display = ['username', 'email']
   
    def save_model(self, request, obj, form, change):
       
        if 'password' in form.changed_data:
            obj.password = make_password(obj.password)
        super().save_model(request, obj, form, change)

class ProfileAdmin(admin.ModelAdmin):
    list_editable = ['verified']
    list_display = ['user', 'id','full_name' ,'verified']



class ChatMessageAdmin(admin.ModelAdmin):
    list_editable = ['is_read', 'message']
    list_display = ['user','sender', 'receiver', 'is_read', 'message']

admin.site.register(User, UserAdmin)
admin.site.register( Profile,ProfileAdmin)
admin.site.register( ChatMessage,ChatMessageAdmin)

