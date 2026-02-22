// ===== DOM ELEMENTS =====
const menuToggle = document.getElementById('menuToggle');
const nav = document.querySelector('.nav');
const header = document.getElementById('header');
const scrollTopBtn = document.getElementById('scrollTop');
const contactForm = document.getElementById('contactForm');

// ===== MENU TOGGLE =====
if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });
}

// ===== HEADER SCROLL EFFECT =====
let lastScroll = 0;
if (header) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// ===== SCROLL TO TOP BUTTON =====
if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== FORM SUBMISSION =====
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        
        const lang = document.documentElement.lang;
        let message;
        
        if (lang === 'es') {
            message = `¡Gracias ${firstName} ${lastName}! Hemos recibido tu mensaje. Te contactaremos pronto a ${email}.`;
        } else if (lang === 'tl') {
            message = `Salamat ${firstName} ${lastName}! Natanggap namin ang iyong mensahe. Makipag-ugnayan kami sa iyo sa ${email} sa lalong madaling panahon.`;
        } else {
            message = `Thank you ${firstName} ${lastName}! We've received your message. We'll contact you at ${email} soon.`;
        }
        
        // Create custom alert
        showNotification(message, 'success');
        contactForm.reset();
    });
}

// ===== CUSTOM NOTIFICATION =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Add styles dynamically
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
        color: white;
        padding: 20px 30px;
        border-radius: 16px;
        display: flex;
        align-items: center;
        gap: 15px;
        box-shadow: 0 20px 50px rgba(99, 102, 241, 0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: rgba(255,255,255,0.2);
        border: none;
        color: white;
        cursor: pointer;
        padding: 5px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: auto;
    `;
    
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 500);
    });
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 500);
    }, 5000);
}

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Apply animation to all elements with data-animate attribute
document.querySelectorAll('[data-animate]').forEach((element, index) => {
    element.style.transitionDelay = `${index * 0.05}s`;
    observer.observe(element);
});

// ===== FAVORITE BUTTON TOGGLE =====
document.querySelectorAll('.property-favorite').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const icon = this.querySelector('i');
        icon.classList.toggle('far');
        icon.classList.toggle('fas');
        icon.classList.toggle('active');
        
        // Add heart burst animation
        if (icon.classList.contains('fas')) {
            icon.style.color = '#ec4899';
            icon.style.transform = 'scale(1.3)';
            setTimeout(() => {
                icon.style.transform = 'scale(1)';
            }, 200);
            
            // Create particles
            createHeartParticles(this);
        } else {
            icon.style.color = '';
        }
    });
});

// ===== HEART PARTICLES EFFECT =====
function createHeartParticles(element) {
    const rect = element.getBoundingClientRect();
    const colors = ['#ec4899', '#f472b6', '#6366f1', '#818cf8'];
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.innerHTML = '❤';
        particle.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            font-size: 12px;
            color: ${colors[Math.floor(Math.random() * colors.length)]};
            pointer-events: none;
            z-index: 10000;
            animation: particleFly 1s ease-out forwards;
        `;
        
        const angle = (i / 8) * Math.PI * 2;
        const distance = 50 + Math.random() * 30;
        particle.style.setProperty('--tx', `${Math.cos(angle) * distance}px`);
        particle.style.setProperty('--ty', `${Math.sin(angle) * distance}px`);
        
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 1000);
    }
}

// Add particle animation style
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFly {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(var(--tx), var(--ty)) scale(0);
        }
    }
`;
document.head.appendChild(particleStyle);

// ===== PROPERTY CARD IMAGE LOADING =====
document.querySelectorAll('.property-image img').forEach(img => {
    img.addEventListener('error', function() {
        this.src = 'https://via.placeholder.com/800x600?text=Image+not+available';
    });
});

// ===== STAT COUNTER ANIMATION =====
const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (element) => {
    const target = element.innerText;
    const numericPart = parseInt(target.replace(/[^0-9]/g, ''));
    const suffix = target.replace(/[0-9]/g, '');
    
    let current = 0;
    const increment = numericPart / 60;
    const timer = setInterval(() => {
        current += increment;
        if (current >= numericPart) {
            current = numericPart;
            clearInterval(timer);
        }
        element.innerText = Math.floor(current) + suffix;
    }, 25);
};

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => statObserver.observe(stat));

// ===== PARALLAX EFFECT FOR HERO =====
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
            const heroContent = hero.querySelector('.hero-content');
            const heroVisual = hero.querySelector('.hero-visual');
            
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.opacity = 1 - (scrolled * 0.002);
            }
            if (heroVisual) {
                heroVisual.style.transform = `translateY(${scrolled * 0.15}px)`;
            }
        }
    });
}

// ===== HOVER EFFECT FOR PROPERTY CARDS =====
document.querySelectorAll('.property-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ===== MAGNETIC BUTTON EFFECT =====
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

// ===== TYPING EFFECT FOR HERO BADGE =====
const heroBadge = document.querySelector('.hero-badge span');
if (heroBadge) {
    const originalText = heroBadge.innerText;
    const texts = [
        '#1 Rental Platform in USA',
        '#1 Plataforma de Alquiler',
        '#1 Rental Platform sa USA'
    ];
    
    let currentIndex = 0;
    
    // Only run if there are translations
    const lang = document.documentElement.lang;
    if (lang === 'en') {
        // Keep original text, no cycling
    }
}

// ===== CURSOR GLOW EFFECT =====
const cursorGlow = document.createElement('div');
cursorGlow.className = 'cursor-glow';
cursorGlow.style.cssText = `
    position: fixed;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s;
    display: none;
`;
document.body.appendChild(cursorGlow);

// Only show on desktop
if (window.innerWidth > 992) {
    cursorGlow.style.display = 'block';
    
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });
}

// ===== RIPPLE EFFECT FOR BUTTONS =====
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ===== LAZY LOADING IMAGES =====
document.querySelectorAll('img').forEach(img => {
    if ('loading' in HTMLImageElement.prototype) {
        img.loading = 'lazy';
    }
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');

const navHighlighter = () => {
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
};

window.addEventListener('scroll', navHighlighter);

// ===== INITIALIZE ON DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class to body for initial animations
    document.body.classList.add('loaded');
    
    // Trigger animations for elements in viewport
    document.querySelectorAll('[data-animate]').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.classList.add('animated');
        }
    });
});

console.log('🏠 USA Properties - Professional Real Estate Website Loaded');
