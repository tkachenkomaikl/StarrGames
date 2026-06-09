// ===== 1. ЛЕНИВАЯ ЗАГРУЗКА ВИДЕО (ПО КЛИКУ) =====
document.addEventListener('DOMContentLoaded', function() {
    const loadButton = document.getElementById('loadVideoBtn');
    const videoPlaceholder = document.getElementById('videoPlaceholder');
    const videoWrapper = document.getElementById('videoWrapper');
    
    if (loadButton) {
        loadButton.addEventListener('click', function() {
           const video = document.createElement('video');
            video.controls = true;
            video.autoplay = true;
            video.playsInline = true;
            video.style.width = "100%";
            video.style.height = "100%";
            
            video.src = "videos/video.mp4";
            
            // Очищаем wrapper и добавляем видео-плеер
            videoWrapper.innerHTML = '';
            videoWrapper.appendChild(video);
            
            // Прячем placeholder, показываем wrapper
            videoPlaceholder.style.display = 'none';
            videoWrapper.style.display = 'block';
            
            // Стили для корректного отображения адаптивного контейнера 16:9
            videoWrapper.style.position = 'relative';
            videoWrapper.style.paddingBottom = '56.25%'; /* 16:9 Aspect Ratio */
            videoWrapper.style.height = '0';
            video.style.position = 'absolute';
            video.style.top = '0';
            video.style.left = '0';
        });
    }
    
    // ===== 2. ПРОВЕРКА ЗАГРУЗКИ ИЗОБРАЖЕНИЙ (ленивая загрузка) =====
    // Все изображения уже имеют атрибут loading="lazy" в HTML
    // Дополнительно логируем успешную загрузку страницы
    console.log('Сайт успешно загружен!');
    
    // ===== 3. ДОБАВЛЯЕМ АНИМАЦИЮ ПРИ СКРОЛЛЕ (опционально) =====
    // Простая анимация появления элементов при скролле
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Применяем анимацию только если браузер поддерживает Intersection Observer
    if ('IntersectionObserver' in window) {
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });
    }
});
