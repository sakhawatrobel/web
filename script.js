// Portfolio website v1.0.3: interaction layer begins.
const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navMenu = document.querySelector("[data-nav-menu]");
const yearNode = document.querySelector("[data-year]");
const filters = document.querySelectorAll("[data-filter]");
const publications = document.querySelectorAll("[data-category]");

const setHeaderState = () => {
  header.classList.toggle("scrolled", window.scrollY > 18);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const activeFilter = button.dataset.filter;
    filters.forEach((item) => item.classList.toggle("active", item === button));
    publications.forEach((publication) => {
      const shouldShow = activeFilter === "all" || publication.dataset.category === activeFilter;
      publication.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

// Portfolio website v1.0.3: interaction layer ends.
