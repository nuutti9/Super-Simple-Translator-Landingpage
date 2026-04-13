const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealElements.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const defaultLanguage = "en";
const page = document.documentElement.dataset.page || "home";
const languageButtons = document.querySelectorAll("[data-lang-choice]");
const localizedElements = document.querySelectorAll("[data-i18n]");
const localizedAttributes = document.querySelectorAll("[data-i18n-attr]");

const translations = {
  home: {
    en: {
      "meta.title": "Super Simple Translator",
      "meta.description": "Super Simple Translator helps you translate speech in seconds. Choose your languages, press one button, and start speaking.",
      "brand.full": "Super Simple Translator",
      "nav.features": "Features",
      "nav.how": "How it works",
      "nav.screens": "Screens",
      "nav.faq": "FAQ",
      "nav.privacy": "Privacy",
      "nav.terms": "Terms",
      "cta.appStore": "App Store",
      "cta.download": "Download on the App Store",
      "cta.learnMore": "Learn more",
      "hero.eyebrow": "Speech translation made beautifully simple",
      "hero.title": "Speak. Translate. Understand.",
      "hero.subtitle": "Translate real conversations in seconds. Choose your languages, press one button, and start speaking with a calm, focused interface that stays out of the way.",
      "hero.statLanguagesTitle": "40+ languages",
      "hero.statLanguagesBody": "Designed for travel, everyday errands, and natural conversations.",
      "hero.statFlowTitle": "One-button flow",
      "hero.statFlowBody": "No complicated setup, no clutter, no steep learning curve.",
      "hero.noteLabel": "Designed for real life",
      "hero.noteBody": "One button. Two languages. Fast, clear speech translation.",
      "value.eyebrow": "Why it feels effortless",
      "value.title": "The translator that stays simple on purpose",
      "value.subtitle": "Super Simple Translator is made for normal situations where you just need to understand someone quickly. No busy menus. No distracting extras. Just a smooth, clear path from speech to translation.",
      "value.card1Title": "Made around one action",
      "value.card1Body": "Press and hold one button to speak. The app is designed around the quickest possible path from your voice to the translated result.",
      "value.card2Title": "Built for real situations",
      "value.card2Body": "Use it while traveling, ordering food, asking for directions, or handling small everyday conversations between two languages.",
      "value.card3Title": "Comfortably premium",
      "value.card3Body": "The interface feels calm, soft, and modern so translating speech feels easy instead of technical or overwhelming.",
      "features.eyebrow": "Features",
      "features.title": "Everything important, nothing distracting",
      "features.subtitle": "A premium translation experience centered on speed, clarity, and confidence.",
      "features.card1Title": "One-button speech translation",
      "features.card1Body": "Press, speak, and get a translation without digging through settings.",
      "features.card2Title": "Clean and simple interface",
      "features.card2Body": "Large touch targets, thoughtful spacing, and a layout that feels instantly familiar.",
      "features.card3Title": "40+ languages supported",
      "features.card3Body": "Translate everyday speech across more than forty languages with ease.",
      "features.card4Title": "Natural voice playback",
      "features.card4Body": "Hear translated speech clearly, so conversations keep moving naturally.",
      "features.card5Title": "Fast conversation flow",
      "features.card5Body": "Designed for quick back-and-forth moments instead of slow, complex workflows.",
      "features.card6Title": "Minimal learning curve",
      "features.card6Body": "Open the app and understand how it works in seconds, even the first time.",
      "steps.eyebrow": "How it works",
      "steps.title": "Three simple steps",
      "steps.subtitle": "The experience is intentionally direct so you can start translating right away.",
      "steps.card1Title": "Choose your languages",
      "steps.card1Body": "Pick the two languages you want to switch between before the conversation begins.",
      "steps.card2Title": "Press and hold the button",
      "steps.card2Body": "Touch one large button to start speaking. No extra setup or confusing controls.",
      "steps.card3Title": "Speak and hear the translation",
      "steps.card3Body": "Your translated speech appears fast and can be played back naturally for the other person.",
      "showcase.eyebrow": "App showcase",
      "showcase.title": "Premium screens with room to breathe",
      "showcase.subtitle": "Every screen is focused on helping people translate quickly without feeling rushed.",
      "showcase.mainPill": "Main screen",
      "showcase.mainTitle": "A single focal point for speaking",
      "showcase.mainBody": "The main translation screen makes the next action obvious, with one centered interaction and a clear result area above and below.",
      "showcase.card1Pill": "Language picker",
      "showcase.card1Title": "Quick language setup",
      "showcase.card1Body": "Choose your pair in moments with a clean list that is easy to browse and simple to confirm.",
      "showcase.card2Pill": "Playback",
      "showcase.card2Title": "Hear it back naturally",
      "showcase.card2Body": "Spoken translations help keep face-to-face communication smooth when time matters.",
      "showcase.card3Pill": "Focused UI",
      "showcase.card3Title": "Distraction-free by design",
      "showcase.card3Body": "Soft cards, generous spacing, and minimal controls create a more relaxed experience.",
      "trust.eyebrow": "Clarity you can trust",
      "trust.title": "Translation should feel effortless",
      "trust.body": "Super Simple Translator supports 40+ languages and is designed to keep the experience fast, simple, and focused. The result is a translator that feels natural to use in daily life.",
      "faq.eyebrow": "FAQ",
      "faq.title": "Common questions",
      "faq.subtitle": "Helpful details for people deciding if Super Simple Translator is right for them.",
      "faq.q1": "How many languages does Super Simple Translator support?",
      "faq.a1": "Super Simple Translator supports 40+ languages for quick and simple speech translation.",
      "faq.q2": "Is the app easy to use?",
      "faq.a2": "Yes. The experience is designed around a simple flow: choose your languages, press one button, and speak.",
      "faq.q3": "Can I use it for travel?",
      "faq.a3": "Yes. It is especially useful for travel, short conversations, asking for directions, and everyday errands.",
      "faq.q4": "Does it support spoken translation?",
      "faq.a4": "Yes. The app is built for speech translation and includes natural voice playback to help conversations continue smoothly.",
      "faq.q5": "Where can I find the Privacy Policy and Terms of Service?",
      "faq.a5": "You can access both from the footer and navigation links on this site.",
      "footer.copy": "Fast, simple speech translation for travel, conversations, and everyday communication.",
      "footer.privacy": "Privacy Policy",
      "footer.terms": "Terms of Service",
      "footer.appStore": "App Store"
    },
    fi: {
      "meta.title": "Super Simple Translator",
      "meta.description": "Super Simple Translator auttaa kääntämään puhetta sekunneissa. Valitse kielet, paina yhtä painiketta ja aloita puhuminen.",
      "brand.full": "Super Simple Translator",
      "nav.features": "Ominaisuudet",
      "nav.how": "Näin se toimii",
      "nav.screens": "Näkymät",
      "nav.faq": "UKK",
      "nav.privacy": "Tietosuoja",
      "nav.terms": "Ehdot",
      "cta.appStore": "App Store",
      "cta.download": "Lataa App Storesta",
      "cta.learnMore": "Lue lisää",
      "hero.eyebrow": "Puheen kääntäminen tehty kauniin yksinkertaiseksi",
      "hero.title": "Puhu. Käännä. Ymmärrä.",
      "hero.subtitle": "Käännä oikeita keskusteluja sekunneissa. Valitse kielet, paina yhtä painiketta ja aloita puhuminen rauhallisella, selkeällä käyttöliittymällä, joka ei tule tielle.",
      "hero.statLanguagesTitle": "Yli 40 kieltä",
      "hero.statLanguagesBody": "Suunniteltu matkustamiseen, arjen asiointiin ja luonnollisiin keskusteluihin.",
      "hero.statFlowTitle": "Yhden painikkeen käyttö",
      "hero.statFlowBody": "Ei monimutkaista asetusta, ei turhaa hälyä, ei jyrkkää oppimiskynnystä.",
      "hero.noteLabel": "Suunniteltu oikeaan elämään",
      "hero.noteBody": "Yksi painike. Kaksi kieltä. Nopea ja selkeä puhekäännös.",
      "value.eyebrow": "Miksi se tuntuu vaivattomalta",
      "value.title": "Kääntäjä, joka on tarkoituksella yksinkertainen",
      "value.subtitle": "Super Simple Translator on tehty tavallisiin tilanteisiin, joissa haluat vain ymmärtää nopeasti. Ei sekavia valikoita. Ei häiritseviä lisäosia. Vain sujuva ja selkeä tie puheesta käännökseen.",
      "value.card1Title": "Rakennettu yhden toiminnon ympärille",
      "value.card1Body": "Paina ja pidä yhtä painiketta puhuaksesi. Sovellus on suunniteltu mahdollisimman nopeaksi reitiksi äänestäsi valmiiseen käännökseen.",
      "value.card2Title": "Tehty oikeisiin tilanteisiin",
      "value.card2Body": "Käytä sitä matkalla, ruokaa tilatessa, suuntaa kysyessä tai lyhyissä arjen keskusteluissa kahden kielen välillä.",
      "value.card3Title": "Rauhallisen premium",
      "value.card3Body": "Käyttöliittymä tuntuu rauhalliselta, pehmeältä ja modernilta, jotta puheen kääntäminen olisi helppoa eikä teknistä tai kuormittavaa.",
      "features.eyebrow": "Ominaisuudet",
      "features.title": "Kaikki tärkeä, ei mitään häiritsevää",
      "features.subtitle": "Premium-käännöskokemus, jonka ytimessä ovat nopeus, selkeys ja varmuus.",
      "features.card1Title": "Yhden painikkeen puhekäännös",
      "features.card1Body": "Paina, puhu ja saa käännös ilman asetusten selaamista.",
      "features.card2Title": "Puhdas ja yksinkertainen käyttöliittymä",
      "features.card2Body": "Suuret kosketuspinnat, harkitut välit ja asettelu, joka tuntuu heti tutulta.",
      "features.card3Title": "Yli 40 tuettua kieltä",
      "features.card3Body": "Käännä arkista puhetta yli neljälläkymmenellä kielellä helposti.",
      "features.card4Title": "Luonnollinen äänentoisto",
      "features.card4Body": "Kuule käännetty puhe selkeästi, jotta keskustelut jatkuvat luontevasti.",
      "features.card5Title": "Nopea keskustelurytmi",
      "features.card5Body": "Suunniteltu nopeisiin edestakaisiin hetkiin hitaiden ja monimutkaisten työnkulkujen sijaan.",
      "features.card6Title": "Matala oppimiskynnys",
      "features.card6Body": "Avaa sovellus ja ymmärrä käyttö sekunneissa, jo ensimmäisellä kerralla.",
      "steps.eyebrow": "Näin se toimii",
      "steps.title": "Kolme yksinkertaista vaihetta",
      "steps.subtitle": "Kokemus on tarkoituksella suoraviivainen, jotta voit aloittaa kääntämisen heti.",
      "steps.card1Title": "Valitse kielet",
      "steps.card1Body": "Valitse kaksi kieltä, joiden välillä haluat vaihtaa ennen keskustelun alkua.",
      "steps.card2Title": "Paina ja pidä painiketta",
      "steps.card2Body": "Koske yhtä suurta painiketta aloittaaksesi puhumisen. Ei lisäasetuksia eikä sekavia hallintoja.",
      "steps.card3Title": "Puhu ja kuule käännös",
      "steps.card3Body": "Käännetty puhe ilmestyy nopeasti ja sen voi toistaa luonnollisesti toiselle henkilölle.",
      "showcase.eyebrow": "Sovelluksen esittely",
      "showcase.title": "Premium-näkymät, joissa on tilaa hengittää",
      "showcase.subtitle": "Jokainen näkymä on tehty auttamaan nopeassa kääntämisessä ilman kiireen tuntua.",
      "showcase.mainPill": "Päänäkymä",
      "showcase.mainTitle": "Yksi selkeä painopiste puhumiseen",
      "showcase.mainBody": "Päänäkymä tekee seuraavan toiminnon ilmeiseksi, yhdellä keskitettyllä vuorovaikutuksella ja selkeällä tulosalueella ylä- ja alapuolella.",
      "showcase.card1Pill": "Kielivalitsin",
      "showcase.card1Title": "Nopea kielten valinta",
      "showcase.card1Body": "Valitse kielipari hetkessä selkeällä listalla, jota on helppo selata ja vahvistaa.",
      "showcase.card2Pill": "Toisto",
      "showcase.card2Title": "Kuule käännös luonnollisesti",
      "showcase.card2Body": "Puhutut käännökset auttavat pitämään kasvokkaisen viestinnän sujuvana silloin kun aika on tärkeä.",
      "showcase.card3Pill": "Keskittynyt käyttöliittymä",
      "showcase.card3Title": "Suunniteltu ilman häiriöitä",
      "showcase.card3Body": "Pehmeät kortit, väljät marginaalit ja minimaaliset kontrollit luovat rennomman kokemuksen.",
      "trust.eyebrow": "Selkeyttä, johon voi luottaa",
      "trust.title": "Kääntämisen pitäisi tuntua vaivattomalta",
      "trust.body": "Super Simple Translator tukee yli 40 kieltä ja on suunniteltu pitämään kokemuksen nopeana, yksinkertaisena ja keskittyneenä. Tuloksena on kääntäjä, joka tuntuu luonnolliselta käyttää arjessa.",
      "faq.eyebrow": "UKK",
      "faq.title": "Yleisiä kysymyksiä",
      "faq.subtitle": "Hyödyllisiä tietoja ihmisille, jotka pohtivat sopiiko Super Simple Translator heille.",
      "faq.q1": "Kuinka monta kieltä Super Simple Translator tukee?",
      "faq.a1": "Super Simple Translator tukee yli 40 kieltä nopeaan ja yksinkertaiseen puhekääntämiseen.",
      "faq.q2": "Onko sovellusta helppo käyttää?",
      "faq.a2": "Kyllä. Kokemus on rakennettu yksinkertaisen mallin ympärille: valitse kielet, paina yhtä painiketta ja puhu.",
      "faq.q3": "Voinko käyttää sitä matkustamiseen?",
      "faq.a3": "Kyllä. Se sopii erityisen hyvin matkustamiseen, lyhyisiin keskusteluihin, suunnan kysymiseen ja arjen asiointiin.",
      "faq.q4": "Tukeeko se puhuttua käännöstä?",
      "faq.a4": "Kyllä. Sovellus on tehty puhekäännöstä varten ja sisältää luonnollisen äänentoiston, jotta keskustelut jatkuvat sujuvasti.",
      "faq.q5": "Mistä löydän tietosuojakäytännön ja käyttöehdot?",
      "faq.a5": "Löydät ne tämän sivuston alatunnisteesta ja navigaatiolinkeistä.",
      "footer.copy": "Nopea ja yksinkertainen puhekäännös matkustamiseen, keskusteluihin ja arjen viestintään.",
      "footer.privacy": "Tietosuojakäytäntö",
      "footer.terms": "Käyttöehdot",
      "footer.appStore": "App Store"
    }
  },
  privacy: {
    en: {
      "meta.title": "Privacy Policy | Super Simple Translate",
      "meta.description": "Privacy Policy for Super Simple Translate.",
      "brand.full": "Super Simple Translator",
      "nav.features": "Features",
      "nav.faq": "FAQ",
      "nav.privacy": "Privacy",
      "nav.terms": "Terms",
      "privacy.eyebrow": "Privacy Policy",
      "privacy.title": "Privacy Policy",
      "privacy.intro": "This page is ready for your final Privacy Policy content. Replace the placeholder copy below with the legal text you want to publish for Super Simple Translator.",
      "privacy.overviewTitle": "Overview",
      "privacy.overviewBody": "Explain what information your app collects, how it is used, and how users can contact you with privacy questions.",
      "privacy.collectTitle": "Information You Collect",
      "privacy.collectBody": "Add details about account information, analytics, speech data handling, or any other app-specific data collection practices here.",
      "privacy.contactTitle": "Contact",
      "privacy.contactLead": "For privacy questions, contact"
    },
    fi: {
      "meta.title": "Tietosuojakäytäntö | Super Simple Translate",
      "meta.description": "Super Simple Translaten tietosuojakäytäntö.",
      "brand.full": "Super Simple Translator",
      "nav.features": "Ominaisuudet",
      "nav.faq": "UKK",
      "nav.privacy": "Tietosuoja",
      "nav.terms": "Ehdot",
      "privacy.eyebrow": "Tietosuojakäytäntö",
      "privacy.title": "Tietosuojakäytäntö",
      "privacy.intro": "Tämä sivu on valmis lopullista tietosuojakäytäntöäsi varten. Korvaa alla oleva paikkateksti juridisella sisällöllä, jonka haluat julkaista Super Simple Translatorille.",
      "privacy.overviewTitle": "Yleiskuva",
      "privacy.overviewBody": "Kerro, mitä tietoja sovellus kerää, miten niitä käytetään ja miten käyttäjät voivat ottaa yhteyttä tietosuojaan liittyvissä kysymyksissä.",
      "privacy.collectTitle": "Kerättävät tiedot",
      "privacy.collectBody": "Lisää tähän tiedot esimerkiksi tilitiedoista, analytiikasta, puhedatan käsittelystä tai muista sovelluskohtaisista tietojenkeruukäytännöistä.",
      "privacy.contactTitle": "Yhteystiedot",
      "privacy.contactLead": "Tietosuojaan liittyvissä kysymyksissä ota yhteyttä"
    }
  },
  terms: {
    en: {
      "meta.title": "Terms of Service | Super Simple Translate",
      "meta.description": "Terms of Service for Super Simple Translate.",
      "brand.full": "Super Simple Translator",
      "nav.faq": "FAQ",
      "nav.privacy": "Privacy",
      "nav.terms": "Terms",
      "terms.eyebrow": "Terms of Service",
      "terms.title": "Terms of Service",
      "terms.intro": "This page is ready for your final Terms of Service content. Replace the placeholder copy below with the legal terms you want to publish for Super Simple Translator.",
      "terms.usingTitle": "Using the App",
      "terms.usingBody": "Add terms that describe acceptable use, app access, and any important service limitations for users of Super Simple Translator.",
      "terms.availabilityTitle": "Availability",
      "terms.availabilityBody": "Include language about app availability, updates, and any changes you may make to the service over time.",
      "terms.contactTitle": "Contact",
      "terms.contactLead": "For support questions, contact"
    },
    fi: {
      "meta.title": "Käyttöehdot | Super Simple Translate",
      "meta.description": "Super Simple Translaten käyttöehdot.",
      "brand.full": "Super Simple Translator",
      "nav.faq": "UKK",
      "nav.privacy": "Tietosuoja",
      "nav.terms": "Ehdot",
      "terms.eyebrow": "Käyttöehdot",
      "terms.title": "Käyttöehdot",
      "terms.intro": "Tämä sivu on valmis lopullisia käyttöehtojasi varten. Korvaa alla oleva paikkateksti juridisella sisällöllä, jonka haluat julkaista Super Simple Translatorille.",
      "terms.usingTitle": "Sovelluksen käyttö",
      "terms.usingBody": "Lisää ehdot, jotka kuvaavat hyväksyttävää käyttöä, sovelluksen käyttöoikeutta ja mahdollisia tärkeitä palvelurajoituksia Super Simple Translatorin käyttäjille.",
      "terms.availabilityTitle": "Saatavuus",
      "terms.availabilityBody": "Sisällytä tähän tekstiä sovelluksen saatavuudesta, päivityksistä ja mahdollisista muutoksista, joita voit tehdä palveluun ajan myötä.",
      "terms.contactTitle": "Yhteystiedot",
      "terms.contactLead": "Tukikysymyksissä ota yhteyttä"
    }
  }
};

