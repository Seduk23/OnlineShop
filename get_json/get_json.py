from db.connect import get_products_from_db
class GetCourses:
    def get(self, environ):
        # Использование функции для получения курсов из базы данных
        return get_products_from_db()
