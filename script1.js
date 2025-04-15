document.querySelectorAll('.project-card').forEach(card => {
    const viewBtn = card.querySelector('.view-btn');
    const projectVideo = card.querySelector('.project-video');
    const video = card.querySelector('video');
    const closeBtn = card.querySelector('.close-btn');

    // Заменяем текст кнопки на иконку ►
    viewBtn.innerHTML = '&#9658;';

    viewBtn.addEventListener('click', () => {
        projectVideo.style.display = 'block';
        video.play();
    });

    closeBtn.addEventListener('click', () => {
        projectVideo.style.display = 'none';
        video.pause();
        video.currentTime = 0;
    });
});