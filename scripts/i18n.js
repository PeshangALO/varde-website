document.addEventListener("DOMContentLoaded", function() {
  i18next
    .use(i18nextHttpBackend)
    .use(i18nextBrowserLanguageDetector)
    .init({
      fallbackLng: 'no',
      debug: false,
      backend: {
        loadPath: './json/{{lng}}.json'
      },
      detection: {
        order: ['querystring', 'localStorage', 'navigator', 'htmlTag'],
        caches: ['localStorage']
      }
    }, function(err, t) {
      if (err) {
        // In production we avoid noisy logs; fail gracefully
      }
      setHtmlLang(i18next.language);
      syncSwitcher(i18next.language);
      updateContent();
    });

  function updateContent() {
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      el.innerHTML = i18next.t(key);
    });
    // expose for dynamic fragments (e.g., contact.html)
    window.applyTranslations = updateContent;
  }

  function setHtmlLang(lang) {
    const htmlEl = document.documentElement;
    if (htmlEl) htmlEl.setAttribute('lang', lang);
  }

  function syncSwitcher(lang) {
    const langSwitcher = document.getElementById("language-switcher");
    const mobileSwitcher = document.getElementById("language-switcher-mobile");
    if (langSwitcher) {
      langSwitcher.value = lang.startsWith('en') ? 'en' : 'no';
    }
    if (mobileSwitcher) {
      mobileSwitcher.value = lang.startsWith('en') ? 'en' : 'no';
    }
    document.querySelectorAll('.language-switcher').forEach(wrapper => {
      wrapper.setAttribute('data-lang', lang.startsWith('en') ? 'en' : 'no');
    });
  }

  const langSwitcher = document.getElementById("language-switcher");
  if (langSwitcher) {
    langSwitcher.addEventListener("change", (e) => {
      const chosen = e.target.value;
      i18next.changeLanguage(chosen, () => {
        localStorage.setItem('i18nextLng', chosen);
        setHtmlLang(chosen);
        updateContent();
      });
    });
  }
});
