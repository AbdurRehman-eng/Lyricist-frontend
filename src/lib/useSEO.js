import { useEffect } from 'react';

export default function useSEO({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  canonicalUrl,
}) {
  useEffect(() => {
    // 1. Update Title
    if (title) {
      document.title = title;
    }

    // Helper to update or create a meta tag
    const updateOrCreateMeta = (attributeName, attributeValue, contentValue) => {
      if (contentValue === undefined || contentValue === null) return;
      
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', contentValue);
    };

    // 2. Standard Meta Tags
    if (description) updateOrCreateMeta('name', 'description', description);
    if (keywords) updateOrCreateMeta('name', 'keywords', keywords);
    
    // 3. Open Graph
    updateOrCreateMeta('property', 'og:title', ogTitle || title);
    updateOrCreateMeta('property', 'og:description', ogDescription || description);
    updateOrCreateMeta('property', 'og:image', ogImage || '/android-chrome-512x512.png');
    updateOrCreateMeta('property', 'og:url', ogUrl || window.location.href);
    updateOrCreateMeta('property', 'og:type', 'website');
    
    // 4. Twitter Cards
    updateOrCreateMeta('name', 'twitter:card', 'summary_large_image');
    updateOrCreateMeta('name', 'twitter:title', ogTitle || title);
    updateOrCreateMeta('name', 'twitter:description', ogDescription || description);
    updateOrCreateMeta('name', 'twitter:image', ogImage || '/android-chrome-512x512.png');

    // 5. Canonical Link
    const finalCanonical = canonicalUrl || window.location.href;
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', finalCanonical);

  }, [title, description, keywords, ogTitle, ogDescription, ogImage, ogUrl, canonicalUrl]);
}
