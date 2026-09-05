document.addEventListener('DOMContentLoaded', () => {
    const langSelect = document.getElementById('language-select');

    // Determine Initial Language Priority
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    const storedLang = localStorage.getItem('eternafix_lang');
    const browserLang = navigator.language ? navigator.language.split('-')[0] : 'en';

    let currentLang = 'en';
    if (urlLang && translations[urlLang]) {
        currentLang = urlLang;
    } else if (storedLang && translations[storedLang]) {
        currentLang = storedLang;
    } else if (translations[browserLang]) {
        currentLang = browserLang;
    }

    // Set Initial Selection and Apply
    langSelect.value = currentLang;
    applyLanguage(currentLang);

    // Handle Selection Change
    langSelect.addEventListener('change', (e) => {
        const selectedLang = e.target.value;
        localStorage.setItem('eternafix_lang', selectedLang);
        
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set('lang', selectedLang);
        window.history.pushState({ path: newUrl.href }, '', newUrl.href);

        applyLanguage(selectedLang);
    });

    // Translation & RTL Application Function
    function applyLanguage(lang) {
        const langDict = translations[lang] || translations['en'];
        
        // Handle HTML attributes for SEO and RTL styling
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

        // Translate elements
        const i18nElements = document.querySelectorAll('[data-i18n]');
        i18nElements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (langDict[key]) {
                element.textContent = langDict[key];
            }
        });
    }
});