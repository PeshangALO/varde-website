// scripts/loadContact.js
// Shared script for loading contact section across all pages

(function() {
  'use strict';

  // Load the contact section
  function loadContactSection() {
    const placeholder = document.getElementById('contact-placeholder');
    
    if (!placeholder) {
      console.warn('Contact placeholder not found');
      return;
    }

    fetch('contact.html')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then(data => {
        placeholder.innerHTML = data;
        
        // Apply translations if i18n is available
        if (window.applyTranslations && typeof window.applyTranslations === 'function') {
          window.applyTranslations();
        }
      })
      .catch(error => {
        console.error('Error loading contact section:', error);
        placeholder.innerHTML = '<p>Could not load contact information.</p>';
      });
  }

  // Load when DOM is ready (better than window.onload)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadContactSection);
  } else {
    // DOM already loaded
    loadContactSection();
  }
})();