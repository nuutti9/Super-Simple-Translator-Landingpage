const navLinks = document.querySelectorAll('.team-nav a[href^="#"]');

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const id = link.getAttribute("href");
    const target = id ? document.querySelector(id) : null;

    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

const defaultLanguage = "en";
const languageButtons = document.querySelectorAll("[data-lang-choice]");
const localizedElements = document.querySelectorAll("[data-i18n]");
const localizedAttributes = document.querySelectorAll("[data-i18n-attr]");

const translations = {
  en: {
    "meta.title": "NodalApps",
    "meta.description": "NodalApps builds focused mobile products with calm, modern design. Explore Super Simple Translator and the apps we're creating next.",
    "nav.projects": "Projects",
    "nav.about": "About",
    "nav.contact": "Contact",
    "cta.contactTop": "Get in touch",
    "hero.kicker": "Focused mobile products",
    "hero.title": "Calm apps with sharp utility.",
    "hero.copy": "NodalApps builds simple, polished products that feel clear from the first tap. We care about speed, atmosphere, and removing friction from everyday tools.",
    "cta.viewProjects": "View projects",
    "cta.contactHero": "Contact NodalApps",
    "projects.kicker": "Projects",
    "projects.title": "What we're building",
    "projects.copy": "A growing set of focused products, each designed around one clear job and a more thoughtful user experience.",
    "projects.card1Badge": "Live now",
    "projects.card1Copy": "Real-time speech translation designed to feel effortless. Press one button, speak, and keep the conversation moving.",
    "projects.card1Link": "Open project",
    "projects.card2Badge": "In progress",
    "projects.card2Copy": "Calculate school meal macros quickly and easily with a simple tool made specifically for Finnish schools.",
    "projects.card2Link": "Open project",
    "projects.card3Badge": "In progress",
    "projects.card3Title": "More projects coming soon",
    "projects.card3Copy": "We're building more focused products around simple, useful everyday workflows.",
    "about.kicker": "About",
    "about.title": "Small team, product-first mindset.",
    "about.copy": "NodalApps focuses on products that are visually distinct, easy to understand, and useful in real life. We like sharp interfaces, strong visual identity, and experiences that stay out of the way once they're open.",
    "contact.kicker": "Contact",
    "contact.title": "Let's talk products."
  },
  fi: {
    "meta.title": "NodalApps",
    "meta.description": "NodalApps rakentaa tarkkaan rajattuja mobiilituotteita selkeällä ja viimeistellyllä designilla. Tutustu Super Simple Translatoriin ja muihin tuotteisiin, joita rakennamme seuraavaksi.",
    "nav.projects": "Projektit",
    "nav.about": "Tietoa",
    "nav.contact": "Yhteys",
    "cta.contactTop": "Ota yhteyttä",
    "hero.kicker": "Keskittyneitä mobiilituotteita",
    "hero.title": "Rauhallisia appeja terävällä hyödyllä.",
    "hero.copy": "NodalApps rakentaa yksinkertaisia ja viimeisteltyjä tuotteita, jotka tuntuvat selkeiltä heti ensimmäisestä napautuksesta. Meitä kiinnostavat nopeus, tunnelma ja kitkan poistaminen arjen työkaluista.",
    "cta.viewProjects": "Katso projektit",
    "cta.contactHero": "Ota yhteyttä",
    "projects.kicker": "Projektit",
    "projects.title": "Mitä rakennamme",
    "projects.copy": "Kasvava joukko tarkkaan rajattuja tuotteita, joista jokainen on suunniteltu yhden selkeän tehtävän ympärille.",
    "projects.card1Badge": "Live nyt",
    "projects.card1Copy": "Reaaliaikainen puhekäännös, joka on suunniteltu tuntumaan vaivattomalta. Paina yhtä nappia, puhu ja pidä keskustelu liikkeessä.",
    "projects.card1Link": "Avaa projekti",
    "projects.card2Badge": "Työn alla",
    "projects.card2Copy": "Laske kouluruoan makrot nopeasti ja helposti yksinkertaisella työkalulla, joka on tehty erityisesti suomalaisille kouluille.",
    "projects.card2Link": "Avaa projekti",
    "projects.card3Badge": "Työn alla",
    "projects.card3Title": "Lisää projekteja tulossa",
    "projects.card3Copy": "Rakennamme lisää tarkkaan rajattuja tuotteita yksinkertaisten ja hyödyllisten arjen työnkulkujen ympärille.",
    "about.kicker": "Tietoa",
    "about.title": "Pieni tiimi, tuote edellä.",
    "about.copy": "NodalApps keskittyy tuotteisiin, jotka ovat visuaalisesti erottuvia, helppoja ymmärtää ja oikeasti hyödyllisiä arjessa. Tykkäämme terävistä käyttöliittymistä, vahvasta visuaalisesta identiteetistä ja kokemuksista, jotka pysyvät poissa tieltä kun ne on avattu.",
    "contact.kicker": "Yhteys",
    "contact.title": "Puhutaan tuotteista."
  }
};

function getStoredLanguage() {
  const stored = window.localStorage.getItem("nodalappsLanguage");
  return stored === "fi" || stored === "en" ? stored : defaultLanguage;
}

function setActiveLanguageButton(language) {
  languageButtons.forEach((button) => {
    const isActive = button.dataset.langChoice === language;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function applyLanguage(language) {
  const map = translations[language] || translations[defaultLanguage];
  document.documentElement.lang = language;

  localizedElements.forEach((element) => {
    const key = element.dataset.i18n;
    if (map[key]) {
      element.textContent = map[key];
    }
  });

  localizedAttributes.forEach((element) => {
    const key = element.dataset.i18n;
    const attr = element.dataset.i18nAttr;
    if (map[key] && attr) {
      element.setAttribute(attr, map[key]);
    }
  });

  setActiveLanguageButton(language);
  window.localStorage.setItem("nodalappsLanguage", language);
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyLanguage(button.dataset.langChoice || defaultLanguage);
  });
});

applyLanguage(getStoredLanguage());
