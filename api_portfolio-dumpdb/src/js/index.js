(function () {
    fetch('/api/products')
        .then((response) => {
            return response.json();
        })
        .then((myjson) => {
        console.log(myjson)
        });
})()