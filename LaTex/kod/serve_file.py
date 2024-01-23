import mimetypes

def serve_file(path, start_response):
    # Изменение пути, удаляя первый символ '/', чтобы избежать перехода на вышестоящий уровень
    new_path = path.replace('/', '', 1)
    
    try:
        # Чтение содержимого файла
        with open(new_path, 'rb') as f:
            content = f.read()

        # Определение MIME-типа файла
        mime_type, _ = mimetypes.guess_type(new_path)
        if mime_type is None:
            mime_type = 'application/octet-stream'
        
        # Установка статуса ответа и заголовков
        start_response("200 OK", [("Content-type", mime_type)])

        # Возвращение содержимого файла
        return [content]
    except FileNotFoundError:
        # Обработка случая, когда файл не найден
        start_response("404 Not Found", [("Content-type", "text/plain")])
        return [b"404 Not Found"]

def serve_static_file(path, start_response):
   
    # Проверка, что путь начинается с "/src/"
    if path.startswith("/src/"):
        # Передача запроса на обслуживание статического файла
        return serve_file(path, start_response)