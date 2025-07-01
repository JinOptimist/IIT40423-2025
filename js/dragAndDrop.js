document.addEventListener('DOMContentLoaded', () => {
    const leftBlock = document.querySelector('.block-left');
    const rightBlock = document.querySelector('.block-right');
    const leftButton = document.getElementById('leftButton');
    const rightButton = document.getElementById('rightButton');
    
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
        clone.style.transition = 'all 0.6s cubic-bezier(0.22, 0.61, 0.36, 1)';
        clone.style.pointerEvents = 'none';
        
        document.body.appendChild(clone);
        
        // Скрываем оригинал
        imageToMove.style.opacity = '0';
        imageToMove.style.transform = 'scale(0.8)';
        imageToMove.style.height = '0';
        imageToMove.style.margin = '0';
        imageToMove.style.padding = '0';
        imageToMove.style.transition = 'all 0.5s ease';
        
        // Рассчитываем конечную позицию
        setTimeout(() => {
            // Удаляем оригинал из исходного блока
            sourceBlock.removeChild(imageToMove);
            
            // Добавляем в начало целевого блока
            targetBlock.insertBefore(imageToMove, targetBlock.firstChild);
            
            // Показываем оригинал в новом положении
            setTimeout(() => {
                imageToMove.style.opacity = '1';
                imageToMove.style.transform = '';
                imageToMove.style.height = '';
                imageToMove.style.margin = '';
                imageToMove.style.padding = '';
            }, 50);
            
            // Позиция для клона
            const targetRect = imageToMove.getBoundingClientRect();
            
            // Анимируем движение клона
            clone.style.left = `${targetRect.left}px`;
            clone.style.top = `${targetRect.top}px`;
            clone.style.width = `${targetRect.width}px`;
            clone.style.height = `${targetRect.height}px`;
            
            // Удаляем клон после анимации
            setTimeout(() => {
                document.body.removeChild(clone);
                isAnimating = false;
            }, 600);
            
        }, 10);
    }
    
    // Обработчики кнопок с измененной логикой:
    // Левая кнопка: перемещает из правого блока в левый
    leftButton.addEventListener('click', () => {
        moveImage(rightBlock, leftBlock);
    });
    
    // Правая кнопка: перемещает из левого блока в правый
    rightButton.addEventListener('click', () => {
        moveImage(leftBlock, rightBlock);
    });
});