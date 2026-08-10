/**
 * Educator & YouTube Teacher Portfolio - Interactive JavaScript Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
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

        // Close mobile nav when clicking a link
        document.querySelectorAll('.nav-link, .nav-btn-mobile').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                if (mobileToggle.querySelector('i')) {
                    mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
                }
            });
        });
    }

    // 2. Navbar Glass Background on Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Section Link Highlight
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href*=${sectionId}]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    });

    // 3. Spotlight Mouse Tracking for Glass Cards
    const spotlightCards = document.querySelectorAll('.spotlight-card');
    spotlightCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // 4. Animated Stats Counter (Intersection Observer)
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    const animateCounters = () => {
        statNumbers.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 1500; // ms
            const stepTime = 20;
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

    // 5. Video Filtering Functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const videoCards = document.querySelectorAll('.video-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            videoCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.4s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 6. Video Player Lightbox Modal
    const videoModal = document.getElementById('video-modal');
    const videoIframe = document.getElementById('video-iframe');
    const modalClose = document.getElementById('modal-close');

    videoCards.forEach(card => {
        card.addEventListener('click', () => {
            const videoId = card.getAttribute('data-video-id') || 'dQw4w9WgXcQ';
            if (videoIframe && videoModal) {
                // Using YouTube privacy-enhanced embed URL format
                videoIframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`;
                videoModal.classList.add('active');
            }
        });
    });

    if (modalClose && videoModal) {
        modalClose.addEventListener('click', closeVideoModal);
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) closeVideoModal();
        });
    }

    function closeVideoModal() {
        if (videoModal && videoIframe) {
            videoModal.classList.remove('active');
            videoIframe.src = '';
        }
    }

    // 7. CV Quick Preview & Download Modal Handlers
    const cvModal = document.getElementById('cv-modal');
    const previewCvBtn = document.getElementById('preview-cv-btn');
    const cvModalClose = document.getElementById('cv-modal-close');
    const downloadCvBtn = document.getElementById('download-cv-btn');

    if (previewCvBtn && cvModal) {
        previewCvBtn.addEventListener('click', () => {
            cvModal.classList.add('active');
        });
    }

    if (cvModalClose && cvModal) {
        cvModalClose.addEventListener('click', () => {
            cvModal.classList.remove('active');
        });
        cvModal.addEventListener('click', (e) => {
            if (e.target === cvModal) cvModal.classList.remove('active');
        });
    }

    if (downloadCvBtn) {
        downloadCvBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showToast('📄 Download started! (Replace link with actual CV PDF URL)');
        });
    }

    // 8. Contact Form Submission & Toast Alert
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            showToast(`✨ Thank you, ${name}! Your message has been sent successfully.`);
            contactForm.reset();
        });
    }

    // Toast Notification System
    function showToast(message) {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #f59e0b;"></i> <span>${message}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }
});
