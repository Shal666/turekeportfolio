// Обработка YouTube-видео
document.querySelectorAll('.youtube-player').forEach(player => {
    const thumbnail = player.querySelector('.youtube-thumbnail');
    const videoContainer = player.querySelector('.project-video');
    const closeBtn = videoContainer.querySelector('.close-btn');
    const iframe = videoContainer.querySelector('iframe');

    thumbnail.addEventListener('click', () => {
        videoContainer.style.display = 'block';
        // Автозапуск (если разрешен браузером)
        iframe.src = iframe.src.replace('autoplay=0', 'autoplay=1');
    });

    closeBtn.addEventListener('click', () => {
        videoContainer.style.display = 'none';
        iframe.src = iframe.src.replace('autoplay=1', 'autoplay=0');
    });
});