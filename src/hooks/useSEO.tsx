import { Helmet } from 'react-helmet-async';
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
    image = 'https://holafushion.com/og-image.jpg',
    url,
    type = 'website',
    product
  }: SEOProps) => {
    const siteName = 'Hola Fushion';
    const fullTitle = title ? `${title} | ${siteName}` : siteName;
    const defaultDescription = language === 'ar' 
      ? 'اكتشف أفضل المنتجات العصرية والإلكترونيات في هولا فيوجن. تسوق أحدث الصيحات مع شحن مجاني للطلبات فوق $50.'
      : 'Discover premium fashion, electronics, and lifestyle products at Hola Fushion. Shop the latest trends with free shipping on orders over $50.';
    
    return (
      <Helmet>
        {/* Primary Meta Tags */}
        <html lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'} />
        <title>{fullTitle}</title>
        <meta name="title" content={fullTitle} />
        <meta name="description" content={description || defaultDescription} />
        {keywords && <meta name="keywords" content={keywords} />}
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content={type} />
        {url && <meta property="og:url" content={url} />}
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description || defaultDescription} />
        <meta property="og:image" content={image} />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:locale" content={language === 'ar' ? 'ar_EG' : 'en_US'} />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        {url && <meta property="twitter:url" content={url} />}
        <meta property="twitter:title" content={fullTitle} />
        <meta property="twitter:description" content={description || defaultDescription} />
        <meta property="twitter:image" content={image} />
        
        {/* Product-specific meta (for e-commerce) */}
        {product && (
          <>
            <meta property="product:price:amount" content={String(product.price)} />
            <meta property="product:price:currency" content={product.currency || 'USD'} />
            <meta property="product:availability" content={product.availability || 'in stock'} />
            {product.category && <meta property="product:category" content={product.category} />}
          </>
        )}
        
        {/* Canonical URL */}
        {url && <link rel="canonical" href={url} />}
      </Helmet>
    );
  };
  
  return { SEO };
}
