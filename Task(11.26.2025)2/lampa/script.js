// Elementləri seçirik
const ropeEnd = document.getElementById('ropeEnd');
const rope = document.getElementById('rope');
const bulb = document.getElementById('bulb');
const light = document.getElementById('light');
const room = document.querySelector('.room');
const lampContainer = document.querySelector('.lamp-container');

// Lampa vəziyyəti
let isOn = false;

// İp çəkiləndə işləyən funksiya
ropeEnd.addEventListener('click', function() {
    // İp animasiyası
    rope.classList.add('pulled');
    lampContainer.classList.add('swinging');
    
    setTimeout(() => {
        rope.classList.remove('pulled');
    }, 300);
    
    setTimeout(() => {
        lampContainer.classList.remove('swinging');
    }, 500);
    
    // Lampa vəziyyətini dəyişirik
    isOn = !isOn;
    
    if (isOn) {
        // Lampanı yandırırıq
        bulb.classList.add('on');
        light.classList.add('on');
        room.classList.add('lit');
    } else {
        // Lampanı söndürürük
        bulb.classList.remove('on');
        light.classList.remove('on');
        room.classList.remove('lit');
    }
});

// Hover effekti üçün əlavə interaktivlik
ropeEnd.addEventListener('mouseenter', function() {
    this.style.transform = 'translateX(-50%) scale(1.3)';
});

ropeEnd.addEventListener('mouseleave', function() {
    this.style.transform = 'translateX(-50%) scale(1)';
});