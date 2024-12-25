document.getElementById('birthdate-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    const birthdateInput = document.getElementById('birthdate').value; // Получаем введенную дату
    const messageElement = document.getElementById('message'); // Блок для вывода сообщений

    // Проверяем, указал ли пользователь дату рождения
    if (!birthdateInput) {
        messageElement.textContent = 'Пожалуйста, введите дату рождения.';
        return;
    }

    const birthdate = new Date(birthdateInput); // Конвертируем дату в объект Date
    const currentDate = new Date(); // Текущая дата

    // Вычисление возраста
    let age = currentDate.getFullYear() - birthdate.getFullYear();
    const monthDifference = currentDate.getMonth() - birthdate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthdate.getDate())) {
        age--; // Уменьшаем возраст, если день рождения еще не наступил в этом году
    }

    // Определяем день недели для введенной даты
    const weekdays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const dayOfWeek = weekdays[birthdate.getDay()];

    // Проверка на совершеннолетие
    if (age >= 18) {
        messageElement.innerHTML = `
            <span style="color: green;">Вы совершеннолетний.</span><br>
            Ваш день рождения был в <strong>${dayOfWeek}</strong>. Вам <strong>${age}</strong> лет.
        `;
    } else {
        alert('Для использования сайта требуется разрешение родителей.');
        messageElement.innerHTML = `
            <span style="color: red;">Вы несовершеннолетний.</span><br>
            Ваш день рождения был в <strong>${dayOfWeek}</strong>. Вам <strong>${age}</strong> лет.<br>
            Пожалуйста, получите разрешение родителей для использования сайта.
        `;
    }
});
