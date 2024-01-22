(function () {
    localStorage.clear()
    
    // Запрос на получение данных с сервера по адресу '/api/courses'
    fetch('/api/courses')
        .then((response) => {
            return response.json(); // Преобразование ответа в формат JSON
        })
        .then((myjson) => {
            // Получение контейнера для отображения данных
            let container = document.querySelector(".container");

            // Итерация по полученным данным и создание карточек для каждого курса
            for (let key in myjson) {
                let div = document.createElement("div");
                let img = document.createElement("img");
                let divContent = document.createElement("div");
                let cardTitle = document.createElement("div");
                let cardDescription = document.createElement("p");
                let cardPrice = document.createElement("div");
                let btn = document.createElement("a");

                // Добавление классов для стилизации
                div.classList.add("card");
                div.setAttribute("id", myjson[key].id);
                divContent.classList.add("card-content");
                cardTitle.classList.add("card-title");
                cardDescription.classList.add("card-description");
                cardPrice.classList.add("card-price");
                btn.classList.add("btn");

                // Заполнение элементов данными из ответа сервера
                cardTitle.innerHTML = myjson[key].name;
                cardDescription.innerHTML = myjson[key].description;
                cardPrice.innerHTML = myjson[key].cost;
                btn.innerHTML = "Хочу";
                btn.style.cursor = "pointer";
                img.src = myjson[key].images;

                // Добавление созданных элементов в контейнер
                container.appendChild(div);
                div.appendChild(img);
                div.appendChild(divContent);
                divContent.appendChild(cardTitle);
                divContent.appendChild(cardDescription);
                divContent.appendChild(cardPrice);
                divContent.appendChild(btn);
            }

            // Добавление обработчиков событий для карточек
            let cards = document.querySelectorAll(".card");
            for (let i = 0; i < cards.length; i++) {
                cards[i].addEventListener("click", function () {
                    // Перенаправление на страницу курса при клике на карточку
                    window.location.replace("/courses/" + cards[i].id);
                    console.log(cards[i]);
                });
            }
            const usernameCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('login='));
            const isLoggedIn = !!usernameCookie;
            if (isLoggedIn) {
                const registrationLink = document.querySelector('a[href="/login"]');
                if (registrationLink) {
                    registrationLink.style.display = 'none';
                }
            }
        })
}());
