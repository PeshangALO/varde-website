document.addEventListener("DOMContentLoaded", function() {
    // === Copyright year ===
    const currentYear = new Date().getFullYear();
    const copyrightElement = document.getElementById("copyright");
    if (copyrightElement) {
        copyrightElement.innerHTML = `&copy; ${currentYear} Varde Tech AS `;
    }

    // === NAVIGATION ===
    const navLogo = `images/varde-logo-white.png`;

    const navHTML = `
        <div>
            <a href="./index.html">
                <img src=${navLogo} class="header-logo" alt="Varde logo"/>
            </a>
        </div>
        <ul role="menubar">
            <li class="language-switcher desktop-language-switcher" data-lang="no">
                <select id="language-switcher" aria-label="Select Language">
                   <option id="lang-no" value="no">NO</option>
                   <option id="lang-en" value="en">EN</option>
                </select>
            </li>
            <li><a class="nav-button" role="menuitem" data-i18n="nav.vardeT0" href="./VardeT0.html">Varde T0</a></li>
            <li><a class="nav-button" role="menuitem" data-i18n="nav.vardeT1" href="./VardeT1.html">Varde T1</a></li>
            <li><a class="nav-button" role="menuitem" data-i18n="nav.blog" href="./blog.html">Blogg</a></li>
            <li><a class="nav-button" role="menuitem" data-i18n="nav.contact" href="#contact">Kontakt oss</a></li>
        </ul>
    `;

    const hamburgerNav = `
        <div class="hamburger-parent">
            <a href="index.html"><img src=${navLogo} alt="Varde logo"></a>            
            <button class="hamburger-menu" aria-expanded="false" aria-controls="mobile-menu" aria-label="Toggle menu">
                <span></span><span></span><span></span>
            </button>
        </div>
        <nav id="mobile-menu" class="off-screen-menu" hidden>
            <ul role="menubar">
                <li class="language-switcher mobile-language-switcher" data-lang="no">
                    <select id="language-switcher-mobile" aria-label="Select Language">
                        <option value="no">NO</option>
                        <option value="en">EN</option>
                    </select>
                </li>
                <li><a class="nav-links" role="menuitem" data-i18n="nav.vardeT0" href="./VardeT0.html">Varde T0</a></li>
                <li><a class="nav-links" role="menuitem" data-i18n="nav.vardeT1" href="./VardeT1.html">Varde T1</a></li>
                <li><a class="nav-links" role="menuitem" data-i18n="nav.blog" href="./blog.html">Blogg</a></li>
                <li><a class="nav-links" role="menuitem" data-i18n="nav.contact" href="#contact">Kontakt</a></li>
            </ul>
        </nav>
    `;

    // Inject navs into DOM
    const navElement = document.getElementById("nav-container");
    const hamburgerContainer = document.getElementById("hamburger-menu");

    if (navElement) navElement.innerHTML = navHTML;
    if (hamburgerContainer) hamburgerContainer.innerHTML = hamburgerNav;

// === LANGUAGE SWITCHING ===
const desktopWrapper = document.querySelector('.desktop-language-switcher');
const mobileWrapper = document.querySelector('.mobile-language-switcher');
const mainLangSelect = document.getElementById('language-switcher');
const mobileLangSelect = document.getElementById('language-switcher-mobile');

function setWrapperLang(lang) {
    const normalized = lang.startsWith('en') ? 'en' : 'no';
    if (desktopWrapper) desktopWrapper.setAttribute('data-lang', normalized);
    if (mobileWrapper) mobileWrapper.setAttribute('data-lang', normalized);
}

// Function to change language in i18n system
let isChangingLanguage = false; // Prevent duplicate calls
function changeLanguage(lang) {
    if (isChangingLanguage) return; // Skip if already changing
    
    if (window.i18next && typeof window.i18next.changeLanguage === 'function') {
        isChangingLanguage = true;
        window.i18next.changeLanguage(lang).then(() => {
            // Apply translations after language change
            if (window.applyTranslations && typeof window.applyTranslations === 'function') {
                window.applyTranslations();
            }
            // Dispatch custom event for blog and other components
            window.dispatchEvent(new CustomEvent('languageChanged', { detail: lang }));
            isChangingLanguage = false;
        }).catch(() => {
            isChangingLanguage = false;
        });
    }
}

// I script.js
if (mainLangSelect) {
    mainLangSelect.addEventListener('change', (event) => {
        const chosen = event.target.value;
        if (mobileLangSelect && mobileLangSelect.value !== chosen) {
            mobileLangSelect.value = chosen;
        }
        setWrapperLang(chosen);
        changeLanguage(chosen); // Trigger i18n change
        
        event.target.blur(); // <-- ✅ LEGG TIL DENNE LINJEN
    });
}

// I script.js
if (mobileLangSelect) {
    mobileLangSelect.addEventListener('change', (event) => {
        const chosen = event.target.value;
        if (mainLangSelect && mainLangSelect.value !== chosen) {
            mainLangSelect.value = chosen;
        }
        setWrapperLang(chosen);
        changeLanguage(chosen); // Trigger i18n change directly
        
        event.target.blur(); // <-- ✅ LEGG TIL DENNE LINJEN
    });
}

const storedLang = localStorage.getItem('i18nextLng');
const initialLang = storedLang ? (storedLang.startsWith('en') ? 'en' : 'no') : (mainLangSelect ? mainLangSelect.value : 'no');
if (mainLangSelect) mainLangSelect.value = initialLang;
if (mobileLangSelect) mobileLangSelect.value = initialLang;
setWrapperLang(initialLang);

// === HAMBURGER MENU LOGIC (FIXED & MERGED) ===
    const hamburgerButton = document.querySelector('.hamburger-menu');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburgerButton && mobileMenu) {
        // Hent alle navigerbare elementer i menyen (lenker + språkvelger)
        const menuItems = mobileMenu.querySelectorAll('a[role="menuitem"], select');

        // --- Funksjon for å låse/låse opp scrolling ---
        function setBodyScroll(locked) {
            document.body.style.overflow = locked ? 'hidden' : '';
        }

        // --- Hovedfunksjoner for meny ---
        function openMenu() {
            hamburgerButton.setAttribute('aria-expanded', 'true');
            hamburgerButton.classList.add('active');
            mobileMenu.hidden = false;
            mobileMenu.classList.add('active');
            setBodyScroll(true); // Lås scrolling
        }
        
        function closeMenu() {
            hamburgerButton.setAttribute('aria-expanded', 'false');
            hamburgerButton.classList.remove('active');
            mobileMenu.hidden = true;
            mobileMenu.classList.remove('active');
            setBodyScroll(false); // Lås opp scrolling
        }

        // 1. Klikk på knappen for å åpne/lukke
        hamburgerButton.addEventListener('click', () => {
            const isExpanded = hamburgerButton.getAttribute('aria-expanded') === 'true';
            if (isExpanded) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // 2. Klikk utenfor menyen for å lukke
        document.addEventListener('click', (e) => {
            // Sjekk om menyen er åpen
            const isExpanded = hamburgerButton.getAttribute('aria-expanded') === 'true';
            if (!isExpanded) return; // Ikke gjør noe hvis menyen er lukket

            const isInsideButton = hamburgerButton.contains(e.target);
            const isInsideMenu = mobileMenu.contains(e.target);

            if (!isInsideButton && !isInsideMenu) {
                closeMenu();
            }
        });

        // --- Tilgjengelighetsfunksjoner (fra hamburgerMenu.js) ---

        // 3. Lukk med Escape-tasten
        document.addEventListener('keydown', (event) => {
            if (event.key === "Escape" || event.key === "Esc") {
                if (hamburgerButton.getAttribute('aria-expanded') === 'true') {
                    closeMenu();
                    hamburgerButton.focus(); // Sett fokus tilbake på knappen
                }
            }
        });

        // 4. Piltast-navigering
        let currentIndex = 0;
        mobileMenu.addEventListener("keydown", (event) => {
            if (mobileMenu.hidden) return; // Ikke gjør noe hvis menyen er lukket

            if (event.key === "ArrowDown") {
                event.preventDefault();
                currentIndex = (currentIndex + 1) % menuItems.length;
                menuItems[currentIndex].focus();
            } else if (event.key === "ArrowUp") {
                event.preventDefault();
                currentIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
                menuItems[currentIndex].focus();
            }
        });

        // 5. Sett aria-current på riktig lenke
        const currentUrl = new URL(window.location.href);
        menuItems.forEach(item => {
            // Sjekk at det er en lenke (<a>)
            if (item.tagName === 'A') {
                const linkUrl = new URL(item.href, window.location.origin);
                if (linkUrl.pathname === currentUrl.pathname) {
                    item.setAttribute("aria-current", "page");
                }
            }
        });
    }

    // === NAV ACTIVE STATE ===
    // (Resten av koden din fortsetter her...)

    // === NAV ACTIVE STATE ===
    const navButtons = document.querySelectorAll(".nav-button");
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    
    navButtons.forEach(button => {
        if (button.closest("a").getAttribute("href").includes(currentPage)) {
            button.classList.add("active-button");
        }
        
        button.addEventListener("click", () => {
            navButtons.forEach(b => b.classList.remove("active-button"));
            button.classList.add("active-button");
        });
    });
    document.querySelectorAll('#language-switcher, #language-switcher-mobile').forEach(select => {
    select.addEventListener('mousedown', e => e.stopPropagation());
});

});
