import json
from db.connect import create_order

def app(environ, start_response):
    try:
        # Получаем данные POST-запроса
        content_length = int(environ.get('CONTENT_LENGTH', 0))
        post_data = environ['wsgi.input'].read(content_length)
        data = json.loads(post_data.decode('utf-8'))

        # Выводим информацию о полученных данных
        print("Received data:", data)

        # Получаем email из данных запроса
        user_email = data.get('email')

        # Выводим информацию перед вставкой в базу данных
        print("Inserting email:", user_email)

        # Вставляем email в базу данных
        create_order(user_email)

        # Возвращаем успешный ответ
        start_response("201 Created", [("Content-type", "application/json")])
        return [json.dumps({'message': 'Email saved successfully'}).encode("utf-8")]

    except Exception as ex:
        print("Error saving email:", ex)
        start_response("500 Internal Server Error", [("Content-type", "application/json")])
        return [json.dumps({'error': 'Internal Server Error'}).encode("utf-8")]

if __name__ == "__main__":
    from waitress import serve
    serve(app)
