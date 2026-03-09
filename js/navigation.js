/* ═══════════════════════════════════════════════════════════════════
   NAVIGATION – Floating nav, mobile hamburger
   ═══════════════════════════════════════════════════════════════════ */

(function() {
    const hamburger = document.querySelector('.nav-hamburger');
    const mobileMenu = document.querySelector('.nav-mobile-menu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            mobileMenu.classList.toggle('visible');
        });

        // Close mobile menu when a link is clicked
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                mobileMenu.classList.remove('visible');
            });
        });
    }

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                document.body.style.setProperty('overflow', 'auto', 'important');
                document.documentElement.style.setProperty('overflow', 'auto', 'important');
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
})();
