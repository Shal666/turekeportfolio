// Обработка YouTube-видео
document.querySelectorAll('.youtube-player').forEach(player => {
    const thumbnail = player.querySelector('.youtube-thumbnail');
    const videoContainer = player.querySelector('.project-video');
    const closeBtn = videoContainer.querySelector('.close-btn');
    const iframe = videoContainer.querySelector('iframe');
    
    // Изначально устанавливаем src без autoplay
    iframe.src = iframe.src.replace('autoplay=1', 'autoplay=0');

    thumbnail.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Сначала скрываем все открытые видео
        document.querySelectorAll('.project-video').forEach(vid => {
            vid.style.display = 'none';
            const iframe = vid.querySelector('iframe');
            if (iframe) {
                // Останавливаем все другие видео
                iframe.src = iframe.src.replace('autoplay=1', 'autoplay=0');
            }
        });
        
        // Показываем текущее видео
        videoContainer.style.display = 'block';
        // Обновляем src с autoplay
        iframe.src = iframe.src.replace('autoplay=0', 'autoplay=1');
    });

    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        videoContainer.style.display = 'none';
        iframe.src = iframe.src.replace('autoplay=1', 'autoplay=0');
    });
});

// Обработка локальных видео
document.querySelectorAll('.project-card').forEach(card => {
    const viewBtn = card.querySelector('.view-btn');
    const videoContainer = card.querySelector('.project-video');
    const video = videoContainer.querySelector('video');
    const closeBtn = videoContainer.querySelector('.close-btn');

    viewBtn.innerHTML = '&#9658; Просмотр';

    viewBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Сначала скрываем все открытые видео
        document.querySelectorAll('.project-video').forEach(vid => {
            vid.style.display = 'none';
            const v = vid.querySelector('video');
            if (v) {
                v.pause();
                v.currentTime = 0;
            }
        });
        
        videoContainer.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Используем requestAnimationFrame для плавности
        requestAnimationFrame(() => {
            video.play().catch(error => {
                console.log('Автовоспроизведение заблокировано:', error);
                video.controls = true;
            });
        });
    });

    closeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        videoContainer.style.display = 'none';
        document.body.style.overflow = '';
        video.pause();
        video.currentTime = 0;
        video.controls = false;
    });

    videoContainer.addEventListener('click', function(e) {
        if (e.target === videoContainer) {
            videoContainer.style.display = 'none';
            document.body.style.overflow = '';
            video.pause();
            video.currentTime = 0;
        }
    });
});

// Закрытие видео при нажатии ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.project-video').forEach(vid => {
            vid.style.display = 'none';
            const video = vid.querySelector('video');
            const iframe = vid.querySelector('iframe');
            
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
            
            if (iframe) {
                iframe.src = iframe.src.replace('autoplay=1', 'autoplay=0');
            }
        });
        document.body.style.overflow = '';
    }
});