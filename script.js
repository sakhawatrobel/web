// Portfolio website v1.3.0: shared interactions begin.
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

const footerLocation = document.querySelector(".footer-bottom-inner p:last-child");
if (footerLocation) {
  const footerSocials = document.createElement("div");
  footerSocials.className = "footer-socials";
  footerSocials.setAttribute("aria-label", "Academic and social profiles");
  footerSocials.innerHTML = `
    <a class="footer-social-icon" href="https://www.linkedin.com/in/sakhawat-hossan-robel-b72205234" target="_blank" rel="noreferrer" aria-label="LinkedIn profile" title="LinkedIn">
      <i data-lucide="linkedin" data-fallback="in"></i><span class="sr-only">LinkedIn</span>
    </a>
    <a class="footer-social-icon" href="mailto:sakhawathossanrobel@gmail.com" aria-label="Email Sakhawat Hossan Robel" title="Email">
      <i data-lucide="mail" data-fallback="@"></i><span class="sr-only">Email</span>
    </a>
    <a class="footer-social-icon" href="https://scholar.google.com/citations?hl=en&user=4PLuLYYAAAAJ" target="_blank" rel="noreferrer" aria-label="Google Scholar profile" title="Google Scholar">
      <i data-lucide="graduation-cap" data-fallback="G"></i><span class="sr-only">Google Scholar</span>
    </a>`;
  footerLocation.replaceWith(footerSocials);

  const lucideScript = document.createElement("script");
  lucideScript.src = "https://unpkg.com/lucide@0.468.0/dist/umd/lucide.min.js";
  lucideScript.onload = () => window.lucide?.createIcons();
  document.head.appendChild(lucideScript);
}

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
// Portfolio website v1.3.0: shared interactions end.
