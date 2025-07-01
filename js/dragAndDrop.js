document.addEventListener('DOMContentLoaded', () => {
    const leftBlock = document.querySelector('.block-left');
    const rightBlock = document.querySelector('.block-right');
    const leftButton = document.getElementById('leftButton');
    const rightButton = document.getElementById('rightButton');
    
    // Списки имен
    const animeNames = [
        "Сакура Харуно", "Хината Хьюга", "Микаса Аккерман", 
        "Асуна Юки", "Эрза Скарлет", "Рем", 
        "Зеро Ту", "Хитори Боччи", "Ранг Матои",
        "Мей Хацуме", "Орихиме Иноуэ", "Юно Гасай", 
        "Марин Китагава", "Нами", "Рука Сарусина",
        "Холлоу Атараксия", "Фубуки", "Куронеко"
    ];
    
    const femaleNames = [
        "Анна", "Мария", "Екатерина", "София", "Виктория",
        "Анастасия", "Дарья", "Алина", "Полина", "Елена",
        "Ольга", "Ирина", "Татьяна", "Наталья", "Юлия",
        "Ксения", "Александра", "Елизавета", "Валерия", "Марина"
    ];
    
    // Функция для установки случайных имен
    function setRandomNames() {
        // Для левого блока (аниме имена)
        const animeContainers = document.querySelectorAll('.block-left .anime-name');
        animeContainers.forEach(container => {
            const randomIndex = Math.floor(Math.random() * animeNames.length);
            container.textContent = animeNames[randomIndex];
        });
        
        // Для правого блока (женские имена)
        const femaleContainers = document.querySelectorAll('.block-right .female-name');
        femaleContainers.forEach(container => {
            const randomIndex = Math.floor(Math.random() * femaleNames.length);
            container.textContent = femaleNames[randomIndex];
        });
    }
    
    let isAnimating = false;
    
    // Функция для плавного перемещения изображения
    function moveImage(sourceBlock, targetBlock) {
        if (isAnimating) return;
        
        const images = sourceBlock.querySelectorAll('.image-container');
        if (images.length === 0) return;
        
        isAnimating = true;
        const imageToMove = images[0];
        
        // Создаем клон для анимации
        const clone = imageToMove.cloneNode(true);
        const rect = imageToMove.getBoundingClientRect();
        
        // Позиционируем клон абсолютно
        clone.style.position = 'fixed';
        clone.style.left = `${rect.left}px`;
        clone.style.top = `${rect.top}px`;
        clone.style.width = `${rect.width}px`;
        clone.style.height = `${rect.height}px`;
        clone.style.margin = '0';
        clone.style.zIndex = '1000';
        clone.style.transition = 'all 1.8s cubic-bezier(0.22, 0.61, 0.36, 1)';
        clone.style.pointerEvents = 'none';
        
        // Сохраняем оригинальные размеры изображения
        const img = clone.querySelector('img');
        img.style.width = `${img.width}px`;
        img.style.height = `${img.height}px`;
        img.style.maxWidth = 'none';
        
        document.body.appendChild(clone);
        
        // Скрываем оригинал, но сохраняем его размеры
        imageToMove.style.opacity = '0';
        imageToMove.style.visibility = 'hidden';
        
        // Рассчитываем конечную позицию
        setTimeout(() => {
            // Удаляем оригинал из исходного блока
            sourceBlock.removeChild(imageToMove);
            
            // Добавляем в начало целевого блока
            targetBlock.insertBefore(imageToMove, targetBlock.firstChild);
            
            // Обновляем классы подписи в зависимости от блока
            const nameElement = imageToMove.querySelector('p');
            if (targetBlock.classList.contains('block-left')) {
                nameElement.className = 'anime-name';
                // Устанавливаем случайное аниме имя
                const randomIndex = Math.floor(Math.random() * animeNames.length);
                nameElement.textContent = animeNames[randomIndex];
            } else {
                nameElement.className = 'female-name';
                // Устанавливаем случайное женское имя
                const randomIndex = Math.floor(Math.random() * femaleNames.length);
                nameElement.textContent = femaleNames[randomIndex];
            }
            
            // Показываем оригинал в новом положении
            setTimeout(() => {
                imageToMove.style.opacity = '1';
                imageToMove.style.visibility = 'visible';
            }, 50);
            
            // Позиция для клона
            const targetRect = imageToMove.getBoundingClientRect();
            
            // Анимируем движение клона
            clone.style.left = `${targetRect.left}px`;
            clone.style.top = `${targetRect.top}px`;
            
            // Удаляем клон после анимации
            setTimeout(() => {
                document.body.removeChild(clone);
                isAnimating = false;
            }, 1800);
            
        }, 10);
    }
    
    // Обработчики кнопок
    leftButton.addEventListener('click', () => {
        moveImage(rightBlock, leftBlock);
    });
    
    rightButton.addEventListener('click', () => {
        moveImage(leftBlock, rightBlock);
    });
    
    // Устанавливаем случайные имена при загрузке
    setRandomNames();
});