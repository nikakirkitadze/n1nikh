document.addEventListener('DOMContentLoaded', () => {

    // Preloader
    const preloader = document.getElementById('preloader');
    const hide = () => preloader.classList.add('loaded');
    window.addEventListener('load', () => setTimeout(hide, 1600));
    setTimeout(hide, 3000);

    // Navbar scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Mobile menu
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function (e) {
            e.preventDefault();
            const t = document.querySelector(this.getAttribute('href'));
            if (t) window.scrollTo({ top: t.offsetTop - 60, behavior: 'smooth' });
        });
    });

    // Scroll reveal
    const reveal = () => {
        const els = document.querySelectorAll(
            '.masonry-item, .section-head, .about-grid, .statement, .contact-layout, .strip-item'
        );
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

        els.forEach((el, i) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(35px)';
            el.style.transition = `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${(i % 6) * 0.06}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${(i % 6) * 0.06}s`;
            obs.observe(el);
        });
    };
    reveal();

    // Lightbox
    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lb-img');
    const lbClose = document.querySelector('.lb-close');

    document.querySelectorAll('.masonry-item').forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) {
                lbImg.src = img.src;
                lbImg.alt = img.alt;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    const closeLB = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    lbClose.addEventListener('click', closeLB);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLB(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLB(); });

    // Parallax hero
    const heroImg = document.querySelector('.hero-img');
    if (heroImg && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            heroImg.style.transform = `scale(${1.05 + window.scrollY * 0.0001}) translateY(${window.scrollY * 0.15}px)`;
        });
    }

});
