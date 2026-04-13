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
    "meta.description": "NodalApps makes simple mobile apps. See Super Simple Translator and the other products we are building.",
    "nav.projects": "Projects",
    "nav.about": "About",
    "nav.contact": "Contact",
    "cta.contactTop": "Get in touch",
    "hero.kicker": "Simple mobile products",
    "hero.title": "Simple apps that are easy to use.",
    "hero.copy": "We build apps that are clear, useful, and easy to use.",
    "cta.viewProjects": "View projects",
    "cta.contactHero": "Contact NodalApps",
    "projects.kicker": "Projects",
    "projects.title": "Our projects",
    "projects.copy": "These are the products we have live now and the ones we are still building.",
    "projects.card1Badge": "Live now",
    "projects.card1Copy": "A simple app for fast speech translation. Press one button, speak, and continue the conversation.",
    "projects.card1Link": "Open project",
    "projects.card2Badge": "Live now",
    "projects.card2Copy": "Calculate school meal macros quickly and easily. Made especially for Finnish schools.",
    "projects.card2Link": "Open project",
    "projects.card3Badge": "In progress",
    "projects.card3Title": "More projects coming",
    "projects.card3Copy": "We are working on more simple products for everyday use.",
    "about.kicker": "About",
    "about.title": "Small team. Simple products.",
    "about.copy": "We make products that are easy to understand and easy to use.",
    "contact.kicker": "Contact",
    "contact.title": "Let's talk."
  },
  fi: {
    "meta.title": "NodalApps",
    "meta.description": "NodalApps tekee yksinkertaisia mobiilisovelluksia. Katso Super Simple Translator ja muut tuotteet, joita rakennamme.",
    "nav.projects": "Projektit",
    "nav.about": "Tietoa",
    "nav.contact": "Yhteys",
    "cta.contactTop": "Ota yhteyttä",
    "hero.kicker": "Yksinkertaisia mobiilisovelluksia",
    "hero.title": "Yksinkertaisia appeja, joita on helppo käyttää.",
    "hero.copy": "Teemme appeja, jotka ovat selkeitä, hyödyllisiä ja helppoja käyttää.",
    "cta.viewProjects": "Katso projektit",
    "cta.contactHero": "Ota yhteyttä",
    "projects.kicker": "Projektit",
    "projects.title": "Projektimme",
    "projects.copy": "Tässä ovat tuotteet, jotka ovat jo livenä, ja ne joita rakennamme parhaillaan.",
    "projects.card1Badge": "Live nyt",
    "projects.card1Copy": "Yksinkertainen sovellus nopeaan puhekäännökseen. Paina yhtä nappia, puhu ja jatka keskustelua.",
    "projects.card1Link": "Avaa projekti",
    "projects.card2Badge": "Live nyt",
    "projects.card2Copy": "Laske kouluruoan makrot nopeasti ja helposti. Tehty erityisesti suomalaisille kouluille.",
    "projects.card2Link": "Avaa projekti",
    "projects.card3Badge": "Työn alla",
    "projects.card3Title": "Lisää projekteja tulossa",
    "projects.card3Copy": "Rakennamme lisää yksinkertaisia tuotteita arjen käyttöön.",
    "about.kicker": "Tietoa",
    "about.title": "Pieni tiimi. Yksinkertaiset tuotteet.",
    "about.copy": "Teemme tuotteita, jotka ovat helppoja ymmärtää ja helppoja käyttää.",
    "contact.kicker": "Yhteys",
    "contact.title": "Ota yhteyttä."
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
