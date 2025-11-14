import { urlFor, getBlogsByLanguage, getCurrentLanguage } from "../lib/sanity.js";

document.addEventListener("DOMContentLoaded", async function () {
  const blogContainer = document.getElementById('blog-container');

  // Function to render blogs
  async function renderBlogs(lang) {
    try {
      blogContainer.innerHTML = "";
      const data = await getBlogsByLanguage(lang);

      if (data.length === 0) {
        const noBlogsMsg = document.createElement('p');
        noBlogsMsg.textContent = lang === 'no'
          ? 'Ingen blogginnlegg funnet.'
          : 'No blog posts found.';
        noBlogsMsg.style.textAlign = 'center';
        noBlogsMsg.style.padding = '2rem';
        blogContainer.appendChild(noBlogsMsg);
        return;
      }

      data.forEach(blog => {
        const blogItem = document.createElement('div');
        blogItem.classList.add('blog-item');

        const blogImage = document.createElement('img');
        blogImage.src = urlFor(blog.image).width(800).url();
        blogImage.alt = blog.title;
        blogImage.classList.add('blog-image');

        const blogDescription = document.createElement('div');
        blogDescription.classList.add('blog-description');

        const blogTitle = document.createElement('h2');
        blogTitle.textContent = blog.title;

        const pictureCred = document.createElement('h6');
        pictureCred.textContent = blog.photoCreds || '';
        pictureCred.classList.add('blog-info');

        const blogInfo = document.createElement('div');
        blogInfo.classList.add('blog-info-container');

        const blogDate = document.createElement('h6');
        blogDate.classList.add('blog-info');
        blogDate.textContent = new Date(blog.date).toLocaleDateString(lang === 'no' ? 'no-NO' : 'en-US', {
          year: 'numeric', month: 'long', day: 'numeric'
        });

        blogInfo.appendChild(pictureCred);
        blogInfo.appendChild(blogDate);

        const blogText = document.createElement('p');
        blogText.innerHTML = blog.description;

        blogDescription.appendChild(blogTitle);
        blogDescription.appendChild(blogText);
        blogDescription.appendChild(blogInfo);

        blogItem.appendChild(blogImage);
        blogItem.appendChild(blogDescription);

        blogContainer.appendChild(blogItem);
      });
    } catch (error) {
      console.error('Error fetching blog data from Sanity:', error);
    }
  }

  // Initial render
  const currentLang = getCurrentLanguage();
  await renderBlogs(currentLang);

  // 🔥 Listen for language changes
  window.addEventListener('languageChanged', async (event) => {
    const newLang = event.detail;
    await renderBlogs(newLang);
  });
});

