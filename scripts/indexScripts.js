import { urlFor, getBlogsByLanguage, getCurrentLanguage } from "../lib/sanity.js";

document.addEventListener("DOMContentLoaded", function() {
    // 🔹 Load Team Members from JSON (still static)
    function loadTeam(lang = "no") {
        const teamJson = `./json/team.${lang}.json`;
        const employeeContainer = document.getElementById("team-members");
        employeeContainer.innerHTML = ""; // Clear existing content

        fetch(teamJson)
            .then(res => res.json())
            .then(data => {
                let employeeNumber = 1;
                data.forEach(employeeInfo => {
                    const employeeWrapper = document.createElement("div");
                    employeeWrapper.classList.add("employee-wrapper", `employee${employeeNumber}`);

                    const imgWrapper = document.createElement("div");
                    imgWrapper.classList.add("employee-image-wrapper");

                    const employeeImg = document.createElement("img");
                    employeeImg.src = employeeInfo.image;
                    employeeImg.alt = employeeInfo.teamMember;
                    employeeImg.loading = "lazy";
                    employeeImg.classList.add("employee-img");

                    const employeeDescription = document.createElement("div");
                    employeeDescription.classList.add("employee-text");

                    const employeeName = document.createElement("h3");
                    employeeName.textContent = employeeInfo.teamMember;

                    const employeePosition = document.createElement("h5");
                    employeePosition.textContent = employeeInfo.position;

                    const employeeText = document.createElement("p");
                    employeeText.textContent = employeeInfo.description;

                    imgWrapper.appendChild(employeeImg);
                    employeeDescription.appendChild(employeeName);
                    employeeDescription.appendChild(employeePosition);
                    employeeDescription.appendChild(employeeText);

                    employeeWrapper.appendChild(imgWrapper);
                    employeeWrapper.appendChild(employeeDescription);

                    employeeContainer.appendChild(employeeWrapper);
                    employeeNumber++;
                });
            })
            .catch(err => console.error("Error loading team JSON:", err));
    }

    // 🔹 Load Latest Blog Post from Sanity


    // 🔹 Detect initial language
    const currentLang = getCurrentLanguage();
    loadTeam(currentLang);
    loadLatestBlog(currentLang);

    // 🔹 Re-load when language changes
    window.addEventListener('languageChanged', (event) => {
        const newLang = event.detail || 'no';
        loadTeam(newLang);
        loadLatestBlog(newLang);
    });
    document.addEventListener("DOMContentLoaded", () => {
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const mobileMenu = document.getElementById("mobile-menu");
  const hamNav = document.querySelectorAll(".nav-links a");
    hamNav.forEach(link => {
    link.addEventListener("click", () => {
      hamburgerMenu.classList.remove("open");
      mobileMenu.classList.remove("open");
    })
    })
});
});
