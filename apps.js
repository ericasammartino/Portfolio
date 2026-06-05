document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-button");
  const navMenu = document.querySelector("#primary-navigation");
  const navLinks = document.querySelectorAll(".nav-menu a");
  const revealElements = document.querySelectorAll("[data-reveal]");

  if (menuButton && navMenu) {
    const setMenuState = (isOpen) => {
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
      navMenu.setAttribute("aria-hidden", String(!isOpen));
      navMenu.classList.toggle("is-open", isOpen);
      document.body.classList.toggle("menu-is-open", isOpen);
    };

    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      setMenuState(!isOpen);
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => setMenuState(false));
    });

    document.addEventListener("click", (event) => {
      const clickedInsideNav = event.target instanceof Element && event.target.closest("nav");

      if (!clickedInsideNav && navMenu.classList.contains("is-open")) {
        setMenuState(false);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navMenu.classList.contains("is-open")) {
        setMenuState(false);
        menuButton.focus();
      }
    });
  }

  if (!revealElements.length) {
    return;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: "0px 0px -80px 0px",
      threshold: 0.2,
    }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
});
