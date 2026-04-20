/* ============================================================
   Elite Consulting Group ACADEMY — JavaScript
   ============================================================ */

/* ===== LOADER ===== */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('loaded');
    document.body.style.overflow = 'visible';
    // Trigger hero reveals
    document.querySelectorAll('#hero .reveal-up, #hero .reveal-right').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 120);
    });
  }, 1500);
});

/* ===== CUSTOM CURSOR ===== */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.14;
  followerY += (mouseY - followerY) * 0.14;
  follower.style.left = followerX + 'px';
  follower.style.top  = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

/* ===== NAVBAR SCROLL ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ===== MOBILE MENU ===== */
const toggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

toggle.addEventListener('click', () => {
  toggle.classList.toggle('active');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    toggle.classList.remove('active');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ===== SCROLL REVEAL ===== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // If this element has a counter, start it
      const counter = entry.target.querySelector('.counter');
      if (counter) animateCounter(counter);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal-up, .reveal-right').forEach(el => {
  // Skip hero elements (handled separately)
  if (!el.closest('#hero')) revealObserver.observe(el);
});

/* ===== COUNTER ANIMATION ===== */
function animateCounter(el) {
  if (el.dataset.animated) return;
  el.dataset.animated = '1';
  const target = parseInt(el.dataset.target);
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out expo
    const ease = 1 - Math.pow(2, -10 * progress);
    el.textContent = Math.round(ease * target).toLocaleString('fr-FR');
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target.toLocaleString('fr-FR');
  }
  requestAnimationFrame(update);
}

// Hero counters (triggered after loader)
const heroCounterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const num = entry.target;
      animateCounter(num);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-target]').forEach(el => {
  heroCounterObserver.observe(el);
});

// KPI counters
const kpiObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.counter[data-target]').forEach(animateCounter);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.kpi-grid').forEach(el => kpiObserver.observe(el));

/* ===== FORMATION FILTERS ===== */
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.formation-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    cards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'none';
        card.offsetHeight; // reflow
        card.style.animation = 'cardReveal 0.4s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// Add card reveal animation
const styleEl = document.createElement('style');
styleEl.textContent = `@keyframes cardReveal { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }`;
document.head.appendChild(styleEl);

/* ===== FORMATION MODAL DATA ===== */

