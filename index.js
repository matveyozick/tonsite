window.onload = function () {
    const canvas = document.createElement('canvas');
    document.querySelector('.matrix-bg').appendChild(canvas);

    // Устанавливаем размеры канваса на весь экран
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 16; // Размер шрифта
    const columns = Math.floor(canvas.width / fontSize); // Количество колонок
    const symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'; // Символы
    const drops = Array.from({ length: columns }, () => Math.random() * canvas.height / fontSize); // Начальные позиции капель

    // Настраиваем шрифт
    ctx.font = `${fontSize}px monospace`;

    // Функция для отрисовки анимации
    function draw() {
        // Полупрозрачное черное покрытие для эффекта следа
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Цвет символов
        ctx.fillStyle = '#1897e4';

        // Проход по колонкам
        for (let i = 0; i < columns; i++) {
            const text = symbols[Math.floor(Math.random() * symbols.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            // Если капля достигла низа экрана или случайно, сбрасываем её наверх
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            // Увеличиваем позицию капли
            drops[i]++;
        }

        // Запрашиваем следующий кадр для плавной анимации
        requestAnimationFrame(draw);
    }

    // Запускаем анимацию
    requestAnimationFrame(draw);

    // Адаптация канваса при изменении размеров окна
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.font = `${fontSize}px monospace`;
    });
};


