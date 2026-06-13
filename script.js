document.addEventListener('DOMContentLoaded', () => {

    const translations = {
        en: {
            nav_story: "Our Story",
            nav_products: "Products",
            nav_order: "How to Order",
            nav_contact: "Contact",
            hero_eyebrow: "Menikhinna, Kandy",
            hero_headline: "Fresh from our farm.",
            hero_sub: "Eggs and chicken raised with care. No middlemen, no cold storage. Just real food for your family.",
            hero_cta_primary: "Shop the Harvest",
            hero_cta_secondary: "Order on WhatsApp",
            story_eyebrow: "Our Story",
            story_heading: "A family farm.",
            founders_eyebrow: "Who we are",
            products_eyebrow: "Current Harvest",
            products_heading: "What we grow",
            order_eyebrow: "How It Works",
            order_heading: "Ordering is simple.",
            subscribe_heading: "Be a regular.",
            contact_eyebrow: "Contact",
            contact_heading: "We're just a message away."
        },
        si: {
            nav_story: "අපගේ කතාව",
            nav_products: "නිෂ්පාදන",
            nav_order: "ඇණවුම් කරන ආකාරය",
            nav_contact: "සම්බන්ධ වන්න",
            hero_eyebrow: "මැණිකිහිණ, මහනුවර",
            hero_headline: "අපේ ගෙවත්තෙන් නැවුම්ව.",
            hero_sub: "මැණිකිහිණ හිදී ආදරයෙන් සහ පිරිසිදුව වගා කරන ලද බිත්තර හා කුකුළු මස්.",
            hero_cta_primary: "නිෂ්පාදන බලන්න",
            hero_cta_secondary: "WhatsApp හරහා ඇණවුම් කරන්න",
            story_eyebrow: "අපගේ කතාව",
            story_heading: "පවුලේ ගොවිතැනක්.",
            founders_eyebrow: "අපගේ පුද්ගලයින්",
            products_eyebrow: "දැනට ලබාගත හැකි",
            products_heading: "අප වගා කරන්නේ",
            order_eyebrow: "ක්‍රියාවලිය",
            order_heading: "ඇණවුම් කිරීම සරලයි.",
            subscribe_heading: "නිරන්තර ගනුදෙනුකාරයෙකු වන්න.",
            contact_eyebrow: "සම්බන්ධ වන්න",
            contact_heading: "අපි සැමවිටම ළඟ සිටිමු."
        }
    };

    // Performance Update: Throttled Scroll Execution
    const navbar = document.getElementById('navbar');
    const heroBg = document.querySelector('.hero-bg-img');
    let isScrolling = false;
    let prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                const scrolled = window.scrollY;
                
                if (scrolled > 10) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                isScrolling = false;
            });
            isScrolling = true;
        }
    });

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuCloseBtn = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileBackdrop = document.getElementById('mobile-backdrop');
    const body = document.body;
    const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-link-sm');

    const openMenu = () => {
        mobileMenu.classList.add('active');
        mobileBackdrop.classList.add('active');
        body.classList.add('no-scroll');
        if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'true');
    };

    const closeMenu = () => {
        mobileMenu.classList.remove('active');
        mobileBackdrop.classList.remove('active');
        if (!document.querySelector('.modal-overlay:not(.hidden)')) {
            body.classList.remove('no-scroll');
        }
        if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'false');
    };

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMenu);
    if (mobileMenuCloseBtn) mobileMenuCloseBtn.addEventListener('click', closeMenu);
    if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (!link.classList.contains('modal-trigger')) {
                closeMenu();
            }
        });
    });

    const revealGroups = document.querySelectorAll('.reveal-group');
    revealGroups.forEach(group => {
        const children = Array.from(group.children);
        children.forEach((child, index) => {
            child.classList.add('reveal');
            child.style.transitionDelay = `${index * 100}ms`;
        });
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0
    });

    document.querySelectorAll('.reveal, .reveal-horizontal').forEach(el => {
        revealObserver.observe(el);
    });

    const heroTitleWords = document.querySelector('.stagger-text');
    if (heroTitleWords) {
        const text = heroTitleWords.textContent;
        heroTitleWords.innerHTML = '';
        const words = text.split(' ');
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.innerHTML = word + '&nbsp;'; 
            span.style.animationDelay = `${index * 80}ms`;
            heroTitleWords.appendChild(span);
        });
    }

    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox ? lightbox.querySelector('.lightbox-img') : null;
    const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;
    const lightboxPrev = lightbox ? lightbox.querySelector('.lightbox-prev') : null;
    const lightboxNext = lightbox ? lightbox.querySelector('.lightbox-next') : null;
    
    let currentGalleryIndex = 0;
    let scrollPosition = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    const lightboxCounter = document.getElementById('lightbox-counter');

    const updateLightboxImage = (index) => {
        if (galleryItems[index] && lightboxImg) {
            // Initiate fade out
            lightboxImg.style.opacity = '0';
            lightboxImg.style.transform = 'scale(0.98)';
            
            // Wait for fade out, swap source, then fade in
            setTimeout(() => {
                lightboxImg.src = galleryItems[index].src;
                currentGalleryIndex = index;
                
                if (lightboxCounter) {
                    lightboxCounter.textContent = `${index + 1} / ${galleryItems.length}`;
                }
                
                lightboxImg.onload = () => {
                    lightboxImg.style.opacity = '1';
                    lightboxImg.style.transform = 'scale(1)';
                };
            }, 200); // 200ms matches the CSS transition speed
        }
    };

    galleryItems.forEach((img, index) => {
        const itemContainer = img.closest('.gallery-item');
        if (itemContainer) {
            itemContainer.addEventListener('click', () => {
                if (img.src && lightbox) {
                    updateLightboxImage(index);
                    lightbox.classList.add('active');
                    
                    scrollPosition = window.scrollY;
                    document.body.style.position = 'fixed';
                    document.body.style.top = `-${scrollPosition}px`;
                    document.body.style.width = '100%';
                    
                    window.history.pushState({ modalOpen: true }, '', window.location.href);
                }
            });

            itemContainer.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') itemContainer.click();
            });
        }
    });

    const closeLightbox = () => {
        if(lightbox && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            
            // FIX: Temporarily disable smooth scroll to prevent the "roll out" glitch
            document.documentElement.style.scrollBehavior = 'auto';
            window.scrollTo(0, scrollPosition);
            
            // Re-enable smooth scroll immediately after the jump
            setTimeout(() => { 
                document.documentElement.style.scrollBehavior = ''; 
            }, 50);
            
            setTimeout(() => { if (lightboxImg) lightboxImg.src = ''; }, 300);
        }
    };

    window.addEventListener('popstate', (event) => {
        if (lightbox && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    if(lightboxClose) lightboxClose.addEventListener('click', () => {
        closeLightbox();
        if (window.history.state && window.history.state.modalOpen) window.history.back();
    });

    if (lightboxPrev) lightboxPrev.addEventListener('click', (e) => { 
        e.stopPropagation(); 
        updateLightboxImage((currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length); 
    });
    
    if (lightboxNext) lightboxNext.addEventListener('click', (e) => { 
        e.stopPropagation(); 
        updateLightboxImage((currentGalleryIndex + 1) % galleryItems.length); 
    });
    
    if(lightbox) {
        if (lightboxImg) {
            lightboxImg.style.cursor = 'pointer';
            lightboxImg.addEventListener('click', (e) => {
                e.stopPropagation();
                updateLightboxImage((currentGalleryIndex + 1) % galleryItems.length);
            });
        }

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-content-wrapper')) {
                closeLightbox();
                if (window.history.state && window.history.state.modalOpen) window.history.back();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') {
                closeLightbox();
                if (window.history.state && window.history.state.modalOpen) window.history.back();
            }
            if (e.key === 'ArrowRight') updateLightboxImage((currentGalleryIndex + 1) % galleryItems.length);
            if (e.key === 'ArrowLeft') updateLightboxImage((currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length);
        });

        lightbox.addEventListener('touchstart', e => {
            touchStartY = e.changedTouches[0].screenY;
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        lightbox.addEventListener('touchend', e => {
            touchEndY = e.changedTouches[0].screenY;
            touchEndX = e.changedTouches[0].screenX;
            
            const diffY = touchEndY - touchStartY;
            const diffX = touchEndX - touchStartX;
            
            if (Math.abs(diffY) > 80 && Math.abs(diffY) > Math.abs(diffX)) {
                closeLightbox();
                if (window.history.state && window.history.state.modalOpen) window.history.back();
            }
            else if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
                if (diffX < 0) updateLightboxImage((currentGalleryIndex + 1) % galleryItems.length);
                else updateLightboxImage((currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length);
            }
        }, { passive: true });
    }

    const langToggles = document.querySelectorAll('.lang-toggle');
    const toastNotification = document.getElementById('toast-notification');
    let toastTimeout;

    const showToast = (message) => {
        if (!toastNotification) return;
        toastNotification.textContent = message;
        toastNotification.classList.remove('hidden');
        
        setTimeout(() => {
            toastNotification.classList.add('show');
        }, 10);

        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toastNotification.classList.remove('show');
            setTimeout(() => toastNotification.classList.add('hidden'), 400);
        }, 3000);
    };

    if (langToggles.length > 0) {
        langToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                showToast("Translation engine disconnected.");
            });
        });
    }

    // Form Validation and Network State Simulation
    const subForm = document.getElementById('subscribe-form');
    const subSuccess = document.getElementById('sub-success');
    const subError = document.getElementById('sub-error');
    
    if (subForm) {
        subForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('sub-email').value;
            
            if (subError) subError.classList.add('hidden');
            
            if (email && email.includes('@')) {
                const btn = subForm.querySelector('button');
                const originalText = btn.textContent;
                btn.textContent = 'Joining...';
                
                // Simulate network latency & occasional failure
                setTimeout(() => {
                    btn.textContent = originalText;
                    if (Math.random() > 0.8) { // 20% simulated failure rate
                        if (subError) subError.classList.remove('hidden');
                    } else {
                        subForm.querySelector('.form-group').classList.add('hidden');
                        if (subSuccess) subSuccess.classList.remove('hidden');
                    }
                }, 800);
            } else {
                showToast("Please enter a valid email address.");
            }
        });
    }

    const inqForm = document.getElementById('inquiry-form');
    const inqSuccess = document.getElementById('inq-success');
    const inqError = document.getElementById('inq-error');
    
    if (inqForm) {
        inqForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (inqError) inqError.classList.add('hidden');

            if(inqForm.checkValidity()) {
                const btn = inqForm.querySelector('button');
                const originalText = btn.textContent;
                btn.textContent = 'Sending...';
                
                // Simulate network latency & occasional failure
                setTimeout(() => {
                    btn.textContent = originalText;
                    if (Math.random() > 0.8) { // 20% simulated failure rate
                        if (inqError) inqError.classList.remove('hidden');
                    } else {
                        inqForm.querySelectorAll('.form-group, button').forEach(el => el.classList.add('hidden'));
                        if (inqSuccess) inqSuccess.classList.remove('hidden');
                    }
                }, 1000);
            } else {
                showToast("Please fill in all required fields.");
            }
        });
    }

    // Global Image Protection
    document.addEventListener('contextmenu', (e) => {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
        }
    });

    // Image Skeleton Loading Tracker
    document.querySelectorAll('.img-placeholder img').forEach(img => {
        if (img.complete) {
            img.parentElement.classList.add('img-loaded');
        } else {
            img.addEventListener('load', () => {
                img.parentElement.classList.add('img-loaded');
            });
            // Stop the skeleton animation if the image fails to load
            img.addEventListener('error', () => {
                img.parentElement.classList.add('img-loaded');
            });
        }
    });

    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept');
    const declineBtn = document.getElementById('cookie-decline');
    
    if (!localStorage.getItem('nf_cookies') && cookieBanner) {
        cookieBanner.classList.remove('hidden');
    }

    const hideCookieBanner = () => {
        if(cookieBanner) {
            cookieBanner.classList.add('hide-down');
            setTimeout(() => cookieBanner.classList.add('hidden'), 400);
            
            // Trigger newsletter slide if user is already past the scroll threshold when accepting cookies
            const newsletterSlide = document.getElementById('newsletter-slide');
            if (newsletterSlide && !localStorage.getItem('nf_slide_dismissed') && !window.slideTriggered) {
                const scrollPosition = window.scrollY + window.innerHeight;
                const triggerPoint = document.body.offsetHeight * 0.5;
                if (scrollPosition > triggerPoint) {
                    setTimeout(() => {
                        newsletterSlide.classList.add('active');
                        window.slideTriggered = true;
                    }, 500);
                }
            }
        }
    };

    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('nf_cookies', 'accepted');
            hideCookieBanner();
        });
    }

    if (declineBtn) {
        declineBtn.addEventListener('click', () => {
            localStorage.setItem('nf_cookies', 'declined');
            hideCookieBanner();
        });
    }

    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const closeButtons = document.querySelectorAll('.modal-close');
    const overlays = document.querySelectorAll('.modal-overlay:not(#lightbox)');
    let lastFocusedElement;

    // Accessibility Update: Focus Trapping
    const openModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            lastFocusedElement = document.activeElement;
            modal.classList.remove('hidden');
            body.classList.add('no-scroll');
            
            const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if(focusableElements.length > 0) {
                setTimeout(() => { focusableElements[0].focus(); }, 100);
            } else {
                modal.querySelector('.modal-box').focus();
            }
        }
    };

    const closeModals = () => {
        overlays.forEach(overlay => {
            overlay.classList.add('hidden');
        });
        if (!mobileMenu.classList.contains('active')) {
            body.classList.remove('no-scroll');
        }
        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    };

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            openModal(trigger.getAttribute('data-modal'));
        });
    });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            closeModals();
        });
    });

    overlays.forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModals();
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModals();
            if (lightbox && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        }
    });

    const sections = document.querySelectorAll('.section-target');
    const navLinks = document.querySelectorAll('.nav-link');

    const activeNavObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    // Better fallback targeting depending on exactly how the URL is loaded
                    if (link.getAttribute('href') === `#${entry.target.id}` || link.getAttribute('href') === `index.html#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        root: null,
        rootMargin: '-20% 0px -60% 0px', /* Shifted detection window to account for the new scroll-padding layout */
        threshold: 0
    });

    sections.forEach(section => {
        activeNavObserver.observe(section);
    });
});

// Slide-in Newsletter Logic
    const newsletterSlide = document.getElementById('newsletter-slide');
    window.slideTriggered = false;

    if (newsletterSlide && !localStorage.getItem('nf_slide_dismissed')) {
        window.addEventListener('scroll', () => {
            if (!window.slideTriggered) {
                const cookiesHandled = localStorage.getItem('nf_cookies');
                const scrollPosition = window.scrollY + window.innerHeight;
                const triggerPoint = document.body.offsetHeight * 0.5;
                
                // Only trigger if cookie banner is dismissed to prevent UI overlap
                if (scrollPosition > triggerPoint && cookiesHandled) {
                    newsletterSlide.classList.add('active');
                    window.slideTriggered = true;
                }
            }
        });

        // Handle Dismissal to avoid annoying users on next visit
        const closeSlideBtn = newsletterSlide.querySelector('.close-slide');
        const joinBtn = newsletterSlide.querySelector('.btn-primary');
        
        const dismissSlide = () => {
            newsletterSlide.classList.remove('active');
            localStorage.setItem('nf_slide_dismissed', 'true');
        };

        if(closeSlideBtn) closeSlideBtn.addEventListener('click', dismissSlide);
        if(joinBtn) joinBtn.addEventListener('click', dismissSlide);
    }