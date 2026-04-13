(() => {
  const menuToggle = document.querySelector('[data-nav-toggle]');
  const menu = document.querySelector('[data-menu]');
  const year = document.querySelector('[data-year]');
  const trackableLinks = document.querySelectorAll('[data-track-event]');

  const trackEvent = (eventName, payload = {}) => {
    if (!eventName) return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'cta_click',
      cta_name: eventName,
      ...payload,
    });
  };

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  trackableLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      trackEvent(link.dataset.trackEvent, {
        cta_location: link.dataset.trackLocation || '',
        cta_type: link.dataset.trackType || 'link',
        cta_target: link.getAttribute('href') || '',
      });

      const href = link.getAttribute('href') || '';
      const isWhatsappCta = href.includes('wa.me/');
      if (isWhatsappCta && typeof window.gtag_report_conversion === 'function') {
        event.preventDefault();
        window.gtag_report_conversion(href);
      }
    });
  });

  if (!menuToggle || !menu) return;

  menuToggle.addEventListener('click', () => {
    const opened = menu.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(opened));
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
})();
