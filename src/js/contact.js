document.addEventListener('DOMContentLoaded', function () {
    localStorage.clear();
    // Добавление обработчика события для отправки формы
    document.getElementById('contactForm').addEventListener('submit', function (event) {
        event.preventDefault();

        // Получение значений полей формы
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var message = document.getElementById('message').value;

        // Создание объекта FormData и добавление данных формы
        var formData = new FormData(this);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('message', message);

        // Отправка данных на сервер методом POST
        fetch('/submit_form', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                // Обработка ответа сервера и отображение уведомления
                if (data.success) {
                    showNotification('Ваш вопрос успешно отправлен!');
                } else {
                    showNotification('Произошла ошибка при отправке формы: ' + data.message, true);
                }
            })
            .catch(error => {
                // Обработка ошибки при отправке запроса и отображение уведомления
                showNotification('Произошла ошибка при отправке запроса: ' + error, true);
            });
    });

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
