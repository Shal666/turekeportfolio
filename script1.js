document.addEventListener('DOMContentLoaded', function() {
    // Обработка локальных видео
    document.querySelectorAll('.project-card').forEach(card => {
        const viewBtn = card.querySelector('.view-btn');
        const videoContainer = card.querySelector('.project-video');
        const video = videoContainer.querySelector('video');
        const closeBtn = videoContainer.querySelector('.close-btn');

        // Заменяем текст кнопки на иконку
        viewBtn.innerHTML = '&#9658; Просмотр';

        // Открытие видео
        viewBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Показываем видео
            videoContainer.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Запускаем видео с задержкой для плавности
            setTimeout(() => {
                video.play().catch(error => {
                    console.log('Автовоспроизведение заблокировано:', error);
                    // Показываем controls, если autoplay не сработал
                    video.controls = true;
                });
            }, 300);
        });

        // Закрытие видео
        closeBtn.addEventListener('click', function() {
            videoContainer.style.display = 'none';
            document.body.style.overflow = '';
            video.pause();
            video.currentTime = 0;
            video.controls = false;
        });

        // Закрытие по клику вне видео
        videoContainer.addEventListener('click', function(e) {
            if (e.target === videoContainer) {
                videoContainer.style.display = 'none';
                document.body.style.overflow = '';
                video.pause();
                video.currentTime = 0;
            }
        });
    });
});