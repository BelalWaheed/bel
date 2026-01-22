import { useDocumentMeta } from './useDocumentMeta';
import { useTranslation } from './useTranslation';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  product?: {
    price?: number;
    currency?: string;
    availability?: 'in stock' | 'out of stock';
    category?: string;
  };
}

export function useSEO() {
  const { language } = useTranslation();
  
  const SEO = ({ 
    title, 
    description, 
    keywords,
    image = '/hola-icon.png',
    url,
    type = 'website',
    product
  }: SEOProps) => {
    const siteName = 'Hola Fushion';
    const fullTitle = title ? `${title} | ${siteName}` : siteName;
    const defaultDescription = language === 'ar' 
      ? 'اكتشف أفضل المنتجات العصرية والإلكترونيات في هولا فيوجن. تسوق أحدث الصيحات مع شحن مجاني للطلبات فوق $50.'
      : 'Discover premium fashion, electronics, and lifestyle products at Hola Fushion. Shop the latest trends with free shipping on orders over $50.';
    
    // Use the native document meta hook
    useDocumentMeta({
      title: fullTitle,
      description: description || defaultDescription,
      keywords,
      lang: language,
      dir: language === 'ar' ? 'rtl' : 'ltr',
      ogType: type,
      ogUrl: url,
      ogTitle: fullTitle,
      ogDescription: description || defaultDescription,
      ogImage: image,
      ogSiteName: siteName,
      ogLocale: language === 'ar' ? 'ar_EG' : 'en_US',
      twitterCard: 'summary_large_image',
      twitterUrl: url,
      twitterTitle: fullTitle,
      twitterDescription: description || defaultDescription,
      twitterImage: image,
      canonicalUrl: url,
      favicon: '/hola-icon.png',
      productMeta: product ? {
        price: product.price,
        currency: product.currency || 'USD',
        availability: product.availability || 'in stock',
        category: product.category,
      } : undefined,
    });
    
    // Return null since we're using a hook, not rendering JSX
    return null;
  };
  
  return { SEO };
}
