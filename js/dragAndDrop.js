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
        const nameElement = imageToMove.querySelector('p');
        const originalName = nameElement.textContent;
        
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
        
        document.body.appendChild(clone);
        
        // Скрываем оригинал
        imageToMove.style.opacity = '0';
        imageToMove.style.visibility = 'hidden';
        
        // Создаем плейсхолдер в целевом блоке
        const placeholder = document.createElement('div');
        placeholder.style.height = `${rect.height}px`;
        placeholder.style.marginBottom = '25px';
        placeholder.style.opacity = '0';
        placeholder.style.transition = 'all 1.8s ease';
        targetBlock.insertBefore(placeholder, targetBlock.firstChild);
        
        // Анимируем появление плейсхолдера
        setTimeout(() => {
            placeholder.style.opacity = '1';
        }, 10);
        
        // Рассчитываем конечную позицию
        setTimeout(() => {
            // Удаляем оригинал из исходного блока
            sourceBlock.removeChild(imageToMove);
            
            // Удаляем плейсхолдер
            placeholder.style.height = '0';
            placeholder.style.marginBottom = '0';
            placeholder.style.opacity = '0';
            
            // Добавляем в начало целевого блока
            targetBlock.insertBefore(imageToMove, targetBlock.firstChild);
            
            // Восстанавливаем оригинальное имя
            nameElement.textContent = originalName;
            
            // Показываем оригинал в новом положении
            setTimeout(() => {
                imageToMove.style.opacity = '1';
                imageToMove.style.visibility = 'visible';
                
                // Удаляем плейсхолдер после анимации
                setTimeout(() => {
                    if (placeholder.parentNode) {
                        placeholder.parentNode.removeChild(placeholder);
                    }
                }, 1800);
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