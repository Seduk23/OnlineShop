import pymysql
import json
import base64
import pymysql.cursors
from db.config_db import user, host, password, db_name
import json
import pymysql

def get_products_from_db():
    json_product = []
    try:
        # Подключение к базе данных
        connection = pymysql.connect(
            host=host,
            port=3306,
            user=user,
            password=password,
            database=db_name,
            cursorclass=pymysql.cursors.DictCursor
        )
        print("Successfully connected")

        try: 
            with connection.cursor() as cursor:
                # Выполнение запроса на выборку всех записей из таблицы 'products'
                select_all_rows = "SELECT * FROM `products`"
                cursor.execute(select_all_rows)
                rows = cursor.fetchall()

                # Обработка полученных данных
                for row in rows:
                    json_product.append(row)

                # Декодирование изображений, представленных в формате base64
                for product in json_product:
                    image_data = product['images'].decode('utf-8')
                    product['images'] = image_data

                # Преобразование данных в формат JSON
                json_string = json.dumps(json_product)
                return json_string
                
        finally:
            # Закрытие соединения с базой данных
            connection.close()

    except Exception as ex:
        print("Connection refused...")
        print(ex)
        
def get_user_from_db():
    topics = []
    try:
        connection = pymysql.connect(
            host=host,
            port=3306,
            user=user,
            password=password,
            database=db_name,
            cursorclass=pymysql.cursors.DictCursor
        )
        print("Successfully connected to the database")

        try: 
            with connection.cursor() as cursor:
                select_all_rows = "SELECT * FROM `user`"
                cursor.execute(select_all_rows)
                rows = cursor.fetchall()
                for row in rows:
                    topics.append(row)
                json_string = json.dumps(topics)
                print(json_string)
                return json_string 
        finally:
            connection.close()

    except Exception as ex:
        print("Connection refused...")
        print(ex)


def create_order(username, email, course):
    try:
        connection = pymysql.connect(
            host=host,
            port=3306,
            user=user,
            password=password,
            database=db_name,
            cursorclass=pymysql.cursors.DictCursor
        )
        print("successfully connected")

        try:
            with connection.cursor() as cursor:
                create_order_query = "INSERT INTO `courses_order` (`username`,`email`,`course`) VALUES (%s,%s,%s)"
                cursor.execute(create_order_query, (username, email, course))
                connection.commit()
                print("Order created:", cursor.lastrowid)
        finally:
            connection.close()

    except Exception as ex:
        print("Connection refused...")
        print(ex)


def create_user(login, password_user):
    try:
        connection = pymysql.connect(
            host=host,
            port=3306,
            user=user,
            password=password,
            database=db_name,
            cursorclass=pymysql.cursors.DictCursor
        )
        print("successfully connected")

        try:
            with connection.cursor() as cursor:
                create_user_query = "INSERT INTO `user` (`login`, `pass`) VALUES (%s, %s)"
                cursor.execute(create_user_query, (login, password_user))
                connection.commit()
                print("User created:", cursor.lastrowid)
        finally:
            connection.close()

    except Exception as ex:
        print("Connection refused...")
        print(ex)

def create_support(idname, idemail, message):
    try:
        connection = pymysql.connect(
            host=host,
            port=3306,
            user=user,
            password=password,
            database=db_name,
            cursorclass=pymysql.cursors.DictCursor
        )
        print("successfully connected")

        try:
            with connection.cursor() as cursor:
                create_support_query = "INSERT INTO `support` (`idname`,`idemail`,`message`) VALUES (%s,%s,%s)"
                cursor.execute(create_support_query, (idname, idemail, message))
                connection.commit()
                print("Support created:", cursor.lastrowid)
        finally:
            connection.close()

    except Exception as ex:
        print("Connection refused...")
        print(ex)