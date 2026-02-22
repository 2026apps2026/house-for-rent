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

    // Close menu when clicking a link
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
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
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
        
        // Get form data
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        
        // Detect language based on page
        const lang = document.documentElement.lang;
        let message;
        
        if (lang === 'es') {
            message = `¡Gracias ${firstName} ${lastName}! Hemos recibido tu mensaje. Te contactaremos pronto a ${email}.`;
        } else if (lang === 'tl') {
            message = `Salamat ${firstName} ${lastName}! Natanggap namin ang iyong mensahe. Makipag-ugnayan kami sa iyo sa ${email} sa lalong madaling panahon.`;
        } else {
            message = `Thank you ${firstName} ${lastName}! We've received your message. We'll contact you at ${email} soon.`;
        }
        
        alert(message);
        contactForm.reset();
    });
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
    btn.addEventListener('click', function() {
        const icon = this.querySelector('i');
        icon.classList.toggle('far');
        icon.classList.toggle('fas');
        icon.classList.toggle('active');
        
        if (icon.classList.contains('fas')) {
            icon.style.color = '#e74c3c';
        } else {
            icon.style.color = '';
        }
    });
});

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
    const increment = numericPart / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= numericPart) {
            current = numericPart;
            clearInterval(timer);
        }
        element.innerText = Math.floor(current) + suffix;
    }, 30);
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

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    const headerHeight = document.querySelector('.header').offsetHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

console.log('🏠 USA Properties - Website loaded successfully!');