const formationsData = {
  comptabilite_analytique: {
    cat: 'Comptabilité',
    title: 'Maîtrise comptable analytique',
    objectifs: [
      'Comprendre les bases de la comptabilité analytique',
      'Analyser les coûts et les centres de responsabilité',
      'Construire des tableaux de suivi pertinents',
      'Améliorer la prise de décision avec des indicateurs fiables'
    ],
    public: 'Comptables, assistants de gestion, contrôleurs de gestion et responsables administratifs.',
    prerequis: 'Connaissances de base en comptabilité générale.',
    programme: [
      'Jour 1 : Fondamentaux de la comptabilité analytique',
      'Jour 2 : Méthodes de calcul des coûts et des marges',
      'Jour 3 : Cas pratiques et construction d’outils de pilotage',
      'Jour 4 : Lecture des résultats et aide à la décision',
      'Jour 5 : Atelier de mise en application sur vos cas réels'
    ],
    resultats: [
      'Savoir exploiter des données comptables pour piloter l’activité',
      'Remise d’un support de synthèse pratique',
      'Attestation de participation délivrée'
    ],
    duree: '5 jours (35h)',
    modalite: 'Hybride',
    niveau: 'Avancé',
    prix: 'À partir de 1 990 € HT'
  },
  bureautique: {
    cat: 'Bureautique',
    title: 'Word, PowerPoint et Excel',
    objectifs: [
      'Maîtriser les fonctions essentielles de Word, PowerPoint et Excel',
      'Gagner en rapidité et en efficacité au quotidien',
      'Créer des documents professionnels et des présentations claires',
      'Utiliser Excel pour des tableaux et calculs simples'
    ],
    public: 'Toute personne souhaitant renforcer ses bases bureautiques.',
    prerequis: 'Aucun prérequis.',
    programme: [
      'Jour 1 : Word — mise en forme, styles et modèles',
      'Jour 2 : PowerPoint — conception de présentations efficaces',
      'Jour 3 : Excel — formules, tableaux et graphiques'
    ],
    resultats: [
      'Meilleure maîtrise des outils bureautiques',
      'Modèles réutilisables fournis',
      'Attestation de fin de formation'
    ],
    duree: '3 jours (21h)',
    modalite: 'En ligne',
    niveau: 'Intermédiaire',
    prix: 'À partir de 890 € HT'
  },
  suivi_evaluation: {
    cat: 'Suivi-évaluation',
    title: 'KoboToolbox & MS Project',
    objectifs: [
      'Collecter et structurer les données de suivi-évaluation',
      'Créer des formulaires efficaces avec KoboToolbox',
      'Planifier et suivre les projets avec MS Project',
      'Produire des rapports de suivi clairs et exploitables'
    ],
    public: 'Chefs de projet, chargés de suivi-évaluation, ONG, consultants et coordinateurs.',
    prerequis: 'Maîtrise de base de l’outil informatique.',
    programme: [
      'Jour 1 : Principes du suivi-évaluation',
      'Jour 2 : Prise en main de KoboToolbox',
      'Jour 3 : Planification et pilotage avec MS Project',
      'Jour 4 : Tableaux de bord et reporting'
    ],
    resultats: [
      'Formulaires de collecte prêts à l’emploi',
      'Plan de projet structuré',
      'Support de cours et exercices pratiques'
    ],
    duree: '4 jours (28h)',
    modalite: 'Présentiel',
    niveau: 'Débutant',
    prix: 'À partir de 1 290 € HT'
  },
  google_workspace: {
    cat: 'Google Workspace',
    title: 'Google Workspace',
    objectifs: [
      'Maîtriser Gmail, Drive, Docs, Sheets et Meet',
      'Collaborer efficacement en temps réel',
      'Organiser et sécuriser les fichiers de l’entreprise',
      'Automatiser des tâches simples dans l’écosystème Google'
    ],
    public: 'Collaborateurs, assistants, équipes administratives et managers.',
    prerequis: 'Aucun prérequis.',
    programme: [
      'Jour 1 : Découverte des outils Google Workspace',
      'Jour 2 : Collaboration et partage de documents',
      'Jour 3 : Organisation, sécurité et bonnes pratiques',
      'Jour 4 : Cas pratiques en équipe'
    ],
    resultats: [
      'Meilleure collaboration interne',
      'Fichiers et processus mieux organisés',
      'Attestation de formation'
    ],
    duree: '2 jours (14h)',
    modalite: 'Hybride',
    niveau: 'Intermédiaire',
    prix: 'À partir de 690 € HT'
  },
  ia_outils: {
    cat: 'Formation sur l’IA',
    title: 'Maîtrise des logiciels IA',
    objectifs: [
      'Découvrir les principaux outils d’intelligence artificielle',
      'Automatiser des tâches répétitives',
      'Rédiger des prompts efficaces',
      'Intégrer l’IA dans les usages professionnels'
    ],
    public: 'Professionnels, entrepreneurs, assistants et équipes souhaitant gagner en productivité.',
    prerequis: 'Aucun prérequis technique.',
    programme: [
      'Jour 1 : Introduction aux outils IA',
      'Jour 2 : Rédaction de prompts et cas d’usage',
      'Jour 3 : Automatisation de tâches et gain de temps'
    ],
    resultats: [
      'Liste d’outils IA utiles au quotidien',
      'Exercices guidés et cas concrets',
      'Attestation de participation'
    ],
    duree: '2 jours (14h)',
    modalite: 'Hybride',
    niveau: 'Tous niveaux',
    prix: 'À partir de 790 € HT'
  },
  excel_automatisation: {
    cat: 'Bureautique',
    title: 'Excel Expert & Automatisation VBA',
    objectifs: [
      'Maîtriser les fonctions avancées et imbriquées d’Excel',
      'Créer des tableaux croisés dynamiques puissants',
      'Automatiser des tâches répétitives avec les macros VBA',
      'Concevoir des outils de gestion sur mesure'
    ],
    public: 'Utilisateurs Excel intermédiaires souhaitant atteindre le niveau expert.',
    prerequis: 'Maîtrise des bases d’Excel (formules simples, mise en forme).',
    programme: [
      'Jour 1 : Fonctions avancées, TCD et graphiques dynamiques',
      'Jour 2 : Introduction à VBA, enregistrement et modification de macros',
      'Jour 3 : Développement d’outils automatisés et projet final'
    ],
    resultats: [
      'Certification MOS Excel Expert préparée',
      'Fichiers projet récupérables',
      'Support de cours complet'
    ],
    duree: '3 jours (21h)',
    modalite: 'En ligne',
    niveau: 'Intermédiaire',
    prix: 'À partir de 1 290 € HT'
  },
  ia_entreprise: {
    cat: 'Intelligence artificielle',
    title: 'Intelligence Artificielle en Entreprise',
    objectifs: [
      'Comprendre les fondements et les enjeux de l’IA pour les décideurs',
      'Identifier les cas d’usage adaptés à son organisation',
      'Piloter un projet d’intégration IA avec méthode',
      'Gérer les aspects éthiques, réglementaires et RH'
    ],
    public: 'Dirigeants, DSI, directeurs métier et chefs de projet souhaitant piloter la transformation IA.',
    prerequis: 'Aucune compétence technique en programmation requise.',
    programme: [
      'Jour 1 : IA démystifiée — concepts clés et panorama du marché',
      'Jour 2 : Identifier les opportunités IA dans son secteur',
      'Jour 3 : Piloter un projet IA — méthodes, partenaires et budget',
      'Jour 4 : Éthique, conformité RGPD et transformation des équipes'
    ],
    resultats: [
      'Feuille de route IA personnalisée',
      'Réseau d’experts IA à disposition',
      'Veille sectorielle pendant 12 mois'
    ],
    duree: '4 jours (28h)',
    modalite: 'Hybride',
    niveau: 'Avancé',
    prix: 'À partir de 2 490 € HT'
  },
  agile: {
    cat: 'Management RH',
    title: 'Gestion de Projet Agile — Scrum & Kanban',
    objectifs: [
      'Maîtriser les frameworks Scrum et Kanban',
      'Prendre le rôle de Scrum Master ou Product Owner',
      'Gérer des équipes en mode agile avec efficacité',
      'Préparer les certifications PSM I & PSPO I'
    ],
    public: 'Chefs de projet, product managers, développeurs et managers souhaitant passer en mode agile.',
    prerequis: 'Expérience en gestion de projet traditionnelle recommandée.',
    programme: [
      'Jour 1 : Manifeste Agile, valeurs et principes fondateurs',
      'Jour 2 : Framework Scrum — rôles, événements et artefacts',
      'Jour 3 : Kanban, métriques agiles et amélioration continue',
      'Jour 4 : Simulations, études de cas et préparation certification',
      'Jour 5 : Examen blanc, débriefing et plan d’action'
    ],
    resultats: [
      'Passage des examens PSM I et PSPO I inclus',
      'Accès à la plateforme Scrum.org',
      'Certificat ELite Consulting Group Agile Practitioner'
    ],
    duree: '5 jours (35h)',
    modalite: 'Présentiel',
    niveau: 'Avancé',
    prix: 'À partir de 2 990 € HT'
  },
  negociation: {
    cat: 'Management RH',
    title: 'Négociation & Influence Professionnelle',
    objectifs: [
      'Maîtriser les techniques de négociation raisonnée',
      'Développer son pouvoir de persuasion et d’influence',
      'Gérer les négociations difficiles et les blocages',
      'Construire des accords durables gagnant-gagnant'
    ],
    public: 'Commerciaux, acheteurs, managers, juristes et tout professionnel en situation de négociation.',
    prerequis: 'Aucun prérequis.',
    programme: [
      'Jour 1 : Fondamentaux de la négociation, BATNA et préparation',
      'Jour 2 : Techniques d’influence et psychologie de la persuasion',
      'Jour 3 : Mises en situation, débriefing et plan de progrès'
    ],
    resultats: [
      'Guide pratique de négociation personnalisé',
      'Vidéos de simulation analysées',
      'Accès à un simulateur de négociation en ligne'
    ],
    duree: '3 jours (21h)',
    modalite: 'Hybride',
    niveau: 'Tous niveaux',
    prix: 'À partir de 1 390 € HT'
  }
};


