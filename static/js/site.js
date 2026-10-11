(() => {
  const nav = document.querySelector(".section-nav");
  const progress = document.querySelector(".section-nav-progress");
  const links = Array.from(document.querySelectorAll(".section-nav a"));
  const sections = links
    .map((link) => document.querySelector(link.hash))
    .filter(Boolean);

  if (!nav || !progress || !sections.length) {
    return;
  }

  const setActiveLink = (activeSection) => {
    links.forEach((link) => {
      const isActive = link.hash === `#${activeSection.id}`;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const updateScrollState = () => {
    const scrollTop = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progressPercent = maxScroll > 0 ? Math.min((scrollTop / maxScroll) * 100, 100) : 0;
    const activationLine = scrollTop + window.innerHeight * 0.35;
    const firstSectionTop = sections[0].offsetTop;

    let activeSection = sections[0];
    sections.forEach((section) => {
      if (section.offsetTop <= activationLine) {
        activeSection = section;
      }
    });

    progress.style.height = `${progressPercent}%`;
    nav.classList.toggle("is-visible", scrollTop > firstSectionTop - window.innerHeight * 0.35);
    setActiveLink(activeSection);
  };

  let ticking = false;
  const requestUpdate = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateScrollState();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  document.addEventListener("toggle", requestUpdate, true);
  if (window.ResizeObserver) {
    new ResizeObserver(requestUpdate).observe(document.body);
  }
  updateScrollState();
})();
