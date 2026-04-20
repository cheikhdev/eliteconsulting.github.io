/* ============================================================
   ELITE CONSULTING GROUP — JavaScript (VERSION CORRIGÉE)
   ============================================================ */

/* ===== LOADER ===== */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('loaded');
      document.body.style.overflow = 'visible';
    }, 1000);
  }
});

/* ===== NAVBAR SCROLL ===== */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }
});

/* ===== MENU MOBILE ===== */
const toggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (toggle && mobileMenu) {
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow =
      mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ===== FILTRE FORMATIONS (CORRIGÉ) ===== */
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.formation-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    cards.forEach(card => {
      const category = card.dataset.category;

      if (filter === 'all' || category === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

/* ===== ANIMATION SCROLL (simple et léger) ===== */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal-up, .reveal-right').forEach(el => {
  observer.observe(el);
});

/* ===== MODAL FORMATION ===== */
function openFormationModal(id) {
  const modal = document.getElementById('modalOverlay');
  const content = document.getElementById('modalContent');

  if (!modal || !content) return;

  content.innerHTML = `<h2>Détails de la formation</h2>
  <p>Informations à personnaliser pour : ${id}</p>`;

  modal.style.display = 'flex';
}

function closeFormationModal() {
  const modal = document.getElementById('modalOverlay');
  if (modal) modal.style.display = 'none';
}

/* ===== SCROLL SMOOTH ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});
