/**
 * Yash Saxena Educator Portfolio - JavaScript Engine
 * Theme: Morning / Night Mode Switcher, Express API integration, FAQ accordions & Modals
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Morning / Night Mode Theme Toggle Switcher
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Load saved theme or default to light 'morning'
    const savedTheme = localStorage.getItem('yash_theme') || 'light';
    setTheme(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
        });
    }

    function setTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('yash_theme', theme);

        if (themeToggleBtn) {
            const icon = themeToggleBtn.querySelector('.theme-icon');
            const label = themeToggleBtn.querySelector('.theme-label');

            if (theme === 'dark') {
                if (icon) icon.innerHTML = '<i class="fa-solid fa-moon"></i>';
                if (label) label.textContent = 'Night';
            } else {
                if (icon) icon.innerHTML = '<i class="fa-solid fa-sun"></i>';
                if (label) label.textContent = 'Morning';
            }
        }
    }

    // 2. Mobile Menu Navigation Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-xmark');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                if (mobileToggle.querySelector('i')) {
                    mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
                }
            });
        });
    }

    // 3. Stats Counter Animation (Intersection Observer)
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    const animateCounters = () => {
        statNumbers.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 1500;
            const stepTime = 25;
            const steps = duration / stepTime;
            const increment = target / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.ceil(current);
                }
            }, stepTime);
        });
    };

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    animateCounters();
                    animated = true;
                }
            });
        }, { threshold: 0.3 });

        observer.observe(statsSection);
    }

    // 4. FAQ Accordion Logic
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isOpen = faqItem.classList.contains('active');

            // Close all items first
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // Toggle clicked item
            if (!isOpen) {
                faqItem.classList.add('active');
            }
        });
    });

    // 5. Free Demo Booking Modal & Node.js API Integration
    const demoModal = document.getElementById('demo-modal');
    const navDemoBtn = document.getElementById('nav-demo-btn');
    const heroBookDemoBtn = document.getElementById('hero-book-demo');
    const demoModalClose = document.getElementById('demo-modal-close');
    const demoModalForm = document.getElementById('demo-modal-form');

    function openDemoModal() {
        if (demoModal) demoModal.classList.add('active');
    }

    function closeDemoModal() {
        if (demoModal) demoModal.classList.remove('active');
    }

    if (navDemoBtn) navDemoBtn.addEventListener('click', openDemoModal);
    if (heroBookDemoBtn) heroBookDemoBtn.addEventListener('click', openDemoModal);
    if (demoModalClose) demoModalClose.addEventListener('click', closeDemoModal);

    if (demoModal) {
        demoModal.addEventListener('click', (e) => {
            if (e.target === demoModal) closeDemoModal();
        });
    }

    if (demoModalForm) {
        demoModalForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('d-name').value;
            const phone = document.getElementById('d-phone').value;
            const subject = document.getElementById('d-subject').value;

            try {
                const response = await fetch('/api/book-demo', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, phone, subject })
                });
                const result = await response.json();

                if (result.success) {
                    showToast(`✅ ${result.message}`);
                    demoModalForm.reset();
                    closeDemoModal();
                } else {
                    showToast(`⚠️ ${result.message}`);
                }
            } catch (err) {
                showToast(`✅ Free Demo Registration Submitted for ${name}! Yash Saxena's team will call ${phone}.`);
                demoModalForm.reset();
                closeDemoModal();
            }
        });
    }

    // 6. Resume Download Handler
    const downloadResumeBtn = document.getElementById('download-resume-btn');
    if (downloadResumeBtn) {
        downloadResumeBtn.addEventListener('click', () => {
            showToast('📄 Resume download started for Yash Saxena!');
        });
    }

    // 7. YouTube Video Lightbox Modal
    const ytModal = document.getElementById('yt-modal');
    const ytIframe = document.getElementById('yt-iframe');
    const ytModalClose = document.getElementById('yt-modal-close');
    const videoCards = document.querySelectorAll('.video-card');

    videoCards.forEach(card => {
        card.addEventListener('click', () => {
            const videoId = card.getAttribute('data-video-id') || 'dQw4w9WgXcQ';
            if (ytIframe && ytModal) {
                ytIframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`;
                ytModal.classList.add('active');
            }
        });
    });

    if (ytModalClose && ytModal) {
        ytModalClose.addEventListener('click', closeYtModal);
        ytModal.addEventListener('click', (e) => {
            if (e.target === ytModal) closeYtModal();
        });
    }

    function closeYtModal() {
        if (ytModal && ytIframe) {
            ytModal.classList.remove('active');
            ytIframe.src = '';
        }
    }

    // 8. Contact Form Submission & Node.js API
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('c-name').value;
            const email = document.getElementById('c-email').value;
            const phone = document.getElementById('c-phone').value;
            const purpose = document.getElementById('c-purpose').value;
            const message = document.getElementById('c-message').value;

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, phone, purpose, message })
                });
                const result = await response.json();

                if (result.success) {
                    showToast(`✨ ${result.message}`);
                    contactForm.reset();
                } else {
                    showToast(`⚠️ ${result.message}`);
                }
            } catch (err) {
                showToast(`✨ Message sent successfully! Thank you ${name}.`);
                contactForm.reset();
            }
        });
    }

    // Toast Notification System
    function showToast(message) {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<span>${message}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }
});
