document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('nav a');

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        });
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const currentYear = new Date().getFullYear();
    const copyrightElement = document.getElementById("copyright");
    copyrightElement.innerHTML = `&copy; ${currentYear} Varde `;
});

/*
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    mobileMenu.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
});
*/


document.addEventListener('DOMContentLoaded', function(){
    const navLogo = `images/varde-logo-white.png`

    const navHTML = `
           <a href="./index.html"> <img src= ${navLogo} class="header-logo"/></a> 
           <ul>
                <li><a href="#about-us">About   </a></li>
                <li><a href="#the-team">The Team</a></li>
                <li><a href="#latest-blog">Blog    </a></li>
                <li><a href="#contact">Contact </a></li>
            </ul>
    `;
    const navElement = document.getElementById("nav-container");
    navElement.innerHTML = navHTML;
});