(function () {
    let path = window.location.href;

    // Извлечение идентификатора продукта из пути
    let productId = new URL(path).pathname.split('/').pop();
    productId = parseInt(productId, 10);

    // Проверка авторизации пользователя
    const usernameCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('login='));
    const isLoggedIn = !!usernameCookie;
    // Запрос на получение данных с сервера по адресу '/api/courses'
    fetch('/api/courses')
        .then((response) => {
            return response.json(); // Преобразование ответа в формат JSON
        })
        .then((myjson) => {
            // Получение текущего пути страницы
            let path = window.location.href;

            // Извлечение идентификатора продукта из пути
            let productId = new URL(path).pathname.split('/').pop();
            productId = parseInt(productId, 10);

            // Поиск продукта с заданным идентификатором в полученных данных
            let productWithId = myjson.find(product => product.id === productId);

            // Если продукт найден, обновление содержимого страницы
            if (productWithId) {
                document.querySelector(".name").innerHTML = productWithId.name;
                document.querySelector(".about").innerHTML = productWithId.about;
                document.querySelector(".img-product").src = productWithId.images;
            } else {
                // Если продукт не найден, вывод сообщения об ошибке
                alert("Такого продукта нет!");
            }
            localStorage.setItem('cost_price', productWithId.cost)
            console.log(productWithId);

            const buyButton = document.getElementById('buyButton');
            buyButton.style.display = isLoggedIn ? 'block' : 'none';

            if (buyButton) {
                buyButton.addEventListener('click', function () {
                    // Перенаправление на страницу оплаты
                    localStorage.setItem("courseName", productWithId.name)
                    window.location.href = '/payment';
                });
            }
        });
})();
