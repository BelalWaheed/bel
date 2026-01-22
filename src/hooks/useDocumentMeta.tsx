import { useEffect, useRef } from 'react';

export interface DocumentMetaOptions {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  ogUrl?: string;
  ogSiteName?: string;
  ogLocale?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterUrl?: string;
  canonicalUrl?: string;
  favicon?: string;
  lang?: string;
  dir?: 'ltr' | 'rtl';
  productMeta?: {
    price?: number;
    currency?: string;
    availability?: string;
    category?: string;
  };
}

/**
 * Native React hook to manage document head elements.
 * Replaces react-helmet-async with direct DOM manipulation.
 * Compatible with React 19.
 */
export function useDocumentMeta(options: DocumentMetaOptions) {
  // Track elements we've created so we can clean them up
  const createdElements = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const elementsToCleanup: HTMLElement[] = [];

    // Helper to create or update a meta tag
    const setMetaTag = (
      selector: string,
      content: string,
      attrName: 'name' | 'property' = 'name'
    ) => {
      let element = document.querySelector<HTMLMetaElement>(selector);
      if (!element) {
        element = document.createElement('meta');
        const attrValue = selector.match(/\[(?:name|property)="([^"]+)"\]/)?.[1];
        if (attrValue) {
          element.setAttribute(attrName, attrValue);
        }
        document.head.appendChild(element);
        elementsToCleanup.push(element);
      }
      element.content = content;
    };

    // Helper to create or update a link tag
    const setLinkTag = (rel: string, href: string, type?: string) => {
      let element = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.rel = rel;
        if (type) element.type = type;
        document.head.appendChild(element);
        elementsToCleanup.push(element);
      }
      element.href = href;
    };

    // Set title
    if (options.title) {
      document.title = options.title;
    }

    // Set HTML lang and dir
    if (options.lang) {
      document.documentElement.lang = options.lang;
    }
    if (options.dir) {
      document.documentElement.dir = options.dir;
    }

    // Primary meta tags
    if (options.description) {
      setMetaTag('meta[name="description"]', options.description, 'name');
    }
    if (options.keywords) {
      setMetaTag('meta[name="keywords"]', options.keywords, 'name');
    }

    // Open Graph meta tags
    if (options.ogType) {
      setMetaTag('meta[property="og:type"]', options.ogType, 'property');
    }
    if (options.ogUrl) {
      setMetaTag('meta[property="og:url"]', options.ogUrl, 'property');
    }
    if (options.ogTitle) {
      setMetaTag('meta[property="og:title"]', options.ogTitle, 'property');
    }
    if (options.ogDescription) {
      setMetaTag('meta[property="og:description"]', options.ogDescription, 'property');
    }
    if (options.ogImage) {
      setMetaTag('meta[property="og:image"]', options.ogImage, 'property');
    }
    if (options.ogSiteName) {
      setMetaTag('meta[property="og:site_name"]', options.ogSiteName, 'property');
    }
    if (options.ogLocale) {
      setMetaTag('meta[property="og:locale"]', options.ogLocale, 'property');
    }

    // Twitter meta tags
    if (options.twitterCard) {
      setMetaTag('meta[property="twitter:card"]', options.twitterCard, 'property');
    }
    if (options.twitterUrl) {
      setMetaTag('meta[property="twitter:url"]', options.twitterUrl, 'property');
    }
    if (options.twitterTitle) {
      setMetaTag('meta[property="twitter:title"]', options.twitterTitle, 'property');
    }
    if (options.twitterDescription) {
      setMetaTag('meta[property="twitter:description"]', options.twitterDescription, 'property');
    }
    if (options.twitterImage) {
      setMetaTag('meta[property="twitter:image"]', options.twitterImage, 'property');
    }

    // Product meta tags (for e-commerce)
    if (options.productMeta) {
      const { price, currency, availability, category } = options.productMeta;
      if (price !== undefined) {
        setMetaTag('meta[property="product:price:amount"]', String(price), 'property');
      }
      if (currency) {
        setMetaTag('meta[property="product:price:currency"]', currency, 'property');
      }
      if (availability) {
        setMetaTag('meta[property="product:availability"]', availability, 'property');
      }
      if (category) {
        setMetaTag('meta[property="product:category"]', category, 'property');
      }
    }

    // Canonical URL
    if (options.canonicalUrl) {
      setLinkTag('canonical', options.canonicalUrl);
    }

    // Favicon
    if (options.favicon) {
      setLinkTag('icon', options.favicon, 'image/png');
      // Also update apple-touch-icon if it exists
      const appleIcon = document.querySelector<HTMLLinkElement>('link[rel="apple-touch-icon"]');
      if (appleIcon) {
        appleIcon.href = options.favicon;
      }
    }

    // Store created elements for cleanup
    createdElements.current = elementsToCleanup;

    // Cleanup function - remove elements we created
    return () => {
      // Note: We don't remove elements on unmount since other components
      // may rely on them. The next component will simply update the values.
      // This is similar to how react-helmet-async works.
    };
  }, [
    options.title,
    options.description,
    options.keywords,
    options.ogType,
    options.ogUrl,
    options.ogTitle,
    options.ogDescription,
    options.ogImage,
    options.ogSiteName,
    options.ogLocale,
    options.twitterCard,
    options.twitterUrl,
    options.twitterTitle,
    options.twitterDescription,
    options.twitterImage,
    options.canonicalUrl,
    options.favicon,
    options.lang,
    options.dir,
    options.productMeta,
  ]);
}
