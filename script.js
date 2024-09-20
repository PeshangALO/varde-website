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
    fetch('blogs.json')
        .then(response => response.json())
        .then(data => {
            // Sort the data by date in descending order
            data.sort((a, b) => new Date(b.date) - new Date(a.date));

            const blogContainer = document.getElementById('blog-container');
            data.forEach(blog => {
                const blogItem = document.createElement('div');
                blogItem.classList.add('blog-item');

                const blogImage = document.createElement('img');
                blogImage.src = blog.image;
                blogImage.alt = blog.title;
                blogImage.classList.add('blog-image');

                const blogDescription = document.createElement('div');
                blogDescription.classList.add('blog-description');

                const blogTitle = document.createElement('h2');
                blogTitle.textContent = blog.title;

                const blogDate = document.createElement('p');
                blogDate.classList.add('blog-date');
                blogDate.textContent = new Date(blog.date).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric'
                });

                const blogText = document.createElement('p');
                blogText.innerHTML = blog.description;

                blogDescription.appendChild(blogTitle);
                blogDescription.appendChild(blogDate);
                blogDescription.appendChild(blogText);

                blogItem.appendChild(blogImage);
                blogItem.appendChild(blogDescription);

                blogContainer.appendChild(blogItem);
            });
        })
        .catch(error => console.error('Error fetching blog data:', error));
});

document.addEventListener("DOMContentLoaded", function() {
    const currentYear = new Date().getFullYear();
    const copyrightElement = document.getElementById("copyright");
    copyrightElement.innerHTML = `&copy; ${currentYear} Paral Dynamics`;
});

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    mobileMenu.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
});