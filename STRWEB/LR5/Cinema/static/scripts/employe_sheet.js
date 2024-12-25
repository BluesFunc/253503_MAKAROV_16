document.addEventListener("DOMContentLoaded", () => {
    const contactsTableBody = document.querySelector("#contacts-table tbody");
    const filterInput = document.getElementById("filter-input");
    const filterButton = document.getElementById("filter-button");
    const paginationContainer = document.getElementById("pagination");
    const preloader = document.getElementById("preloader");
    const rewardButton = document.getElementById("reward-button");
    const rewardMessage = document.getElementById("reward-message");
    const hidenForm = document.getElementById("show-add-form");
    const contactForm = document.getElementById("add-form")


    let contactsData = []; // Данные сотрудников
    let currentPage = 1; // Текущая страница
    const rowsPerPage = 3; // Количество записей на странице
    let sortColumn = null; // Текущий столбец сортировки
    let sortDirection = "asc"; // Направление сортировки

    // Функция для отображения прелоадера
    const showPreloader = () => preloader.classList.remove("hidden");
    const hidePreloader = () => preloader.classList.add("hidden");



    // Загрузка данных с сервера
    async function loadContacts() {
        showPreloader();
        try {
            const response = await fetch("/employees");
            if (!response.ok) throw new Error("Ошибка загрузки данных с сервера");
            responseData = await response.json();
            contactsData =  JSON.parse(responseData.data) ;
            renderTable();
            renderPagination();
        } catch (error) {
            console.error("Ошибка:", error.message);
            alert("Не удалось загрузить данные");
        } finally {
            hidePreloader();
        }
    }

    hidenForm.addEventListener("click", ()=> contactForm.classList.toggle('hidden'));

    // Отображение таблицы с учетом пагинации
    function renderTable() {
        contactsTableBody.innerHTML = "";
        const filteredData = getFilteredData();
        const start = (currentPage - 1) * rowsPerPage;
        const paginatedData = filteredData.slice(start, start + rowsPerPage);

        paginatedData.forEach(data => {
            let contact = data.fields;
            const row = document.createElement("tr");
            row.innerHTML = `
                <td><img src="${contact.photo_url}" alt="Фото" class="contact-photo"></td>
                <td>${contact.name}</td>
                <td>${contact.position}</td>
                <td>${contact.duties}</td>
                <td>${contact.phone_number}</td>
                <td>${contact.mail}</td>
                <td><input type="checkbox" class="contact-checkbox" data-name="${contact.name}"></td>
            `;
            row.addEventListener("click", () => displayDetails(contact));
            contactsTableBody.appendChild(row);
        });
    }

    // Пагинация
    function renderPagination() {
        paginationContainer.innerHTML = "";
        const totalPages = Math.ceil(getFilteredData().length / rowsPerPage);

        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement("button");
            button.textContent = i;
            button.classList.add("pagination-button");
            if (i === currentPage) button.classList.add("active");
            button.addEventListener("click", () => {
                currentPage = i;
                renderTable();
                renderPagination();
            });
            paginationContainer.appendChild(button);
        }
    }

    // Фильтрация
    function getFilteredData() {
        const query = filterInput.value.toLowerCase();
        return contactsData.filter(contact =>
            contact.fields.name.toLowerCase().includes(query) ||
            contact.fields.position.toLowerCase().includes(query)
        );
    }

    filterButton.addEventListener("click", () => {
        currentPage = 1;
        renderTable();
        renderPagination();
    });

    // Детали сотрудника
    function displayDetails(contact) {
        alert(`
            ФИО: ${contact.name}
            Должность: ${contact.position}
            Обязанности: ${contact.duties}
            Телефон: ${contact.phone_number}
            Почта: ${contact.mail}
        `);
    }

    // Сортировка
    document.querySelectorAll("#contacts-table th").forEach(header => {
        header.addEventListener("click", () => {
            const column = header.dataset.column;
            if (!column) return;

            if (sortColumn === column) {
                sortDirection = sortDirection === "asc" ? "desc" : "asc";
            } else {
                sortColumn = column;
                sortDirection = "asc";
            }

            contactsData.sort((a, b) => {
                if (sortDirection === "asc"){
                    if (a.fields[sortColumn] > b.fields[sortColumn])
                        return 1;
                    else if(a.fields[sortColumn] < b.fields[sortColumn])
                        return -1;
                    else 
                        return 0;
                    
                } else  {
                    if (b.fields[sortColumn] > a.fields[sortColumn]){
                        return 1;
                    }
                    else if (b.fields[sortColumn] < a.fields[sortColumn]){
                        return -1;
                    }
                    else {
                        return 0;
                    }
                }
                });

            renderTable();
        });
    });

    // Премирование
    rewardButton.addEventListener("click", () => {
        const selectedNames = Array.from(
            document.querySelectorAll(".contact-checkbox:checked")
        ).map(checkbox => checkbox.dataset.name);

        if (selectedNames.length > 0) {
            rewardMessage.textContent = `Премированы сотрудники: ${selectedNames.join(", ")}`;
        } else {
            rewardMessage.textContent = "Не выбраны сотрудники для премирования.";
        }
    });

    // Валидация URL и телефона
    function validateInput(url, phone) {
        const urlPattern = /^(https?:\/\/).+\.(php|html)$/;
        const phonePattern = /^(8|\+375)\s?\(?\d{2}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;

        return {
            isValidUrl: urlPattern.test(url),
            isValidPhone: phonePattern.test(phone),
        };
    }

    // Добавление новой записи
    document.getElementById("add-button").addEventListener("click", () => {
        const urlInput = document.getElementById("url-input").value;
        const phoneInput = document.getElementById("phone-input").value;

        const validation = validateInput(urlInput, phoneInput);
        if (!validation.isValidUrl) {
            alert("URL не валиден! Он должен начинаться с http(s):// и заканчиваться на .php или .html");
            return;
        }
        if (!validation.isValidPhone) {
            alert("Телефон не валиден! Проверьте формат номера.");
            return;
        }

        // Добавляем новую запись
        const newContact = {
            "fields" : {   
            photo_url: urlInput,
            name: document.getElementById("name-input").value,
            position: document.getElementById("position-input").value,
            duties: document.getElementById("duties-input").value,
            phone_number: phoneInput,
            mail: document.getElementById("mail-input").value
            }
        };

        contactsData.push(newContact);
        renderTable();
        renderPagination();
        alert("Новый сотрудник добавлен!");
    });

    // Инициализация
    loadContacts();
});
