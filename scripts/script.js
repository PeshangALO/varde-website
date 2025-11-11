document.addEventListener("DOMContentLoaded", function() {
    const currentYear = new Date().getFullYear();
    const copyrightElement = document.getElementById("copyright");
    copyrightElement.innerHTML = `&copy; ${currentYear} Varde Tech AS `;
});

document.addEventListener('DOMContentLoaded', function() { 
    const navLogo = `images/varde-logo-white.png`;
    
    const navHTML = `
        <div>
            <a href="./index.html">
                <img src=${navLogo} class="header-logo"/>
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
            <nav class="hamburger-parent" aria-label="Toggle navigation menu" aria-expanded="false">
                <a href="index.html"><img src=${navLogo} alt="Varde logo"></a>            
                <button class="hamburger-menu" aria-expanded="false" aria-controls="mobile-menu" aria-label="Toggle menu">
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </nav>
              <div id="mobile-menu" class="off-screen-menu" hidden>
                <ul role="menubar">
                    <li class="language-switcher mobile-language-switcher" data-lang="no">
                        <select id="language-switcher-mobile" aria-label="Select Language">
                            <option value="no">NO</option>
                            <option value="en">EN</option>
                        </select>
                    </li>
                    <li><a class="nav-links" role="menuitem" data-i18n="nav.vardeT0" href="./VardeT0.html">Varde T0</a></li>
                    <li><a class="nav-links" role="menuitem" data-i18n="nav.vardeT1" href="./VardeT1.html">Varde T1</a></li>
                    <li><a class="nav-links" role="menuitem" data-i18n="nav.blog" href="blog.html">Blogg</a></li>
                    <li><a class="nav-links" role="menuitem" data-i18n="nav.contact" href="#contact">Kontakt</a></li>
                </ul>
              </div>
`;

    const currentPath = window.location.pathname; 

    const hamburgerMenu = document.getElementById("hamburger-menu");
    hamburgerMenu.innerHTML = hamburgerNav;

    const navElement = document.getElementById("nav-container");
    navElement.innerHTML = navHTML;

    const desktopWrapper = document.querySelector('.desktop-language-switcher');
    const mobileWrapper = document.querySelector('.mobile-language-switcher');
    const mainLangSelect = document.getElementById('language-switcher');
    const mobileLangSelect = document.getElementById('language-switcher-mobile');

    function setWrapperLang(lang) {
        const normalized = lang.startsWith('en') ? 'en' : 'no';
        if (desktopWrapper) desktopWrapper.setAttribute('data-lang', normalized);
        if (mobileWrapper) mobileWrapper.setAttribute('data-lang', normalized);
    }

    if (mainLangSelect) {
        mainLangSelect.addEventListener('change', (event) => {
            const chosen = event.target.value;
            if (mobileLangSelect && mobileLangSelect.value !== chosen) {
                mobileLangSelect.value = chosen;
            }
            setWrapperLang(chosen);
        });
    }

    if (mobileLangSelect) {
        mobileLangSelect.addEventListener('change', (event) => {
            const chosen = event.target.value;
            if (mainLangSelect && mainLangSelect.value !== chosen) {
                mainLangSelect.value = chosen;
                mainLangSelect.dispatchEvent(new Event('change'));
            }
            setWrapperLang(chosen);
        });
    }

    const storedLang = localStorage.getItem('i18nextLng');
    const initialLang = storedLang ? (storedLang.startsWith('en') ? 'en' : 'no') : (mainLangSelect ? mainLangSelect.value : 'no');
    if (mainLangSelect) mainLangSelect.value = initialLang;
    if (mobileLangSelect) mobileLangSelect.value = initialLang;
    setWrapperLang(initialLang);
});


document.addEventListener("DOMContentLoaded", () => {
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

    navButtons.forEach((item, index) => {
        item.addEventListener("keydown", (e) => {

            switch(e.key){
                case 'ArrowRight':
                    e.preventDefault();
                        const nextItem = navButtons[(index + 1) % navButtons.length];
                    nextItem.focus();
                break;
            
                case 'ArrowLeft':
                    e.preventDefault();
                        const prevItem = navButtons[(index - 1 + navButtons.length) % navButtons.length];
                    prevItem.focus();
                break;
                
                case 'Home':
                    e.preventDefault();
                    navButtons[0].focus();
                break;

                case 'End':
                    e.preventDefault();
                    navButtons[navButtons.length - 1].focus();
                break;
            }
        });
    });
});