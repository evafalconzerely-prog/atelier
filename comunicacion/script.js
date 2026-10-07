// script.js
/**
 * Script de interacción para la sección de Comunicación e Imagen Corporativa de Atelier S.A.C.
 * Redirección dinámica a WhatsApp Business capturando el nombre, apellido y el mensaje personalizado.
 */
(function () {
  "use strict";

  /* 1. ANIMACIÓN DE SCROLL REVEAL (ENTRADA Y SALIDA) */
  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -30px 0px",
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  }, observerOptions);

  window.initScrollReveal = function () {
    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el, index) => {
      if (!el.style.transitionDelay) {
        el.style.transitionDelay = `${(index % 3) * 0.06}s`;
      }
      revealObserver.observe(el);
    });
  };

  /* 2. FORMULARIO DE CONTACTO DIRECTO A WHATSAPP CON NOMBRE Y MENSAJE */
  window.initContactForm = function () {
    const form = document.getElementById("contact-form");
    const feedback = document.getElementById("form-feedback");

    // Número oficial de WhatsApp Business
    const phone = "51983054061";

    if (form && !form.dataset.bound) {
      form.dataset.bound = "true";

      form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nombreInput = document.getElementById("input-nombre");
        const mensajeInput = document.getElementById("input-mensaje");

        const nombreVal = nombreInput ? nombreInput.value.trim() : "";
        const mensajeVal = mensajeInput ? mensajeInput.value.trim() : "";

        if (!nombreVal || !mensajeVal) return;

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Redirigiendo a WhatsApp...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;

        if (feedback) {
          feedback.textContent = "";
          feedback.className = "form-message";
        }

        // Construcción del mensaje dinámico codificado para URL
        const textoPersonalizado = `Hola Atelier, mi nombre es *${nombreVal}*.\n\n*Consulta:* ${mensajeVal}`;
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(textoPersonalizado)}`;

        setTimeout(() => {
          // Abre la app/web de WhatsApp con el texto prediseñado
          window.open(whatsappUrl, "_blank");

          submitBtn.disabled = false;
          submitBtn.innerHTML = originalContent;

          if (feedback) {
            feedback.classList.add("success");
            feedback.textContent = `¡Gracias ${nombreVal}! Redirigiendo a WhatsApp...`;
          }

          form.reset();

          setTimeout(() => {
            if (feedback) {
              feedback.textContent = "";
              feedback.className = "form-message";
            }
          }, 4000);
        }, 600);
      });
    }
  };

  /* 3. INICIALIZACIÓN GLOBAL */
  const initAll = () => {
    window.initScrollReveal();
    window.initContactForm();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }
})();