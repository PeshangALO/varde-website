document.addEventListener("DOMContentLoaded", function() {
    fetch('./json/blogs.json')
        .then(response => response.json())
        .then(data => {
            // Sort the data by date in descending order
            data.sort((a, b) => new Date(b.date) - new Date(a.date));

            const blogContainer = document.getElementById('blog-container');
            if (blogContainer) {
                blogContainer.classList.add('blog-feed');
            }
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

                const blogInfo = document.createElement("div");
                blogInfo.classList.add("blog-info-container");

                const blogDate = document.createElement('h6');
                blogDate.classList.add('blog-info');
                blogDate.textContent = new Date(blog.date).toLocaleDateString('no-NO', {
                    year: 'numeric', month: 'long', day: 'numeric'
                });

                if (blog.photoCreds) {
                    const pictureCred = document.createElement('h6');
                    pictureCred.textContent = blog.photoCreds;
                    pictureCred.classList.add('blog-info');
                    blogInfo.appendChild(pictureCred);
                }

                blogInfo.append(blogDate);

                const blogText = document.createElement('p');
                blogText.innerHTML = blog.description;

                blogDescription.appendChild(blogTitle);
                blogDescription.appendChild(blogText);
                blogDescription.appendChild(blogInfo);

                blogItem.appendChild(blogImage);
                blogItem.appendChild(blogDescription);

                blogContainer.appendChild(blogItem);
            });
        })
        .catch(error => console.log('Error fetching blog data:', error));
});