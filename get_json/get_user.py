from db.connect import get_user_from_db
class GetUsers:
    def get(self, environ):
        # Использование функции для получения пользователей из базы данных
        return get_user_from_db()