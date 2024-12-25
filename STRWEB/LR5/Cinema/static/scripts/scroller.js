// Функция для анимации изображений при прокрутке
window.addEventListener('scroll', function() {
    const trophies = document.querySelectorAll('.trophy');
    const scrollPosition = window.scrollY; // Текущая позиция прокрутки

    trophies.forEach((trophy, index) => {
        // Для каждого кубка изменяем его трансформацию
        const scrollFactor = (scrollPosition / 5) + (index * 50); // Параметр для уникальности каждого кубка
        const scale = Math.min(1 + scrollFactor / 500, 2); // Ограничиваем максимальное увеличение
        const rotation = scrollFactor % 360; // Вращаем на основе прокрутки

        trophy.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
    });
});
