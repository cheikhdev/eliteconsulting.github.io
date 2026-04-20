/* ============================================================
   ELARA ACADEMY — JavaScript
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
  leadership: {
    cat: 'Management',
    title: 'Leadership & Management d\'Équipe',
    objectifs: ['Développer son style de leadership authentique', 'Maîtriser les outils de pilotage de la performance', 'Gérer les situations de conflits et de crise', 'Construire une vision inspirante et fédératrice'],
    public: 'Managers en poste, chefs de projet, directeurs souhaitant renforcer leur leadership.',
    prerequis: 'Avoir au moins 2 ans d\'expérience en management d\'équipe.',
    programme: ['Jour 1 : Styles de leadership et auto-diagnostic', 'Jour 2 : Communication managériale et feedback', 'Jour 3 : Gestion des conflits et médiation', 'Jour 4 : Pilotage de la performance et OKR', 'Jour 5 : Vision, culture d\'équipe et mise en pratique'],
    resultats: ['Certification Leadership ELARA délivrée', 'Plan de développement personnel individualisé', 'Accès à la communauté alumni managers'],
    duree: '5 jours (35h)',
    modalite: 'Hybride',
    niveau: 'Avancé',
    prix: 'À partir de 2 890 € HT'
  },
  dataanalytics: {
    cat: 'Informatique',
    title: 'Data Analytics & Power BI',
    objectifs: ['Maîtriser l\'interface Power BI Desktop et Service', 'Créer des modèles de données relationnels', 'Développer des visualisations interactives percutantes', 'Automatiser les rapports et tableaux de bord'],
    public: 'Contrôleurs de gestion, analystes, chefs de projet, directeurs data.',
    prerequis: 'Maîtrise d\'Excel niveau intermédiaire. Aucune connaissance en programmation requise.',
    programme: ['Jour 1 : Introduction à la BI, import et transformation des données', 'Jour 2 : Modélisation, relations et DAX fondamentaux', 'Jour 3 : Visualisations avancées, dashboards et publication'],
    resultats: ['Création d\'un dashboard complet prêt à l\'emploi', 'Certification Microsoft Power BI préparée', 'Templates réutilisables remis'],
    duree: '3 jours (21h)',
    modalite: 'En ligne',
    niveau: 'Intermédiaire',
    prix: 'À partir de 1 490 € HT'
  },
  marketing: {
    cat: 'Marketing',
    title: 'Marketing Digital & Réseaux Sociaux',
    objectifs: ['Construire une stratégie digitale 360°', 'Maîtriser les leviers SEO, SEA et Social Media', 'Créer du contenu engageant et viral', 'Mesurer et optimiser le ROI de ses actions'],
    public: 'Responsables marketing, chargés de communication, entrepreneurs, créateurs de contenu.',
    prerequis: 'Aucun prérequis technique. Connaissance basique des réseaux sociaux recommandée.',
    programme: ['Jour 1 : Stratégie digitale et positionnement', 'Jour 2 : SEO, content marketing et copywriting', 'Jour 3 : Réseaux sociaux et publicité payante', 'Jour 4 : Analytics, mesure et optimisation'],
    resultats: ['Plan marketing digital complet élaboré', 'Maîtrise des outils analytics', 'Certification Meta Blueprint préparée'],
    duree: '4 jours (28h)',
    modalite: 'Présentiel',
    niveau: 'Débutant',
    prix: 'À partir de 1 890 € HT'
  },
  communication: {
    cat: 'Soft Skills',
    title: 'Communication & Prise de Parole',
    objectifs: ['Prendre la parole en public avec confiance et impact', 'Structurer et délivrer des messages percutants', 'Gérer le stress et les émotions lors des interventions', 'Adapter sa communication à chaque contexte'],
    public: 'Tout professionnel amené à prendre la parole en réunion, conférence ou présentation client.',
    prerequis: 'Aucun prérequis. Ouverture d\'esprit et envie de progresser requises.',
    programme: ['Jour 1 : Fondamentaux de la communication, voix et posture', 'Jour 2 : Structure d\'argumentation, storytelling et gestion du trac'],
    resultats: ['Vidéo de progression avant/après remise', 'Grille d\'auto-évaluation personnalisée', 'Accès aux ressources en ligne 6 mois'],
    duree: '2 jours (14h)',
    modalite: 'Présentiel',
    niveau: 'Intermédiaire',
    prix: 'À partir de 890 € HT'
  },
  stress: {
    cat: 'Développement personnel',
    title: 'Gestion du Stress & Bien-être au Travail',
    objectifs: ['Identifier ses sources de stress et ses mécanismes de réponse', 'Acquérir des outils concrets de gestion émotionnelle', 'Prévenir l\'épuisement professionnel', 'Cultiver un équilibre durable pro/perso'],
    public: 'Tous professionnels, en particulier managers, soignants et personnes en situation de forte pression.',
    prerequis: 'Aucun prérequis.',
    programme: ['Jour 1 : Comprendre le stress, mindfulness et techniques de régulation', 'Jour 2 : Prévention du burn-out, énergie et plan d\'action personnel'],
    resultats: ['Boîte à outils personnalisée anti-stress', 'Plan de bien-être individuel', 'Accès à l\'application partenaire de méditation'],
    duree: '2 jours (14h)',
    modalite: 'Hybride',
    niveau: 'Tous niveaux',
    prix: 'À partir de 790 € HT'
  },
  excel: {
    cat: 'Bureautique',
    title: 'Excel Expert & Automatisation VBA',
    objectifs: ['Maîtriser les fonctions avancées et imbriquées d\'Excel', 'Créer des tableaux croisés dynamiques puissants', 'Automatiser des tâches répétitives avec les macros VBA', 'Concevoir des outils de gestion sur mesure'],
    public: 'Utilisateurs Excel intermédiaires souhaitant atteindre le niveau expert.',
    prerequis: 'Maîtrise des bases d\'Excel (formules simples, mise en forme).',
    programme: ['Jour 1 : Fonctions avancées, TCD et graphiques dynamiques', 'Jour 2 : Introduction à VBA, enregistrement et modification de macros', 'Jour 3 : Développement d\'outils automatisés et projet final'],
    resultats: ['Certification MOS Excel Expert préparée', 'Fichiers projet récupérables', 'Support de cours complet'],
    duree: '3 jours (21h)',
    modalite: 'En ligne',
    niveau: 'Intermédiaire',
    prix: 'À partir de 1 290 € HT'
  },
  ia: {
    cat: 'Informatique',
    title: 'Intelligence Artificielle en Entreprise',
    objectifs: ['Comprendre les fondements et enjeux de l\'IA pour les décideurs', 'Identifier et qualifier les cas d\'usage IA dans son organisation', 'Piloter un projet d\'intégration IA avec des partenaires technologiques', 'Gérer les aspects éthiques, réglementaires et RH de l\'IA'],
    public: 'Dirigeants, DSI, directeurs métier, chefs de projet souhaitant piloter la transformation IA.',
    prerequis: 'Aucune compétence technique en programmation requise.',
    programme: ['Jour 1 : IA démystifiée — concepts clés et panorama du marché', 'Jour 2 : Identifier les opportunités IA dans son secteur', 'Jour 3 : Piloter un projet IA — méthodes, partenaires et budget', 'Jour 4 : Éthique, conformité RGPD et transformation des équipes'],
    resultats: ['Feuille de route IA personnalisée', 'Réseau d\'experts IA ELARA accessible', 'Veille sectorielle IA pendant 12 mois'],
    duree: '4 jours (28h)',
    modalite: 'Hybride',
    niveau: 'Avancé',
    prix: 'À partir de 2 490 € HT'
  },
  agile: {
    cat: 'Management',
    title: 'Gestion de Projet Agile — Scrum & Kanban',
    objectifs: ['Maîtriser les frameworks Scrum et Kanban', 'Prendre le rôle de Scrum Master ou Product Owner', 'Gérer des équipes en mode agile avec efficacité', 'Préparer et réussir les certifications PSM I & PSPO I'],
    public: 'Chefs de projet, product managers, développeurs, managers souhaitant passer en mode agile.',
    prerequis: 'Expérience en gestion de projet traditionnelle recommandée.',
    programme: ['Jour 1 : Manifeste Agile, valeurs et principes fondateurs', 'Jour 2 : Framework Scrum — rôles, événements et artefacts', 'Jour 3 : Kanban, métriques agile et amélioration continue', 'Jour 4 : Simulations, études de cas et préparation certification', 'Jour 5 : Examen blanc, débriefing et plan d\'action'],
    resultats: ['Passage des examens PSM I et PSPO I inclus', 'Accès à la plateforme Scrum.org', 'Certificat ELARA Agile Practitioner'],
    duree: '5 jours (35h)',
    modalite: 'Présentiel',
    niveau: 'Avancé',
    prix: 'À partir de 2 990 € HT'
  },
  negociation: {
    cat: 'Soft Skills',
    title: 'Négociation & Influence Professionnelle',
    objectifs: ['Maîtriser les techniques de négociation raisonnée (Harvard)', 'Développer son pouvoir de persuasion et d\'influence', 'Gérer les négociations difficiles et les blocages', 'Construire des accords durables gagnant-gagnant'],
    public: 'Commerciaux, acheteurs, managers, juristes, tout professionnel en situation de négociation.',
    prerequis: 'Aucun prérequis.',
    programme: ['Jour 1 : Fondamentaux de la négociation, BATNA et préparation', 'Jour 2 : Techniques d\'influence, psychologie de la persuasion', 'Jour 3 : Mises en situation filmées, débriefing et plan de progrès'],
    resultats: ['Guide pratique de négociation personnalisé', 'Vidéos de simulation analysées', 'Accès au simulateur de négociation en ligne'],
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

console.log('%cELARA Academy — Site chargé avec succès ✓', 'color:#C9A84C;font-family:Georgia;font-size:14px;font-style:italic;');