/* ===== OPEN MODAL ===== */
function openFormationModal(id) {
  const data = formationsData[id];
  if (!data) return;

  const html = `
    <div class="modal-cat">${data.cat} — ${data.modalite} — ${data.niveau}</div>
    <h2 class="modal-title">${data.title}</h2>
    <div style="display:flex;gap:1rem;flex-wrap:wrap;margin-bottom:1.5rem;">
      <div class="modal-tag">⏱ ${data.duree}</div>
      <div class="modal-tag">📍 ${data.modalite}</div>
      <div class="modal-tag">📊 ${data.niveau}</div>
    </div>

    <div class="modal-section">
      <h4>Objectifs pédagogiques</h4>
      <ul>${data.objectifs.map(o => `<li>${o}</li>`).join('')}</ul>
    </div>

    <div class="modal-section">
      <h4>Public cible</h4>
      <p>${data.public}</p>
    </div>

    <div class="modal-section">
      <h4>Prérequis</h4>
      <p>${data.prerequis}</p>
    </div>

    <div class="modal-section">
      <h4>Programme</h4>
      <ul>${data.programme.map(p => `<li>${p}</li>`).join('')}</ul>
    </div>

    <div class="modal-section">
      <h4>Résultats attendus</h4>
      <ul>${data.resultats.map(r => `<li>${r}</li>`).join('')}</ul>
    </div>

    <div class="modal-price">
      <div>
        <div class="modal-price-label">Tarif indicatif</div>
        <div class="modal-price-value">${data.prix}</div>
      </div>
      <span style="font-size:0.75rem;color:var(--text-light);max-width:200px;">Financement CPF, OPCO et intra-entreprise disponibles</span>
    </div>

    <div class="modal-cta">
      <a href="#inscription" class="btn btn-primary" onclick="closeFormationModal();setTimeout(()=>document.getElementById('formation').value='${id}',300)">
        S'inscrire à cette formation
      </a>
      <a href="#inscription" class="btn btn-ghost" onclick="closeFormationModal()">Demander un devis</a>
    </div>
  `;

  document.getElementById('modalContent').innerHTML = html;
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeFormationModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeFormationModal();
});

