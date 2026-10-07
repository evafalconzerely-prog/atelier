function initModuloEmpresa() {
  const container = document.querySelector('.mod-empresa');
  if (!container) return;

  /* --- 1. MODAL EN FOTO ÚNICA DEL HERO --- */
  const btnHeroPhoto = container.querySelector('#btn-hero-photo');
  if (btnHeroPhoto) {
    btnHeroPhoto.addEventListener('click', () => {
      openModal(
        "Atelier S.A.C. - Mazamari, Junín",
        "Confección de disfraces, diseño y alquiler de vestuario temático con alas articuladas, vestidos de inspiración botánica y eco-diseño."
      );
    });
  }

  /* --- 2. CONTADORES ANIMADOS EN SCROLL --- */
  const counters = container.querySelectorAll('.counter');
  let animated = false;

  function runCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const speed = 40;
      const updateCount = () => {
        const count = +counter.innerText;
        const inc = Math.ceil(target / speed);

        if (count < target) {
          counter.innerText = count + inc;
          setTimeout(updateCount, 30);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  }

  /* --- 3. SHOWCASE DE CATEGORÍAS --- */
  const showcaseBtns = container.querySelectorAll('.showcase-btn');
  const showcaseTitle = container.querySelector('#showcaseTitle');
  const showcaseDesc = container.querySelector('#showcaseDesc');
  const showcaseTag = container.querySelector('#showcaseTag');

  showcaseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      showcaseBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (showcaseTitle && showcaseDesc && showcaseTag) {
        showcaseTitle.innerText = btn.getAttribute('data-title');
        showcaseDesc.innerText = btn.getAttribute('data-desc');
        showcaseTag.innerText = btn.getAttribute('data-tag');
      }
    });
  });

  /* --- 4. SISTEMA DE PESTAÑAS (TABS) --- */
  const tabBtns = container.querySelectorAll('.tab-btn');
  const tabContents = container.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const activeContent = container.querySelector(`#${targetTab}`);
      if (activeContent) activeContent.classList.add('active');
    });
  });

  /* --- 5. VENTANA MODAL Y COPIADO DE DATOS --- */
  const modal = container.querySelector('#modalEmpresa');
  const modalClose = container.querySelector('#modalClose');
  const modalTitle = container.querySelector('#modalTitle');
  const modalBody = container.querySelector('#modalBody');

  function openModal(title, body) {
    if (modal && modalTitle && modalBody) {
      modalTitle.innerText = title;
      modalBody.innerText = body;
      modal.classList.add('active');
    }
  }

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }

  // Modal para tarjetas de valores
  const cardsValores = container.querySelectorAll('#valores .card');
  cardsValores.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('.title-card').innerText;
      const info = card.getAttribute('data-info') || card.querySelector('.card-text').innerText;
      openModal(`Valor: ${title}`, info);
    });
  });

  // Copiar Ficha Técnica
  const btnCopy = container.querySelector('#btn-copy-data');
  if (btnCopy) {
    btnCopy.addEventListener('click', () => {
      const textToCopy = `ATELIER S.A.C. (Atelier)\nUbicación: Mazamari, Satipo, Junín.\nRubro: Confección de disfraces, diseño y alquiler de vestuario.\nProductos: Alas articuladas, vestidos botánicos, eco-diseño y accesorios temáticos.`;

      navigator.clipboard.writeText(textToCopy).then(() => {
        btnCopy.innerHTML = `<i class="fa-solid fa-check"></i> ¡Copiado!`;
        setTimeout(() => {
          btnCopy.innerHTML = `<i class="fa-solid fa-copy"></i> Copiar Datos`;
        }, 2000);
      });
    });
  }

  /* --- 6. OBSERVER SCROLL REVEAL --- */
  const revealElements = container.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        if (!animated && entry.target.querySelector('.counter')) {
          runCounters();
          animated = true;
        }
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => revealObserver.observe(el));
}

// Inicialización
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initModuloEmpresa);
} else {
  initModuloEmpresa();
}