(() => {
  const toggle = document.querySelector("[data-nav-toggle]");
  const menu = document.querySelector("[data-menu]");
  const slider = document.querySelector("[data-slider]");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll(".hero-slide"));
  const dots = Array.from(slider.querySelectorAll(".hero-slider-dots button"));

  if (!slides.length || !dots.length) return;

  let current = 0;

  const setActive = (index) => {
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === index);
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === index);
    });

    current = index;
  };

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      setActive(index);
    });
  });

  window.setInterval(() => {
    const next = (current + 1) % slides.length;
    setActive(next);
  }, 4200);
})();
