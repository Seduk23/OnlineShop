def render_template(template_name, context={}):
     # Открытие файла шаблона для чтения
    with open(template_name, 'r', encoding='utf-8') as f:
        # Чтение содержимого файла
        html_str = f.read()

        # Форматирование шаблона с использованием переданного контекста
        html_str = html_str.format(**context)

    # Возвращение отформатированного HTML-шаблона
    return html_str