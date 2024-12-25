document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.style-toggle');
    const controls = document.querySelector('.style-controls');
    const pageContent = document.querySelector('.page-content');

    // Показ/скрытие панели управления
    toggle.addEventListener('change', () => {
        controls.style.display = toggle.checked ? 'block' : 'none';

        if (toggle.checked) {
            generateControls();
        } else {
            controls.innerHTML = ''; // Очищаем настройки
        }
    });

    // Генерация элементов управления
    function generateControls() {
        controls.innerHTML = `
            <label>
                Размер шрифта:
                <input type="range" class="font-size-control" min="12" max="36" value="16">
            </label>
            <label>
                Цвет текста:
                <input type="color" class="text-color-control" value="#333333">
            </label>
            <label>
                Цвет фона:
                <input type="color" class="bg-color-control" value="#ffffff">
            </label>
        `;

        // Обработчики событий для управления
        const fontSizeControl = document.querySelector('.font-size-control');
        const textColorControl = document.querySelector('.text-color-control');
        const bgColorControl = document.querySelector('.bg-color-control');

        fontSizeControl.addEventListener('input', () => {
            pageContent.style.fontSize = `${fontSizeControl.value}px`;
        });

        textColorControl.addEventListener('input', () => {
            pageContent.style.color = textColorControl.value;
        });

        bgColorControl.addEventListener('input', () => {
            pageContent.style.backgroundColor = bgColorControl.value;
        });
    }
});
