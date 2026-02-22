// ===== MENU TOGGLE =====
const menuToggle = document.getElementById('menuToggle');
const nav = document.querySelector('.nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
    });
});

// ===== HEADER SCROLL EFFECT =====
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = 'white';
    }
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
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
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    
    // Show success message
    alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
    
    // Reset form
    contactForm.reset();
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to property cards
document.querySelectorAll('.property-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Apply animation to service cards
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// ===== PROPERTY CARD IMAGE LOADING =====
document.querySelectorAll('.property-image img').forEach(img => {
    img.addEventListener('error', function() {
        // Fallback image if the original fails to load
        this.src = 'https://via.placeholder.com/800x600?text=Imagen+no+disponible';
    });
});

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
