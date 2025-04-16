document.querySelectorAll('.youtube-player').forEach(player => {
    const thumbnail = player.querySelector('.youtube-thumbnail');
    const videoContainer = player.querySelector('.project-video');
    const closeBtn = videoContainer.querySelector('.close-btn');
    const iframe = videoContainer.querySelector('iframe');
    
    // Изначально скрываем iframe и показываем только при клике
    iframe.style.display = 'none';
    iframe.src = iframe.src.replace('autoplay=0', 'autoplay=1'); // Устанавливаем автовоспроизведение

    thumbnail.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Сначала скрываем все открытые видео
        document.querySelectorAll('.project-video').forEach(vid => {
            vid.style.display = 'none';
            const iframe = vid.querySelector('iframe');
            if (iframe) {
                iframe.style.display = 'none';
            }
        });
        
        // Показываем текущее видео
        videoContainer.style.display = 'block';
        iframe.style.display = 'block';
        
        // Форсируем воспроизведение (если браузер блокирует автоплей)
        iframe.src = iframe.src.replace('autoplay=0', 'autoplay=1');
    });

    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        videoContainer.style.display = 'none';
        iframe.style.display = 'none';
    });
});

// Закрытие видео при нажатии ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.project-video').forEach(vid => {
            vid.style.display = 'none';
            const iframe = vid.querySelector('iframe');
            if (iframe) {
                iframe.style.display = 'none';
            }
        });
    }
});