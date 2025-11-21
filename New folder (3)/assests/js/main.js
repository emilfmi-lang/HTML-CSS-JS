// Səhifə yükləndikdən sonra bu funksiyanı çağırırıq
window.addEventListener('DOMContentLoaded', event => {
    
    // Əsas Navigasiya Zolağının (Navbar) elementini əldə edirik
    const mainNav = document.body.querySelector('#mainNav');
    if (!mainNav) {
        return; // Əgər Navbar tapılmazsa, funksiyadan çıx
    }

    // Sürüşdürmə zamanı kiçilmə funksiyası
    const navbarShrink = () => {
        const navbarCollapsePoint = 100; // Navbar-ın kiçilməyə başlayacağı piksel məsafəsi

        // Əgər səhifənin yuxarı hissəsinə sürüşdürülübsə
        if (window.scrollY < navbarCollapsePoint) {
            mainNav.classList.remove('navbar-shrink'); // Kiçilmə klassını sil
        } 
        // Əgər kifayət qədər aşağı sürüşdürülübsə
        else {
            mainNav.classList.add('navbar-shrink'); // Kiçilmə klassını əlavə et
        }
    };

    // Səhifə yüklənərkən bir dəfə funksiyanı çağırırıq
    navbarShrink();

    // İstifadəçi sürüşdürdükdə funksiyanı davamlı çağırırıq
    document.addEventListener('scroll', navbarShrink);
});

// Navigasiya linkləri üçün Rəvan Sürüşmə (Smooth Scrolling)
// Bütün linkləri seçirik
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Linkin boş olub-olmadığını yoxlayırıq
        if (this.getAttribute('href') === '#') {
            e.preventDefault(); // Əgər boşdursa, səhifənin yuxarısına tullanmasının qarşısını al
            return;
        }
        
        // Bu linkdən hədəf elementi tapırıq (məsələn, #portfolio elementi)
        const targetElement = document.querySelector(this.getAttribute('href'));
        
        if (targetElement) {
            e.preventDefault(); // Normal keçidin qarşısını alırıq

            // Hədəf elementə yumşaq şəkildə sürüşmə
            window.scrollTo({
                top: targetElement.offsetTop - 104, // Header hündürlüyünü (təxminən 104px) nəzərə al
                behavior: 'smooth'
            });
            
            // Əgər Navbar kiçik ekranda açıqdırsa, onu bağla
            const navbarCollapse = document.getElementById('navbarResponsive');
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
            
            if (navbarCollapse.classList.contains('show')) {
                 bsCollapse.hide();
            }
        }
    });
});