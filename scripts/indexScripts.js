document.addEventListener("DOMContentLoaded", function() {
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

    function loadLatestBlog(lang = "no") {
        fetch('./json/blogs.json')
            .then(response => response.json())
            .then(data => {
                data.sort((a, b) => new Date(b.date) - new Date(a.date));
                const firstBlogItem = data[0];
                const blogContainer = document.getElementById('latest-blog-wrapper');
                blogContainer.innerHTML = "";

                if (firstBlogItem) {
                    const blogItem = document.createElement('div');
                    blogItem.classList.add('latest-blog-item');

                    const blogImg = document.createElement('img');
                    blogImg.src = firstBlogItem.image;
                    blogImg.alt = "latest blog image";
                    blogImg.classList.add('latest-blog-image');

                    const blogText = document.createElement("div");
                    blogText.classList.add("latest-blog-description");

                    const blogTitle = document.createElement('h2');
                    blogTitle.textContent = firstBlogItem.title;

                    const blogDescription = document.createElement('p');
                    blogDescription.textContent = firstBlogItem.description;
                    blogDescription.classList.add('latest-blog-description');

                    const blogDate = document.createElement('h6');
                    blogDate.textContent = new Date(firstBlogItem.date).toLocaleDateString(
                        lang === "no" ? "no-NO" : "en-US",
                        { year: "numeric", month: "long", day: "numeric" }
                    );
                    blogDate.classList.add('latest-blog-date');

                    blogText.appendChild(blogTitle);
                    blogText.appendChild(blogDescription);
                    blogText.appendChild(blogDate);

                    blogItem.appendChild(blogImg);
                    blogItem.appendChild(blogText);

                    blogContainer.appendChild(blogItem);
                }
            })
            .catch(err => console.error("Error loading blog JSON:", err));
    }

    // Detect initial language
    const lang = document.documentElement.lang || "no";
    loadTeam(lang);
    loadLatestBlog(lang);

    // Optional: Re-load content when language changes dynamically
    if (window.i18next) {
        i18next.on('languageChanged', (lng) => {
            loadTeam(lng);
            loadLatestBlog(lng);
        });
    }
});
