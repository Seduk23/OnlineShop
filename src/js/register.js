(function () {
    // Объявление переменных для хранения логина и пароля пользователя
    let login;
    let password_user;
    // Обработчик события для формы регистрации
    document.getElementById("registerForm").addEventListener('submit', function (event) {
        // Предотвращение отправки формы по умолчанию
        event.preventDefault();
        // Получение значений логина и пароля пользователя из полей формы
        login = document.getElementById('login').value;
        password_user = document.getElementById('passwordUser').value;
        // Вывод логина и пароля в консоль для отладки
        console.log(login);
        console.log(password_user);
        // Создание объекта FormData для передачи данных формы
        const formData = new FormData();
        formData.append('login', login);
        formData.append('password_user', password_user);
        // Вызов функции для создания пользователя с использованием отправки POST-запроса
        createUser(formData);
    });
    // Асинхронная функция для создания пользователя
    async function createUser(formData) {
        // URL для отправки POST-запроса
        const url = '/api/create_user';

        try {
            // Отправка POST-запроса с использованием fetch
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });
            // Проверка успешности ответа
            if (response.ok) {
                // Обработка успешного ответа, получение JSON-данных
                const result = await response.json();
                // Установка куки с логином и паролем пользователя
                document.cookie = `login=${login}; path=/`;
                document.cookie = `pass=${password_user}; path=/`;
                // Перенаправление на главную страницу
                document.location.href = "/";
                // Вывод результата в консоль для отладки
                console.log(result);
            } else {
                // Вывод ошибки при неудачном ответе
                console.error('Ошибка при регистрации');
            }
        } catch (error) {
            // Вывод ошибки при возникновении исключения
            console.error('Ошибка:', error);
        }
    }
})();
