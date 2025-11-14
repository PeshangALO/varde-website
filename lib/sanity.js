// lib/sanity.js
import { createClient } from "https://cdn.skypack.dev/@sanity/client";
import imageUrlBuilder from "https://cdn.skypack.dev/@sanity/image-url";

// Sanity client configuration
const SANITY_CONFIG = {
  projectId: "07lrr2d9",
  dataset: "production",
  apiVersion: "2025-01-01",
  useCdn: true,
};

export const client = createClient(SANITY_CONFIG);

// Image URL builder
const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

// Language management using i18next storage key for consistency
export const getCurrentLanguage = () => {
  const stored = localStorage.getItem('i18nextLng');
  if (!stored) return 'no';
  // Normalize values like 'nb-NO' -> 'no', 'en-US' -> 'en'
  return stored.startsWith('en') ? 'en' : 'no';
};

// Language setter with event dispatch for reactive updates
export const setLanguage = (lang) => {
  const normalized = lang.startsWith('en') ? 'en' : 'no';
  localStorage.setItem('i18nextLng', normalized);
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: normalized }));
};

// Fetch blogs by language with proper error handling
export const getBlogsByLanguage = async (language = 'no') => {
  try {
    const query = `*[_type == "blog" && language == $lang && !(_id in path("drafts.**"))] | order(date desc){
      _id,
      title,
      description,
      date,
      photoCreds,
      image,
      language
    }`;
    
    const blogs = await client.fetch(query, { lang: language });
    return blogs;
  } catch (error) {
    console.error('Error fetching blogs from Sanity:', error);
    return [];
  }
};

