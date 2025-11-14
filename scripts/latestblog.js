// scripts/latestBlog.js
import { urlFor, getBlogsByLanguage, getCurrentLanguage } from "../lib/sanity.js";

async function loadLatestBlog(lang = "no") {
  try {
    const blogs = await getBlogsByLanguage(lang);
    const blogContainer = document.getElementById('latest-blog-wrapper');
    if (!blogContainer) return;
    blogContainer.innerHTML = "";

    if (!blogs || blogs.length === 0) {
      const noBlogsMsg = document.createElement('p');
      noBlogsMsg.textContent = lang === 'no' ? 'Ingen blogginnlegg funnet.' : 'No blog posts found.';
      noBlogsMsg.style.textAlign = 'center';
      noBlogsMsg.style.padding = '2rem';
      blogContainer.appendChild(noBlogsMsg);
      return;
    }

    const latestBlog = blogs[0]; // getBlogsByLanguage already orders desc by date

    const blogItem = document.createElement('div');
    blogItem.classList.add('latest-blog-item');

    if (latestBlog.image) {
      const blogImg = document.createElement('img');
      blogImg.src = urlFor(latestBlog.image).width(800).url();
      blogImg.alt = latestBlog.title || 'latest blog image';
      blogImg.classList.add('latest-blog-image');
      blogItem.appendChild(blogImg);
    }

    const blogText = document.createElement('div');
    blogText.classList.add('latest-blog-description');

    const blogTitle = document.createElement('h2');
    blogTitle.textContent = latestBlog.title || '';
    blogText.appendChild(blogTitle);

    const blogDescription = document.createElement('p');
    blogDescription.textContent = latestBlog.description || '';
    blogText.appendChild(blogDescription);

    const blogDate = document.createElement('h6');
    blogDate.classList.add('latest-blog-date');
    blogDate.textContent = latestBlog.date ? new Date(latestBlog.date).toLocaleDateString(
      lang === 'no' ? 'no-NO' : 'en-US',
      { year: 'numeric', month: 'long', day: 'numeric' }
    ) : '';
    blogText.appendChild(blogDate);

    blogItem.appendChild(blogText);
    blogContainer.appendChild(blogItem);

  } catch (err) {
    console.error("Error loading latest blog from Sanity:", err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const startLang = getCurrentLanguage();
  loadLatestBlog(startLang);

  // react to language changes (dispatched by setLanguage or i18n change handler)
  window.addEventListener('languageChanged', (e) => {
    const newLang = e.detail || 'no';
    loadLatestBlog(newLang);
  });
});
