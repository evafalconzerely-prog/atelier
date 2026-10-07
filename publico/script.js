/**
 * Módulo Público Objetivo - EVA(ATELIER)
 * Manejo de animaciones continuas al hacer scroll, filtros interactivos,
 * asistente de quiz, acordeón de necesidades y modales informativos.
 */
function initModuloPublico() {
    const container = document.querySelector('.mod-publico');
    if (!container) return;

    // 1. ANIMACIONES CONTINUAS DE ENTRADA Y SALIDA (REVEAL)
    const revealElements = container.querySelectorAll('.reveal');

    const observerOptions = {
        root: null,
        threshold: 0.12,
        rootMargin: '0px 0px -30px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // 2. NAVEGACIÓN SUAVE PARA ENLACES INTERNOS (#)
    const anchorLinks = container.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = container.querySelector(targetId) || document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 3. FILTROS DE AUDIENCIA INTERACTIVOS
    const filterTabs = container.querySelectorAll('.filter-tab');
    const segmentCards = container.querySelectorAll('[data-category]');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filterValue = tab.getAttribute('data-filter');

            segmentCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.classList.remove('hidden-card');
                } else {
                    card.classList.add('hidden-card');
                }
            });
        });
    });

    // 4. QUIZ DE AFINIDAD DE PERFIL INTERACTIVO
    const quizOptions = container.querySelectorAll('.quiz-option');
    const quizResult = container.querySelector('#quiz-result');
    const resultTitle = container.querySelector('#result-title');
    const resultDesc = container.querySelector('#result-desc');

    const quizData = {
        escolar: {
            title: 'Colecciones Escolares & Danza Regional',
            desc: 'Para grupos y colegios de Mazamari y Satipo. Ofrecemos paquetes con ajustes cómodos, telas resistentes y facilidades de confección y alquiler por volumen.'
        },
        fotografia: {
            title: 'Línea de Arte & Creación Digital',
            desc: 'Trajes de fantasía con acabados metálicos y alas articuladas. Diseñados específicamente para resaltar ante la cámara y potenciar proyectos creativos visuales.'
        },
        turismo: {
            title: 'Experiencia Turística & Souvenirs Textil',
            desc: 'Prendas con motivos naturales de la Selva Central ideales para llevar recuerdos fotográficos únicos en locaciones turísticas de Satipo y Junín.'
        }
    };

    quizOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            quizOptions.forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');

            const role = opt.getAttribute('data-role');
            const data = quizData[role];

            if (data && quizResult && resultTitle && resultDesc) {
                resultTitle.textContent = data.title;
                resultDesc.textContent = data.desc;
                quizResult.style.display = 'block';
            }
        });
    });

    const btnOpenQuiz = container.querySelector('#btn-open-quiz');
    if (btnOpenQuiz) {
        btnOpenQuiz.addEventListener('click', () => {
            const quizSec = container.querySelector('#quiz-perfil');
            if (quizSec) {
                quizSec.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }

    // 5. ACORDEÓN DE NECESIDADES
    const accordionItems = container.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        if (header) {
            header.addEventListener('click', (e) => {
                e.stopPropagation();
                const isActive = item.classList.contains('active');
                accordionItems.forEach(i => i.classList.remove('active'));
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // 6. MODAL INTERACTIVO DE DETALLES
    const modal = container.querySelector('#modal-publico-details');
    const modalContent = container.querySelector('#modal-content');
    const modalClose = container.querySelector('.modal-close');
    const modalBackdrop = container.querySelector('.modal-backdrop');
    const cardMoreBtns = container.querySelectorAll('.btn-card-more');

    const modalDetailsData = {
        'modal-edad': `
            <div class="icon icon-blue"><i class="fa-solid fa-user-group icon-xl"></i></div>
            <h3 class="title-card">Detalles de Atención por Edad</h3>
            <p class="card-text" style="margin-bottom: 12px;">
                Atelier adapta sus trajes a diversas estaturas y contextos. En el caso de menores de 18 años (como eventos escolares o festivales), el proceso de alquiler o confección se realiza mediante un tutor legal.
            </p>
            <ul style="padding-left: 20px; font-size: 13px; color: #555;">
                <li>Pruebas de ajuste presenciales en nuestro taller.</li>
                <li>Mecanismos livianos adaptados a niños y adultos.</li>
            </ul>
        `,
        'modal-ubicacion': `
            <div class="icon icon-green"><i class="fa-solid fa-location-dot icon-xl"></i></div>
            <h3 class="title-card">Atención en Sede Mazamari</h3>
            <p class="card-text" style="margin-bottom: 12px;">
                Ubicados en Av. Julián Ñaupari s/n, Mazamari, Satipo, Junín. Un punto de fácil acceso tanto para pobladores locales como para viajeros.
            </p>
            <ul style="padding-left: 20px; font-size: 13px; color: #555;">
                <li>Horarios de atención flexibles con reserva previa.</li>
                <li>Asesoría personalizada para sesiones fotográficas turísticas.</li>
            </ul>
        `
    };

    function openModal(key) {
        if (!modal || !modalContent || !modalDetailsData[key]) return;
        modalContent.innerHTML = modalDetailsData[key];
        modal.classList.add('active');
    }

    function closeModal() {
        if (modal) modal.classList.remove('active');
    }

    cardMoreBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetKey = btn.getAttribute('data-target');
            openModal(targetKey);
        });
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

    // 7. TARJETAS DE PERSONALIDAD INTERACTIVAS
    const traitCards = container.querySelectorAll('.card-interactive');
    traitCards.forEach(card => {
        card.addEventListener('click', () => {
            const traitName = card.querySelector('.title-card')?.textContent || '';
            const traitDesc = card.querySelector('.card-text')?.textContent || '';

            if (modalContent) {
                modalContent.innerHTML = `
                    <div class="icon icon-orange"><i class="fa-solid fa-sparkles icon-xl"></i></div>
                    <h3 class="title-card">Cualidad Atelier: ${traitName}</h3>
                    <p class="card-text">${traitDesc}</p>
                    <p class="card-text" style="margin-top: 10px; font-size: 13px; color: #666;">
                        Esta cualidad guía cada proceso de creación y atención al cliente en nuestro taller.
                    </p>
                `;
                if (modal) modal.classList.add('active');
            }
        });
    });
}

// Inicialización segura para carga directa o mediante Front Controller
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initModuloPublico);
} else {
    initModuloPublico();
}