from waitress import serve
from templates_view.home_view import HomeView
from templates_view.contact_us_view import ContactUsView
from templates_view.about_view import AboutView
from templates_view.courses_view import CoursesView
from templates_view.user_view import UserView
from render_template import render_template
from serve_file import serve_static_file
from get_json.get_json import GetCourses
from templates_view.login_view import LoginView
from get_json.get_user import GetUsers
from templates_view.payment_view import PaymentView
from db.connect import create_order, create_user, create_support
import mimetypes
import cgi

# Словарь URL-маршрутов, связывающих пути с соответствующими представлениями
urls = {
    '/': HomeView,                  # Главная страница
    '/contact': ContactUsView,      # Страница контактов       
    '/about' : AboutView,           # Страница "О нас"
    '/api/courses' : GetCourses,    # API для получения курсов
    '/courses/' : CoursesView,      # Страница курсов
    '/api/user': GetUsers,          # API для получения user
    '/login' : LoginView,           # Страница входа
    '/payment': PaymentView,        # Страница оплаты
    '/profile': UserView            # Страница профиля
}

def app(environ, start_response):
    # Получение пути из окружения запроса
    path = environ.get("PATH_INFO")

    # Обработка POST-запроса для создания заказа
    if environ['REQUEST_METHOD'] == 'POST' and path == '/api/create_order':
        form = cgi.FieldStorage(fp=environ['wsgi.input'], environ=environ)
        username = form.getvalue('username', '')
        email = form.getvalue('email', '')
        course = form.getvalue('course', '')
        create_order(username, email, course)
        start_response("200 OK", [("Content-type", "application/json")])
        return [b'{"status": "success"}']
    
    if environ['REQUEST_METHOD'] == 'POST' and path == '/api/create_support':
        form = cgi.FieldStorage(fp=environ['wsgi.input'], environ=environ)
        idname = form.getvalue('idname', '')
        idemail = form.getvalue('idemail', '')
        message = form.getvalue('message', '')
        create_support(idname, idemail, message)
        start_response("200 OK", [("Content-type", "application/json")])
        return [b'{"status": "success"}']

    # Обработка POST-запроса для создания пользователя
    if environ['REQUEST_METHOD'] == 'POST' and path == '/api/create_user':
        form = cgi.FieldStorage(fp=environ['wsgi.input'], environ=environ)
        login = form.getvalue('login', '')
        password_user = form.getvalue('password_user', '')
        create_user(login, password_user)
        start_response("200 OK", [("Content-type", "application/json")])
        return [b'{"status": "success"}']
    
    # Определение класса представления на основе пути запроса
    if path.startswith("/courses/") and "/courses/" in urls:
        view_class = urls["/courses/"]
    else:
        view_class = urls.get(path)
        
    # Обработка запроса на основе класса представления
    if view_class:
        view_instance = view_class()
        data = view_instance.get(environ)
        data = data.encode("utf-8")
    else:
        # Обработка статических файлов или вывод страницы 404
        response = serve_static_file(path, start_response)
        if response:
            return response
        data = render_template(template_name='templates/404.html', context={})
        data = data.encode("utf-8")

    # Определение MIME-типа и кодировки для ответа
    mime_type, encoding = mimetypes.guess_type(path)
    content_type = mime_type if mime_type else 'text/html'
    if encoding:
        content_type += f'; charset={encoding}'
    
    # Установка статуса ответа и заголовков
    start_response("200 OK", [("Content-type", content_type)])
    
    # Возвращение тела ответа
    return iter([data])

if __name__ == "__main__":
    # Запуск сервера приложения
    serve(app)
