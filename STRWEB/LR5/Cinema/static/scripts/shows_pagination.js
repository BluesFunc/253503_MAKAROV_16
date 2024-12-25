document.addEventListener("DOMContentLoaded", () => {
    const productsContainer = document.getElementById("products-container");
    const paginationContainer = document.getElementById("pagination");

    let currentPage = 1;

    // Функция загрузки данных
    function loadProducts(page) {
        fetch(`/main/shows?page=${page}`, {
            headers: {
                "X-Requested-With": "application/json",
            },
        })
            .then(response => response.json())
            .then(data => {
                displayProducts(data.products);
                displayPagination(data.current_page, data.total_pages, data.has_previous, data.has_next);
            });
    }

    // Отображение товаров
    function displayProducts(products) {
        productsContainer.innerHTML = "";
        console.log(typeof products)
        products.forEach(product => {
            const productCard = document.createElement("div");
            const productLink = document.createElement('a');
            productCard.className = "catalog-item";
            productLink.textContent = product.name;
            productLink.href = `./show/${product.id}`;
            productLink.className = 'item-button';
            productsContainer.appendChild(productCard);
            productCard.appendChild(productLink)
        });
    }

    // Отображение кнопок пагинации
    function displayPagination(current, total, hasPrevious, hasNext) {
        paginationContainer.innerHTML = "";

        if (hasPrevious) {
            const prevButton = createButton(current - 1, "«");
            paginationContainer.appendChild(prevButton);
        }

        for (let i = 1; i <= total; i++) {
            const button = createButton(i, i);
            if (i === current) button.classList.add("active");
            paginationContainer.appendChild(button);
        }

        if (hasNext) {
            const nextButton = createButton(current + 1, "»");
            paginationContainer.appendChild(nextButton);
        }
    }

    // Создание кнопки пагинации
    function createButton(page, text) {
        const button = document.createElement("button");
        button.className = "pagination-button";
        button.textContent = text;
        button.addEventListener("click", () => {
            currentPage = page;
            loadProducts(page);
        });
        return button;
    }

    // Инициализация
    loadProducts(currentPage);
});
