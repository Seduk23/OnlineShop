import getpass
import subprocess
import datetime

def dump_database(host, port, username, password, database, output_file):
    # Получение пароля пользователя без отображения ввода
    password_input = getpass.getpass(prompt=f"Введите пароль для пользователя {username}: ")

    # Подготовка команды для выполнения дампа
    dump_command = [
        r'C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqldump.exe',
        '--host', host,
        '--port', str(port),
        '--user', username,
        f'--password={password_input}',
        '--result-file', output_file,
        database,
    ]

    # Запуск процесса дампа базы данных
    process = subprocess.Popen(dump_command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    stdout, stderr = process.communicate()

    # Обработка результатов выполнения дампа
    if process.returncode != 0:
        print(f"Ошибка при выполнении дампа базы данных:\n{stderr.decode('utf-8')}")
    else:
        print(f"Дамп базы данных успешно создан в файле: {output_file}")

if __name__ == "__main__":
    # Параметры базы данных
    db_host = 'localhost'
    db_port = '3306'
    db_username = 'root'
    db_name = 'shop'

    # Генерация временного штампа для имени файла дампа
    timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    dump_filename = f"database_dump_{timestamp}.sql"

    # Выполнение дампа базы данных
    dump_database(db_host, db_port, db_username, None, db_name, dump_filename)
