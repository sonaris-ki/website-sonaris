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
        document.body.style.setProperty('overflow', 'auto', 'important');
        document.documentElement.style.setProperty('overflow', 'auto', 'important');
        if (scrollIndicator) scrollIndicator.classList.remove('visible');
        clearTimeout(indicatorTimer);
    }

    function scrollToContent() {
        enableScroll();
        const aiFirst = document.getElementById('ai-first');
        setTimeout(() => {
            if (aiFirst) {
                aiFirst.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                const targetY = Math.max(0, window.innerHeight * 1.3 - 100);
                window.scrollTo({ top: targetY, left: 0, behavior: 'smooth' });
            }
        }, 50);
    }

    // Scroll indicator click
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', scrollToContent);
    }

    // Chat scroll hint (three arrows) – Event-Delegation, da Klicks sonst blockiert werden
    const chatScrollHint = document.getElementById('chat-scroll-hint');
    function handleScrollHintActivate(e) {
        const isOnHint = chatScrollHint && (
            e.type === 'keydown' ? document.activeElement === chatScrollHint
                : chatScrollHint.contains(e.target)
        );
        if (!isOnHint) return;
        if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
        e.preventDefault();
        e.stopPropagation();
        scrollToContent();
    }
    if (chatScrollHint) {
        document.addEventListener('click', handleScrollHintActivate, true);
        document.addEventListener('touchend', handleScrollHintActivate, true);
        chatScrollHint.addEventListener('keydown', handleScrollHintActivate);
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

    const PAGE2_START = () => Math.max(0, window.innerHeight * 1.3 - 100);
    let lastScrollY = 0;

    // Main scroll handler
    function handleScroll() {
        if (!scrollEnabled) return;

        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;

        // Canvas fade: starts after spacer (130vh), fully faded by 130vh + 200px
        const spacerHeight = viewportHeight * 1.3;
        const fadeStart = spacerHeight;
        const fadeEnd = spacerHeight + 200;

        // Beim ersten Einstieg vom Denkraum in den Content: direkt an Anfang von Seite 2 springen
        // (nur wenn wir noch im oberen Denkraum waren, nicht wenn wir bereits am Zielpunkt sind)
        if (lastScrollY < spacerHeight - 120 && scrollY >= fadeStart) {
            window.scrollTo({ top: PAGE2_START(), behavior: 'auto' });
        }
        lastScrollY = window.scrollY;

        let canvasOpacity = 1;
        if (scrollY > fadeStart) {
            canvasOpacity = Math.max(0.08, 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart));
        }

        if (denkraumLayer) {
            denkraumLayer.style.opacity = canvasOpacity;
            denkraumLayer.style.pointerEvents = scrollY > fadeStart ? 'none' : 'auto';
        }

        // Pause canvas when fully faded
        if (typeof canvasPaused !== 'undefined') {
            canvasPaused = canvasOpacity <= 0.1;
        }

        // Determine if we're in content zone
        const wasInContentZone = inContentZone;
        inContentZone = scrollY > fadeStart;

        // Show/hide floating nav (dot-nav stays visible; floating nav only in content)
        if (inContentZone) {
            if (floatingNav) floatingNav.classList.add('visible');
        } else {
            if (floatingNav) floatingNav.classList.remove('visible');
        }

        // Chat transformation: minimize panel, show float button
        if (inContentZone && !wasInContentZone) {
            if (chatPanel) chatPanel.classList.add('minimized');
            if (chatFloatBtn) chatFloatBtn.classList.add('visible');
            if (chatScrollHint) chatScrollHint.style.display = 'none';

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
            if (chatScrollHint) chatScrollHint.style.display = '';

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

    // ── Dot nav: visible from start as scroll hint; clicks enable scroll + jump ───

    if (dotNav) dotNav.classList.add('visible');

    dotItems.forEach(dot => {
        dot.addEventListener('click', () => {
            enableScroll();
            setTimeout(() => {
                const target = document.getElementById(dot.dataset.section);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            }, 50);
        });
    });

})();
