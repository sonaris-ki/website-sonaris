/* ═══════════════════════════════════════════════════════════════════
   SCROLL – Scroll observer, section tracking, canvas fade
   ═══════════════════════════════════════════════════════════════════ */

(function() {
    const denkraumLayer = document.getElementById('denkraum-layer');
    const contentLayer = document.getElementById('content-layer');
    const scrollIndicator = document.getElementById('scroll-indicator');
    const chatPanel = document.getElementById('chat-panel');
    const chatFloatBtn = document.getElementById('chat-float-btn');
    const floatingNav = document.getElementById('floating-nav');
    const dotNav = document.getElementById('dot-nav');

    let scrollEnabled = false;
    let inContentZone = false;
    let dwellTimer = null;
    let sectionDwellStart = null;

    // Show scroll indicator after 8 seconds of inactivity
    let indicatorTimer = setTimeout(() => {
        if (scrollIndicator) scrollIndicator.classList.add('visible');
    }, 8000);

    // Reset indicator timer on interaction
    function resetIndicatorTimer() {
        clearTimeout(indicatorTimer);
        if (scrollIndicator) scrollIndicator.classList.remove('visible');
        indicatorTimer = setTimeout(() => {
            if (!scrollEnabled && scrollIndicator) scrollIndicator.classList.add('visible');
        }, 8000);
    }

    document.addEventListener('mousemove', resetIndicatorTimer);
    document.addEventListener('keydown', resetIndicatorTimer);

    // Enable scrolling
    function enableScroll() {
        if (scrollEnabled) return;
        scrollEnabled = true;
        document.body.style.overflow = 'auto';
        if (scrollIndicator) scrollIndicator.classList.remove('visible');
        clearTimeout(indicatorTimer);
    }

    // Scroll indicator click
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            enableScroll();
            const firstSection = document.querySelector('.content-section');
            if (firstSection) firstSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Detect scroll intent
    let wheelAccumulator = 0;
    document.addEventListener('wheel', (e) => {
        if (!scrollEnabled && e.deltaY > 0) {
            wheelAccumulator += e.deltaY;
            if (wheelAccumulator > 150) {
                enableScroll();
                wheelAccumulator = 0;
            }
        }
    }, { passive: true });

    // Touch scroll detection
    let touchStartY = 0;
    document.addEventListener('touchstart', (e) => { touchStartY = e.touches[0].clientY; }, { passive: true });
    document.addEventListener('touchmove', (e) => {
        const deltaY = touchStartY - e.touches[0].clientY;
        if (!scrollEnabled && deltaY > 80) enableScroll();
    }, { passive: true });

    // Main scroll handler
    function handleScroll() {
        if (!scrollEnabled) return;

        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;

        // Canvas fade: starts after spacer (100vh), fully faded by 100vh + 200px
        const fadeStart = viewportHeight;
        const fadeEnd = viewportHeight + 200;
        let canvasOpacity = 1;

        if (scrollY > fadeStart) {
            canvasOpacity = Math.max(0.08, 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart));
        }

        if (denkraumLayer) denkraumLayer.style.opacity = canvasOpacity;

        // Pause canvas when fully faded
        if (typeof canvasPaused !== 'undefined') {
            canvasPaused = canvasOpacity <= 0.1;
        }

        // Determine if we're in content zone
        const wasInContentZone = inContentZone;
        inContentZone = scrollY > fadeStart;

        // Show/hide floating nav
        if (inContentZone) {
            if (floatingNav) floatingNav.classList.add('visible');
            if (dotNav) dotNav.classList.add('visible');
        } else {
            if (floatingNav) floatingNav.classList.remove('visible');
            if (dotNav) dotNav.classList.remove('visible');
        }

        // Chat transformation: minimize panel, show float button
        if (inContentZone && !wasInContentZone) {
            if (chatPanel) chatPanel.classList.add('minimized');
            if (chatFloatBtn) chatFloatBtn.classList.add('visible');

            // Hide denkraum UI elements
            const denkraumFooter = document.getElementById('denkraum-footer');
            const logo = document.getElementById('logo');
            const badge = document.getElementById('learning-badge');
            const toggleEl = document.getElementById('toggle');
            if (denkraumFooter) denkraumFooter.style.opacity = '0';
            if (logo) logo.style.opacity = '0';
            if (badge) badge.style.opacity = '0';
            if (toggleEl) toggleEl.style.opacity = '0';
        } else if (!inContentZone && wasInContentZone) {
            if (chatPanel) chatPanel.classList.remove('minimized');
            if (chatFloatBtn) chatFloatBtn.classList.remove('visible');

            // Restore denkraum UI elements
            const denkraumFooter = document.getElementById('denkraum-footer');
            const logo = document.getElementById('logo');
            const badge = document.getElementById('learning-badge');
            const toggleEl = document.getElementById('toggle');
            if (denkraumFooter) denkraumFooter.style.opacity = '';
            if (logo) logo.style.opacity = '';
            if (badge) badge.style.opacity = '';
            if (toggleEl) toggleEl.style.opacity = '';
        }

        // Track active section for dot nav
        updateActiveSection();

        // Chat dwell pulse
        checkChatDwell();
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // ── Section tracking ──────────────────────────────────────────

    const sections = document.querySelectorAll('.content-section[id]');
    const dotItems = document.querySelectorAll('.dot-nav-item');
    let activeSection = null;

    function updateActiveSection() {
        const viewportCenter = window.scrollY + window.innerHeight / 2;
        let closest = null;
        let closestDist = Infinity;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const sectionCenter = window.scrollY + rect.top + rect.height / 2;
            const dist = Math.abs(viewportCenter - sectionCenter);
            if (dist < closestDist) {
                closestDist = dist;
                closest = section;
            }
        });

        if (closest && closest.id !== activeSection) {
            activeSection = closest.id;
            if (typeof currentSection !== 'undefined') currentSection = activeSection;

            dotItems.forEach(dot => {
                dot.classList.toggle('active', dot.dataset.section === activeSection);
            });

            // Reset dwell timer
            sectionDwellStart = performance.now();
        }
    }

    // ── Chat dwell pulse ──────────────────────────────────────────

    function checkChatDwell() {
        if (!inContentZone || !chatFloatBtn) return;
        if (sectionDwellStart && performance.now() - sectionDwellStart > 15000) {
            chatFloatBtn.classList.add('pulse');
        } else {
            chatFloatBtn.classList.remove('pulse');
        }
    }

    // ── Floating chat button ──────────────────────────────────────

    if (chatFloatBtn) {
        chatFloatBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => {
                const chatInputEl = document.getElementById('chat-input');
                if (chatInputEl) chatInputEl.focus();
            }, 800);
        });
    }

    // ── IntersectionObserver for reveal animations ────────────────

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // ── Scroll to top (nav logo click) ────────────────────────────

    const navLogo = document.querySelector('.nav-logo');
    if (navLogo) {
        navLogo.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ── Dot nav click ─────────────────────────────────────────────

    dotItems.forEach(dot => {
        dot.addEventListener('click', () => {
            const target = document.getElementById(dot.dataset.section);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

})();