/* ===== FAQ ACCORDION ===== */
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = answer.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-answer.open').forEach(a => {
    a.classList.remove('open');
    a.previousElementSibling.classList.remove('active');
  });

  // Open clicked if it was closed
  if (!isOpen) {
    answer.classList.add('open');
    btn.classList.add('active');
  }
}

/* ===== FORM VALIDATION ===== */
const form = document.getElementById('inscriptionForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (validateForm()) {
    submitForm();
  }
});

function validateForm() {
  let valid = true;
  clearErrors();

  // Nom
  const nom = document.getElementById('nom').value.trim();
  if (!nom || nom.length < 2) {
    showError('nom', 'Veuillez entrer votre nom complet.');
    valid = false;
  }

  // Email
  const email = document.getElementById('email').value.trim();
  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailReg.test(email)) {
    showError('email', 'Veuillez entrer une adresse email valide.');
    valid = false;
  }

  // Téléphone
  const tel = document.getElementById('telephone').value.trim();
  const telReg = /^[\d\s\+\-\(\)]{7,}$/;
  if (!tel || !telReg.test(tel)) {
    showError('telephone', 'Veuillez entrer un numéro de téléphone valide.');
    valid = false;
  }

  // Formation
  const formation = document.getElementById('formation').value;
  if (!formation) {
    showError('formation', 'Veuillez sélectionner une formation.');
    valid = false;
  }

  // Mode
  const mode = document.querySelector('input[name="mode"]:checked');
  if (!mode) {
    showError('mode', 'Veuillez sélectionner un mode de formation.');
    valid = false;
  }

  return valid;
}

function showError(field, message) {
  const input = document.getElementById(field);
  const errorEl = document.getElementById(field + 'Error');
  if (input) input.classList.add('error');
  if (errorEl) errorEl.textContent = message;
}

function clearErrors() {
  document.querySelectorAll('.form-error').forEach(el => el.textContent = '');
  document.querySelectorAll('.form-group input, .form-group select').forEach(el => el.classList.remove('error'));
}

function submitForm() {
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Envoi en cours...';
  btn.disabled = true;

  // Simulate API call
  setTimeout(() => {
    form.classList.add('hidden');
    form.style.display = 'none';
    const success = document.getElementById('formSuccess');
    success.classList.add('visible');
    success.style.display = 'flex';

    // Scroll to success
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 1200);
}

// Real-time field validation
document.getElementById('nom').addEventListener('blur', function() {
  if (this.value.trim().length >= 2) { this.classList.remove('error'); document.getElementById('nomError').textContent = ''; }
});
document.getElementById('email').addEventListener('blur', function() {
  const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (reg.test(this.value.trim())) { this.classList.remove('error'); document.getElementById('emailError').textContent = ''; }
});
document.getElementById('telephone').addEventListener('blur', function() {
  const reg = /^[\d\s\+\-\(\)]{7,}$/;
  if (reg.test(this.value.trim())) { this.classList.remove('error'); document.getElementById('telephoneError').textContent = ''; }
});

/* ===== SMOOTH ANCHOR NAVIGATION ===== */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ===== ACTIVE NAV HIGHLIGHT ===== */
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + id) {
          if (!link.classList.contains('nav-cta')) {
            link.style.color = 'var(--cream)';
          }
        }
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => navObserver.observe(s));

/* ===== PARALLAX SUBTLE ===== */
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const blob1 = document.querySelector('.hero-blob-1');
  const blob2 = document.querySelector('.hero-blob-2');
  if (blob1) blob1.style.transform = `translateY(${scrollY * 0.15}px)`;
  if (blob2) blob2.style.transform = `translateY(${scrollY * 0.08}px)`;
});

/* ===== STAGGER DELAY FOR CARDS ===== */
document.querySelectorAll('.formations-grid .formation-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.06}s`;
});
document.querySelectorAll('.team-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.08}s`;
});
document.querySelectorAll('.testimonial-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.07}s`;
});

/* ===== HERO SECTION BG FIX ===== */
// Apply dark bg to hero row
const heroSection = document.getElementById('hero');
if (heroSection) {
  const heroRow = document.createElement('div');
  heroRow.style.cssText = 'position:absolute;inset:0;background:var(--navy);z-index:-1;';
  heroSection.style.position = 'relative';
}

console.log('%cElite Consulting Group — Site chargé avec succès ✓', 'color:#0B4EA1;font-family:Georgia;font-size:14px;font-style:italic;');
