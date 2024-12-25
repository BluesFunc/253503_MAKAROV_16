document.addEventListener('DOMContentLoaded', () => {
    // Настройки для построения графика
    const ctx = document.getElementById('myChart').getContext('2d');

    // Диапазон x (от -2π до 2π) и шаг
    const xValues = Array.from({ length: 100 }, (_, i) => -2 * Math.PI + (4 * Math.PI * i) / 99);
    const actualSin = xValues.map(x => Math.sin(x)); // Истинный синус

    // Данные для ряда Тейлора
    let taylorData = new Array(xValues.length).fill(0);

    // Создаем график
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xValues.map(x => x.toFixed(2)), // Метки оси X
            datasets: [
                {
                    label: 'Ряд Тейлора',
                    data: taylorData,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.1,
                },
                {
                    label: 'Истинный sin(x)',
                    data: actualSin,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 2,
                    fill: false,
                    borderDash: [5, 5],
                    tension: 0.1,
                },
            ],
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'x (радианы)',
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'y',
                    },
                },
            },
        },
    });

    // Функция для расчета члена ряда Тейлора
    function taylorTerm(x, n) {
        const factorial = num => (num <= 1 ? 1 : num * factorial(num - 1));
        return ((n % 2 === 0 ? -1 : 1) * Math.pow(x, 2 * n + 1)) / factorial(2 * n + 1);
    }

    // Анимация добавления членов ряда
    let termIndex = 0;
    const maxTerms = 10; // Максимальное количество членов ряда

    function animateTaylor() {
        if (termIndex >= maxTerms) return; // Остановка после добавления всех членов

        // Добавляем очередной член ряда
        taylorData = taylorData.map((y, i) => y + taylorTerm(xValues[i], termIndex));
        chart.data.datasets[0].data = taylorData;
        chart.update();

        termIndex++;
        setTimeout(animateTaylor, 1000); // Следующий шаг через 1 секунду
    }

    animateTaylor(); // Запускаем анимацию
});
