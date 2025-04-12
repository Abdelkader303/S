// إنشاء الجسيمات المتحركة
function createParticles() {
    const container = document.getElementById('particles');
    container.innerHTML = ''; // تنظيف الجسيمات القديمة
    
    // حساب عدد الجسيمات بناءً على حجم الشاشة
    const particleCount = Math.floor(window.innerWidth * window.innerHeight / 5000);
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // حجم عشوائي متجاوب
        const size = Math.random() * (window.innerWidth < 480 ? 3 : 5) + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // موقع عشوائي
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // شفافية عشوائية
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        // مدة حركة عشوائية
        const duration = Math.random() * 20 + 10;
        particle.style.animation = `float ${duration}s linear infinite`;
        
        // تأخير عشوائي
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(particle);
    }
}

// تحكم في السلايدر ثلاثي الأبعاد
function init3DSlider() {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    
    function calculateZDistance() {
        if (window.innerWidth < 400) return 120;
        if (window.innerWidth < 600) return 150;
        if (window.innerWidth < 800) return 200;
        if (window.innerWidth < 1000) return 250;
        return 300;
    }
    
    function updateSlidePositions() {
        const zDistance = calculateZDistance();
        slides.forEach((slide, index) => {
            const angle = (index - currentSlide) * 120;
            slide.style.transform = `rotateY(${angle}deg) translateZ(${zDistance}px)`;
        });
    }
    
    function showSlide() {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[currentSlide].classList.add('active');
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlidePositions();
    }
    
    // بدء التشغيل والتكرار
    updateSlidePositions();
    showSlide();
    const slideInterval = setInterval(showSlide, 3000);
    
    // إعادة الحساب عند تغيير حجم النافذة
    window.addEventListener('resize', () => {
        clearInterval(slideInterval);
        updateSlidePositions();
        setInterval(showSlide, 3000);
    });
}

// تحديث شريط التقدم
function updateProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    let progress = 0;
    let speed = 1;
    
    function animate() {
        progress = (progress + speed) % 101;
        progressBar.style.setProperty('--progress', `${progress}%`);
        
        // تغيير السرعة بشكل عشوائي لجعل الحركة أكثر ديناميكية
        if (Math.random() > 0.95) {
            speed = Math.random() * 2 + 0.5;
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// حماية الصفحة
function protectPage() {
    // منع النقر الأيمن
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
    
    // منع النسخ
    document.addEventListener('copy', (e) => {
        e.preventDefault();
    });
    
    // منع فتح أدوات المطورين
    document.onkeydown = function(e) {
        if (
            e.keyCode == 123 || // F12
            (e.ctrlKey && e.shiftKey && e.keyCode == 73) || // Ctrl+Shift+I
            (e.ctrlKey && e.shiftKey && e.keyCode == 74) || // Ctrl+Shift+J
            (e.ctrlKey && e.keyCode == 85) // Ctrl+U
        ) {
            e.preventDefault();
            return false;
        }
    };
}

// إعادة تحميل الجسيمات عند تغيير حجم النافذة
function handleResize() {
    createParticles();
}

// تهيئة كل شيء عند تحميل الصفحة
window.addEventListener('DOMContentLoaded', () => {
    createParticles();
    init3DSlider();
    updateProgressBar();
    protectPage();
    
    // إضافة مستمع لحدث تغيير حجم النافذة
    window.addEventListener('resize', handleResize);
});

// تحسين الأداء عند تغيير تبويب الصفحة
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // توقف الحركات عند ترك الصفحة
        document.querySelectorAll('.particle, .slider-track, .progress-bar').forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    } else {
        // استئناف الحركات عند العودة للصفحة
        document.querySelectorAll('.particle, .slider-track, .progress-bar').forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }
});