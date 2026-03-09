/* ═══════════════════════════════════════════════════════════════════
   GLOSSARY – Tooltip system linking content terms to fragment data
   ═══════════════════════════════════════════════════════════════════ */

(function() {
    if (typeof allFragmentData === 'undefined') return;

    const termMap = {};
    allFragmentData.forEach(d => { termMap[d.text.toLowerCase()] = d; });

    const glossaryTerms = document.querySelectorAll('.glossary-term');

    glossaryTerms.forEach(el => {
        const termKey = (el.dataset.term || el.textContent).toLowerCase();
        const data = termMap[termKey];
        if (!data) return;

        const tooltip = document.createElement('span');
        tooltip.className = 'glossary-tooltip';
        tooltip.textContent = data.explanation;
        el.appendChild(tooltip);
    });
})();
