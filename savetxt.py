import codecs
def save_to_file(name, email, message):
     # Открытие файла для добавления данных
    with codecs.open('form_data.txt', 'w', encoding='utf-8') as file:
        # Запись данных в файл
        file.write(f"Name: {name}\nEmail: {email}\nMessage: {message}\n\n")