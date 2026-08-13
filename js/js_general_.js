document.addEventListener("DOMContentLoaded", function () {
  const backToTopButton = document.getElementById("back-to-top");
  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.getElementById("sidebar");
  const sidebarOverlay = document.getElementById("sidebar-overlay");
  const sidebarLinks = document.querySelectorAll(".sidebar-link");
  const sections = document.querySelectorAll("[id]");

  // Mostrar u ocultar el botón al hacer scroll
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add("visible");
    } else {
      backToTopButton.classList.remove("visible");
    }

    // Resaltar sección activa
    updateActiveSection();
  });

  // Volver al inicio al hacer clic
  backToTopButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Toggle del menú hamburguesa
  menuToggle.addEventListener("click", function () {
    menuToggle.classList.toggle("active");
    sidebar.classList.toggle("active");
    sidebarOverlay.classList.toggle("active");
    document.body.style.overflow = sidebar.classList.contains("active") ? "hidden" : "";
  });

  // Cerrar menú al hacer clic en el overlay
  sidebarOverlay.addEventListener("click", function () {
    closeSidebar();
  });

  // Scroll suave y cerrar menú al hacer clic en un enlace
  sidebarLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const isMobile = window.innerWidth <= 850;
        const offset = isMobile ? 70 : 20;
        const targetPosition = targetSection.offsetTop - offset;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }

      closeSidebar();
    });
  });

  // Cerrar sidebar
  function closeSidebar() {
    menuToggle.classList.remove("active");
    sidebar.classList.remove("active");
    sidebarOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  // Actualizar sección activa basado en scroll
  function updateActiveSection() {
    const scrollPosition = window.scrollY + 150;

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        sidebarLinks.forEach(function (link) {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + sectionId) {
            link.classList.add("active");
          }
        });
      }
    });
  }
});
