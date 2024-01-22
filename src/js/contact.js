document.addEventListener('DOMContentLoaded', function () {
    
    const idnameCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('login='));
    // Добавление обработчика события для отправки формы
    document.getElementById('contactForm').addEventListener('submit', function (event) {
        event.preventDefault();

        // Получение значений полей формы
         let idname = idnameCookie.split('=')[1];
         let idemail = document.getElementById('idemail').value;
         let message = document.getElementById('message').value;

        // Создание объекта FormData и добавление данных формы
        const formData = new FormData();
        formData.append('idname', idname);
        formData.append('idemail', idemail);
        formData.append('message', message);

        createSupport(formData);
        // Отправка данных на сервер методом POST
    });

    async function createSupport(formData) {
        // URL для отправки POST-запроса
        const url = '/api/create_support';

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
                document.location.href = "/";
                // Вывод результата в консоль для отладки
                console.log(result);
            } else {
                // Вывод ошибки при неудачном ответе
                console.error('Ошибка при отправке');
            }
        } catch (error) {
            // Вывод ошибки при возникновении исключения
            console.error('Ошибка:', error);
        }
    }
    // Функция для отображения уведомления
    function showNotification(message, isError = false) {
        var notificationElement = document.getElementById('notification');
        var notificationMessageElement = document.getElementById('notificationMessage');

        // Установка текста уведомления
        notificationMessageElement.textContent = message;

        // Установка цвета уведомления в зависимости от успешности операции
        notificationElement.style.backgroundColor = isError ? '#f44336' : '#4CAF50';
        notificationElement.style.display = 'block';

        // Добавление обработчика события для закрытия уведомления
        document.getElementById('closeNotification').addEventListener('click', function () {
            notificationElement.style.display = 'none';
        });
    }
});
