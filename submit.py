import json
import cgi
from savetxt import save_to_file

def submit_form(environ, start_response):
    try:
        # Извлечение данных формы из запроса
        form = cgi.FieldStorage(fp=environ['wsgi.input'], environ=environ, keep_blank_values=True)

        # Извлечение значений полей из формы
        names = form.getlist('name')
        emails = form.getlist('email')
        messages = form.getlist('message')
        
        # Сохранение данных в файл
        for name, email, message in zip(names, emails, messages):
            save_to_file(name, email, message)
        
        # Подготовка успешного ответа в формате JSON
        response_data = {'success': True, 'message': 'Форма успешно отправлена!'}
        response_body = json.dumps(response_data).encode('utf-8')

        # Установка статуса ответа и заголовков
        status = '200 OK'
        headers = [('Content-type', 'application/json'), ('Content-Length', str(len(response_body)))]

        start_response(status, headers)
        return [response_body]

    except Exception as e:
        # Обработка ошибки и подготовка ответа в формате JSON
        response_data = {'success': False, 'message': 'Ошибка при обработке формы: {}'.format(str(e))}
        response_body = json.dumps(response_data).encode('utf-8')

        # Установка статуса ответа и заголовков для ошибки сервера
        status = '500 Internal Server Error'
        headers = [('Content-type', 'application/json'), ('Content-Length', str(len(response_body)))]

        start_response(status, headers)
        return [response_body]