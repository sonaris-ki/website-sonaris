/* ═══════════════════════════════════════════════════════════════════
   ACCORDION – FAQ + product detail accordion + team overlays
   ═══════════════════════════════════════════════════════════════════ */

(function() {
    // FAQ accordion
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            const answer = item.querySelector('.faq-answer');
            const isOpen = item.classList.contains('open');

            // Close all other items
            document.querySelectorAll('.faq-item.open').forEach(openItem => {
                if (openItem !== item) {
                    openItem.classList.remove('open');
                    openItem.querySelector('.faq-answer').style.maxHeight = '0';
                    openItem.querySelector('.faq-icon').textContent = '+';
                }
            });

            // Toggle current
            if (!isOpen) {
                item.classList.add('open');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                btn.querySelector('.faq-icon').textContent = '−';
            } else {
                item.classList.remove('open');
                answer.style.maxHeight = '0';
                btn.querySelector('.faq-icon').textContent = '+';
            }
        });
    });

    // Product detail toggles
    document.querySelectorAll('.product-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const detail = btn.nextElementSibling;
            if (!detail || !detail.classList.contains('product-detail')) return;
            const isOpen = detail.classList.contains('open');

            if (isOpen) {
                detail.classList.remove('open');
                detail.style.maxHeight = '0';
                btn.textContent = '+ Details';
            } else {
                detail.classList.add('open');
                detail.style.maxHeight = detail.scrollHeight + 'px';
                btn.textContent = '− Details';
            }
        });
    });

    // Carousel navigation
    document.querySelectorAll('.carousel-nav button').forEach(btn => {
        btn.addEventListener('click', () => {
            const carousel = btn.closest('.section-inner--wide, .section-inner')?.querySelector('.case-carousel')
                || document.querySelector('.case-carousel');
            if (!carousel) return;

            const scrollAmount = 364;
            if (btn.classList.contains('carousel-prev')) {
                carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        });
    });

    // Team member overlays
    document.querySelectorAll('.team-more-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const overlay = document.getElementById(targetId);
            if (overlay) {
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    document.querySelectorAll('.team-overlay-close').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.team-overlay').classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    document.querySelectorAll('.team-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.team-overlay.active').forEach(overlay => {
                overlay.classList.remove('active');
            });
            document.body.style.overflow = '';
        }
    });
})();
