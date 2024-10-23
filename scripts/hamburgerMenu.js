document.addEventListener("DOMContentLoaded", () => {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileMenu = document.getElementById("mobile-menu");
    const hamNav = document.querySelectorAll(".nav-links");

hamburgerMenu.addEventListener("click", () => {
        const expanded = hamburgerMenu.getAttribute("aria-expanded") === "true" || false;
        hamburgerMenu.setAttribute("aria-expanded", !expanded);
        hamburgerMenu.classList.toggle("active", !expanded); 

        mobileMenu.hidden = expanded;
        mobileMenu.classList.toggle("active", !expanded);

        if(!expanded){
            hamNav[0].focus();
        }           
    });

document.addEventListener("click", (event) => {
    if(!hamburgerMenu.contains(event.target) && !mobileMenu.contains(event.target)){
    closeMenu();   
    }
});

document.addEventListener("keydown", (event) => {
    if(event.key === "Escape" || event.key === "Esc"){
        closeMenu();
        }
    });
       
let currentIndex = 0;
 mobileMenu.addEventListener("keydown", (event) => {
        if(!mobileMenu.hidden){
            if(event.key === "ArrowDown"){
            event.preventDefault();
            currentIndex = (currentIndex + 1) % hamNav.length;  
            hamNav[currentIndex].focus();
            } else if (event.key === "ArrowUp") {
                event.preventDefault();
                currentIndex = (currentIndex - 1 + hamNav.length) % hamNav.length;
                hamNav[currentIndex].focus(); 
                }    
            }  
});


function closeMenu(){
        hamburgerMenu.setAttribute("aria-expanded", "false");
        mobileMenu.hidden = true;
        mobileMenu.classList.remove("active");
        hamburgerMenu.classList.remove("active");
}

});

