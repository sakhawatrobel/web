// Portfolio website v1.2.0: shared interactions begin.
const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navMenu = document.querySelector("[data-nav-menu]");
const yearNodes = document.querySelectorAll("[data-year]");

const setHeaderState = () => {
  if (header) header.classList.toggle("scrolled", window.scrollY > 16);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });
yearNodes.forEach((node) => { node.textContent = new Date().getFullYear(); });

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });
}

const revealNodes = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.09, rootMargin: "0px 0px -4% 0px" });

  revealNodes.forEach((node) => observer.observe(node));
  document.documentElement.classList.add("motion");
  requestAnimationFrame(() => {
    revealNodes.forEach((node) => {
      if (node.getBoundingClientRect().top < window.innerHeight * .96) node.classList.add("is-visible");
    });
  });
  window.setTimeout(() => document.documentElement.classList.add("motion-failsafe"), 2600);
} else {
  revealNodes.forEach((node) => node.classList.add("is-visible"));
}

const filters = document.querySelectorAll("[data-filter]");
const publications = document.querySelectorAll("[data-category]");
filters.forEach((button) => {
  button.addEventListener("click", () => {
    const activeFilter = button.dataset.filter;
    filters.forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    publications.forEach((publication) => {
      const show = activeFilter === "all" || publication.dataset.category === activeFilter;
      publication.classList.toggle("is-hidden", !show);
    });
  });
});
// Portfolio website v1.2.0: shared interactions end.
