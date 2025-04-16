document.querySelectorAll('.youtube-player').forEach(player => {
    const thumbnail = player.querySelector('.youtube-thumbnail');
    const videoContainer = player.querySelector('.project-video');
    const closeBtn = videoContainer.querySelector('.close-btn');
    const iframe = videoContainer.querySelector('iframe');
    
    // Сохраняем оригинальный src и добавляем необходимые параметры
    let originalSrc = iframe.src;
    originalSrc = originalSrc.includes('?') 
    ? originalSrc + '&playsinline=1&enablejsapi=1' 
    : originalSrc + '?playsinline=1&enablejsapi=1';
    
    // Устанавливаем оригинальный src без autoplay
    iframe.src = originalSrc.replace('autoplay=1', 'autoplay=0');
    iframe.style.display = 'none';

    // Функция для полной остановки видео
    const stopVideo = () => {
        iframe.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
        iframe.src = originalSrc.replace('autoplay=1', 'autoplay=0');
        videoContainer.style.display = 'none';
        iframe.style.display = 'none';
    };

    thumbnail.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Останавливаем все другие видео
        document.querySelectorAll('.project-video').forEach(vid => {
            const otherIframe = vid.querySelector('iframe');
            if (otherIframe && otherIframe !== iframe) {
                otherIframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
                otherIframe.src = otherIframe.src.replace('autoplay=1', 'autoplay=0');
                vid.style.display = 'none';
                otherIframe.style.display = 'none';
            }
        });
        
        // Запускаем текущее видео
        videoContainer.style.display = 'block';
        iframe.style.display = 'block';
        iframe.src = originalSrc.replace('autoplay=0', 'autoplay=1');
    });

    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        stopVideo();
    });

    // Закрытие при клике вне видео
    videoContainer.addEventListener('click', (e) => {
        if (e.target === videoContainer) {
            stopVideo();
        }
    });
});

// Закрытие видео при нажатии ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.project-video').forEach(vid => {
            const iframe = vid.querySelector('iframe');
            if (iframe) {
                iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
                iframe.src = iframe.src.replace('autoplay=1', 'autoplay=0');
                vid.style.display = 'none';
                iframe.style.display = 'none';
            }
        });
    }
});