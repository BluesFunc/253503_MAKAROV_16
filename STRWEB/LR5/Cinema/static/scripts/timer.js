window.onload = function() {
    const countdownElement = document.getElementById('countdown');

    // Проверим, есть ли сохранённое время в localStorage
    let endTime = localStorage.getItem('endTime');
    
    // Если время не найдено, установим его на час от текущего времени
    if (!endTime) {
        endTime = Date.now() + 3600000;  // 1 час в миллисекундах
        localStorage.setItem('endTime', endTime);
    }

    // Функция для обновления времени на странице
    function updateCountdown() {
        const now = Date.now();
        const remainingTime = endTime - now;

        if (remainingTime <= 0) {
            countdownElement.textContent = "Время истекло!";
            clearInterval(interval);
        } else {
            const hours = Math.floor(remainingTime / 3600000);
            const minutes = Math.floor((remainingTime % 3600000) / 60000);
            const seconds = Math.floor((remainingTime % 60000) / 1000);
            countdownElement.textContent = `${hours}ч ${minutes}м ${seconds}с`;
        }
    }

    // Обновляем каждый секунду
    const interval = setInterval(updateCountdown, 1000);

    // Обновим отсчет сразу при загрузке страницы
    updateCountdown();
};