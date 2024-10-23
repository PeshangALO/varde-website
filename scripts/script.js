document.addEventListener("DOMContentLoaded", function() {
    const currentYear = new Date().getFullYear();
    const copyrightElement = document.getElementById("copyright");
    copyrightElement.innerHTML = `&copy; ${currentYear} Varde `;
});

document.addEventListener('DOMContentLoaded', function() {
    //Navigation bar script. 
    const navLogo = `images/varde-logo-white.png`;
    
    const currentPath = window.location.pathname; 

    const navHTML = `
        <div>
            <a href="./index.html">
                <img src=${navLogo} class="header-logo" />
            </a>
        </div>
        <ul>
            <li><a class="nav-button" href="./index.html#home">Home</a></li>
            <li><a class="nav-button" href="./about-varde.html">About</a></li>
            <li><a class="nav-button" href="./index.html#the-team" id="team-link">The Team</a></li>
            <li><a class="nav-button" href="./blog.html">Blog</a></li>
            <li><a class="nav-button" href="#contact">Contact</a></li>
        </ul>
    `;
    
const hamburgerNav = `
            <nav class="hamburger-parent">
                <a href="index.html"><img src=${navLogo}></a>            
                <button class="hamburger-menu" aria-expanded="false" aria-controls="mobile-menu" aria-label="Toggle menu">
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </nav>
              <div id="mobile-menu" class="off-screen-menu" hidden>
                <ul>
                  <li><a class="nav-links" href="./index.html">Home</a></li>
                  <li><a class="nav-links" href="./about-varde.html">About</a></li>
                  <li><a class="nav-links" href="./index.html#the-team" id="team-link">The Team</a></li>
                  <li><a class="nav-links" href="blog.html">Blog</a></li>
                  <li><a class="nav-links" href="#contact">Contact</a></li>
                </ul>
              </div>
`;

    const hamburgerMenu = document.getElementById("hamburger-menu");
    hamburgerMenu.innerHTML = hamburgerNav;

    const navElement = document.getElementById("nav-container");
    navElement.innerHTML = navHTML;

    const teamLink = document.getElementById('team-link');
    
    if (currentPath.includes("index.html") || currentPath === "/") {
        teamLink.href = "#the-team";  // Scroll directly to the section if on index.html
    } else {
        teamLink.href = "./index.html#the-team"; // Redirect to index.html with #the-team
    }
});



document.addEventListener("DOMContentLoaded", () => {
    const navButtons = document.querySelectorAll(".nav-button");
    let activeButton = null;

    const currentPage = window.location.pathname.split("/").pop();

    const savedIndex = localStorage.getItem("activeButtonIndex");

    function setActiveButton(button, index) {
        if (activeButton) {
            activeButton.classList.remove("active-button");
        }
        button.classList.add("active-button");
        activeButton = button;
        localStorage.setItem("activeButtonIndex", index);
    }

    // Loop through each nav button and determine which should be active
    navButtons.forEach((button, index) => {
        const link = button.closest("a").getAttribute("href").split("/").pop();

        // If the current page matches the link, set as active
        if (currentPage === link || (currentPage === "" && link === "index.html")) {
            setActiveButton(button, index);
        }

        button.addEventListener("click", () => {
            setActiveButton(button, index);
        });
    });

    // If no button was set as active, try to restore from localStorage
    if (!activeButton && savedIndex !== null && navButtons[savedIndex]) {
        setActiveButton(navButtons[savedIndex], savedIndex);
    }
});





