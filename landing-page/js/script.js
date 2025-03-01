document.addEventListener("DOMContentLoaded", () => {
  // Menu mobile
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuToggle.setAttribute(
      "aria-expanded",
      menuToggle.getAttribute("aria-expanded") === "true" ? "false" : "true"
    );
  });

  // Fechar menu ao clicar em um link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Header com scroll
  const header = document.querySelector(".header");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      header.classList.remove("scroll-up");
      return;
    }

    if (
      currentScroll > lastScroll &&
      !header.classList.contains("scroll-down")
    ) {
      // Scroll Down
      header.classList.remove("scroll-up");
      header.classList.add("scroll-down");
    } else if (
      currentScroll < lastScroll &&
      header.classList.contains("scroll-down")
    ) {
      // Scroll Up
      header.classList.remove("scroll-down");
      header.classList.add("scroll-up");
    }
    lastScroll = currentScroll;
  });

  // Animação de números
  const observerOptions = {
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statsNumbers = entry.target.querySelectorAll(".stat-number");
        statsNumbers.forEach((number) => {
          const target = parseInt(number.textContent);
          let count = 0;
          const duration = 2000; // 2 segundos
          const increment = target / (duration / 16); // 60fps

          const updateCount = () => {
            count += increment;
            if (count < target) {
              number.textContent = Math.ceil(count) + "+";
              requestAnimationFrame(updateCount);
            } else {
              number.textContent = target + "+";
            }
          };

          updateCount();
        });
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const statsSection = document.querySelector(".sobre-stats");
  if (statsSection) {
    observer.observe(statsSection);
  }

  // Formulário de contato
  const contactForm = document.getElementById("contato-form");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Aqui você pode adicionar a lógica para enviar o formulário
    const formData = new FormData(contactForm);

    // Simulação de envio
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    submitButton.disabled = true;
    submitButton.textContent = "Enviando...";

    setTimeout(() => {
      alert("Mensagem enviada com sucesso!");
      contactForm.reset();
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }, 2000);
  });

  // Smooth scroll para links internos
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Animação de entrada dos elementos
  const fadeElements = document.querySelectorAll(
    ".servico-card, .portfolio-item"
  );

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  fadeElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    fadeObserver.observe(element);
  });

  // Theme Toggle Functionality
  const themeToggle = document.querySelector(".theme-toggle");
  const themeIcon = themeToggle.querySelector("i");

  function setTheme(isDark) {
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
    themeIcon.className = isDark ? "fas fa-sun" : "fas fa-moon";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    setTheme(savedTheme === "dark");
  }

  // Toggle theme
  themeToggle.addEventListener("click", () => {
    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark";
    setTheme(!isDark);
  });

  // Mobile Menu Toggle
  const menuToggleMobile = document.querySelector(".menu-toggle");
  const navLinksMobile = document.querySelector(".nav-links");

  menuToggleMobile?.addEventListener("click", () => {
    navLinksMobile.style.display =
      navLinksMobile.style.display === "flex" ? "none" : "flex";
  });

  // Close mobile menu when clicking a link
  const linksMobile = document.querySelectorAll(".nav-links a");
  linksMobile.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        navLinksMobile.style.display = "none";
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      window.innerWidth <= 768 &&
      !navLinks.contains(e.target) &&
      !menuToggle.contains(e.target)
    ) {
      navLinks.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });

  // Handle window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      navLinks.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
});
