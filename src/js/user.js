(function () {
    // Поиск куки с именем пользователя
    const usernameCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('login='));

    // Проверка наличия куки с именем пользователя
    if (usernameCookie) {
        // Извлечение имени пользователя из куки
        const username = usernameCookie.split('=')[1];

        // Скрытие блока авторизации и отображение блока профиля
        document.querySelector(".auth").style = "display: none";
        document.querySelector(".profile-nav").style = "display: block";
        // Вывод приветствия с именем пользователя
        document.querySelector('.name').innerText = `Приветствуем тебя, ${decodeURIComponent(username)}!`;
        // Очистка сообщения об ошибке
        document.querySelector(".alert-message").innerHTML = "";
        // Отображение кнопки выхода из профиля
        document.querySelector(".btn-exit").style = "display: block;";
    }
    else {
        // Отображение блока авторизации
        document.querySelector(".auth").style = "display: block";
        // Вывод сообщения об ошибке
        document.querySelector(".alert-message").innerHTML = "Вы не авторизовались!";
        // Скрытие кнопки выхода из профиля
        document.querySelector(".btn-exit").style = "display: none;";
    }

    // Обработчик события для кнопки выхода из профиля
    const logoutButton = document.querySelector('.btn-exit');
    logoutButton.addEventListener('click', function () {
        // Удаление куки и очистка localStorage
        document.cookie = 'login=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'pass=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        localStorage.clear();
        // Скрытие блока профиля
        document.querySelector(".profile-nav").style = "display: none";
        // Перенаправление на главную страницу
        window.location.href = '/';
    });
})();
