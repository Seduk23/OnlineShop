(function () {
    // Получение значения куки с именем пользователя
    const usernameCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('login='));

    // Добавление обработчика события для кнопки оплаты
    document.getElementById("payButton").addEventListener('click', function () {
        // Получение значений стоимости и email пользователя из соответствующих полей формы
        let costBuy = document.getElementById("amount").value;
        let userEmail = document.getElementById("email").value;
        // Проверка, что email введен
        if (!userEmail) {
            alert("Введите ваш email");
            return;
        }
        var stringWithoutSpaces = localStorage.getItem('cost_price').replace(/\s/g, '');
        if (costBuy == stringWithoutSpaces) {
            // Извлечение имени пользователя из куки
            let username = usernameCookie.split('=')[1];
            // Получение значений email и названия курса из формы
            let email = document.getElementById('email').value;
            let course = localStorage.getItem("courseName");
            // Создание объекта FormData для передачи данных формы
            const formData = new FormData();
            formData.append('username', username);
            formData.append('email', email);
            formData.append('course', course);
            console.log(formData);
            // Вызов функции для создания заказа с использованием отправки POST-запроса
            createOrder(formData);
        } else {
            // Вывод сообщения об ошибке, если недостаточно средств
            alert("Укажите нужную сумму");
        }
    });

    // Асинхронная функция для создания заказа
    async function createOrder(formData) {
        // URL для отправки POST-запроса
        const url = '/api/create_order';

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
                // Вывод сообщения об успешной покупке и перенаправление на главную страницу
                alert("Спасибо за покупку, ожидайте получение курса на почту!");
                document.location.href = "/";
                // Вывод результата в консоль для отладки
                console.log(result);
            } else {
                // Вывод ошибки при неудачном ответе
                console.error('Ошибка при добавлении');
            }
        } catch (error) {
            // Вывод ошибки при возникновении исключения
            console.error('Ошибка:', error);
        }
    }
})();