document.addEventListener('DOMContentLoaded', function () {
    const players = document.querySelectorAll('.youtube-player');

    // Функция закрытия всех активных видео
    function closeAllVideos() {
        document.querySelectorAll('.project-video').forEach(videoContainer => {
            videoContainer.innerHTML = '';
            videoContainer.style.display = 'none';
        });
    }

    players.forEach(player => {
        const thumbnail = player.querySelector('.youtube-thumbnail');
        const videoContainer = player.querySelector('.project-video');
        const videoId = player.dataset.id;

        thumbnail.addEventListener('click', function () {
            closeAllVideos(); // Закрыть другие видео

            // Создание iframe
            const iframe = document.createElement('iframe');
            iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1`);
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allowfullscreen', '');
            iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
            iframe.style.width = '100%';
            iframe.style.height = '315px';

            // Кнопка закрытия
            const closeBtn = document.createElement('button');
            closeBtn.className = 'close-btn';
            closeBtn.textContent = '×';
            closeBtn.addEventListener('click', closeAllVideos);

            // Вставка элементов
            videoContainer.innerHTML = ''; // Очистить на всякий случай
            videoContainer.appendChild(iframe);
            videoContainer.appendChild(closeBtn);
            videoContainer.style.display = 'flex';
        });
    });

    // Закрытие по клику на фон project-video
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('project-video')) {
            closeAllVideos();
        }
    });
});
