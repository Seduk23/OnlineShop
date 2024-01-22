(function () {
    // Проверяем, есть ли куки с именем пользователя
    const usernameCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('login='));
    const isLoggedIn = !!usernameCookie;

    // Если пользователь авторизован, скрываем форму
    if (isLoggedIn) {
        
        document.querySelector('.forum-auth').style.display = 'none';
        
    } else {
        // Если пользователь не авторизован, добавляем обработчик для формы
        
        document.getElementById('loginForm').addEventListener('submit', function (event) {
            event.preventDefault();
            const login = document.getElementById('login').value;
            const pass = document.getElementById('pass').value;
            
            // Отправляем запрос на сервер для проверки учетных данных
            fetch('/api/user')
                .then((response) => response.json())
                .then((users) => {
                    const user = users.find(u => u.login === login && u.pass === pass);
                    if (user) {
                        document.cookie = `login=${encodeURIComponent(login)}; path=/`;
                        document.cookie = `pass=${encodeURIComponent(pass)}; path=/`;
                        window.location.href = '/';
                    } else {
                        alert("Неверный логин или пароль")
                    }
                })
                .catch((error) => {
                    console.error('Ошибка при получении данных пользователя:', error);
                });
        });
    }
})();
