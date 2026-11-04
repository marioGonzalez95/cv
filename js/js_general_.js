document.addEventListener("DOMContentLoaded", function () {
  const backToTopButton = document.getElementById("back-to-top");
  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.getElementById("sidebar");
  const sidebarOverlay = document.getElementById("sidebar-overlay");
  const sidebarLinks = document.querySelectorAll(".sidebar-link");
  const sections = document.querySelectorAll(".container-body section[id]");
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const scrollBehavior = prefersReducedMotion ? "auto" : "smooth";

  // Mostrar u ocultar el botón al hacer scroll
  window.addEventListener("scroll", function () {
    backToTopButton.classList.toggle("visible", window.scrollY > 300);
  });

  // Volver al inicio
  backToTopButton.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: scrollBehavior });
  });

  // Abrir / cerrar el menú móvil
  function syncSidebarInert() {
    const isMobile = window.innerWidth <= 850;
    sidebar.inert = isMobile && !sidebar.classList.contains("active");
  }

  function openSidebar() {
    sidebar.inert = false;
    menuToggle.classList.add("active");
    sidebar.classList.add("active");
    sidebarOverlay.classList.add("active");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Cerrar menú");
    document.body.style.overflow = "hidden";
  }

  function closeSidebar(restoreFocus) {
    menuToggle.classList.remove("active");
    sidebar.classList.remove("active");
    sidebarOverlay.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    document.body.style.overflow = "";
    syncSidebarInert();
    if (restoreFocus) {
      menuToggle.focus();
    }
  }

  syncSidebarInert();

  menuToggle.addEventListener("click", function () {
    if (sidebar.classList.contains("active")) {
      closeSidebar(true);
    } else {
      openSidebar();
    }
  });

  sidebarOverlay.addEventListener("click", function () {
    closeSidebar(true);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && sidebar.classList.contains("active")) {
      closeSidebar(true);
    }
  });

  // Cerrar el menú si se agranda la ventana
  window.addEventListener("resize", function () {
    if (window.innerWidth > 850 && sidebar.classList.contains("active")) {
      closeSidebar(false);
    }
    syncSidebarInert();
  });

  // Scroll suave y cierre del menú
  sidebarLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const isMobile = window.innerWidth <= 850;
        const offset = isMobile ? 70 : 20;
        const targetPosition = targetSection.offsetTop - offset;

        window.scrollTo({
          top: targetPosition,
          behavior: scrollBehavior,
        });

        setActiveLink(targetId);
        closeSidebar(false);
        targetSection.setAttribute("tabindex", "-1");
        targetSection.focus({ preventScroll: true });
        return;
      }

      closeSidebar(false);
    });
  });

  function setActiveLink(targetId) {
    sidebarLinks.forEach(function (link) {
      const isActive = link.getAttribute("href") === targetId;
      link.classList.toggle("active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  // Resaltar la sección visible
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActiveLink("#" + entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }
});