function getStoredLanguage() {
  const stored = window.localStorage.getItem("siteLanguage");
  if (stored === "en" || stored === "fi") {
    return stored;
  }
  return defaultLanguage;
}

function setActiveLanguageButton(language) {
  languageButtons.forEach((button) => {
    const isActive = button.dataset.langChoice === language;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function setTextContent(languageMap, key, element) {
  const value = languageMap[key];
  if (typeof value === "string") {
    element.textContent = value;
  }
}

function setAttributeContent(languageMap, key, element) {
  const value = languageMap[key];
  const attributeName = element.dataset.i18nAttr;
  if (typeof value === "string" && attributeName) {
    element.setAttribute(attributeName, value);
  }
}

function applyLanguage(language) {
  const languageMap = translations[page]?.[language] || translations[page]?.[defaultLanguage];
  if (!languageMap) {
    return;
  }

  document.documentElement.lang = language;

  localizedElements.forEach((element) => {
    setTextContent(languageMap, element.dataset.i18n, element);
  });

  localizedAttributes.forEach((element) => {
    setAttributeContent(languageMap, element.dataset.i18n, element);
  });

  setActiveLanguageButton(language);
  window.localStorage.setItem("siteLanguage", language);
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyLanguage(button.dataset.langChoice || defaultLanguage);
  });
});

applyLanguage(getStoredLanguage());
