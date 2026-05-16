import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SEO = ({ title, description, image, article }) => {
  const { pathname } = useLocation();
  const host = typeof window !== 'undefined' ? (window.location.hostname || '').toLowerCase() : '';
  
  // -- REGLA DE SOBERANÍA RDMLS/VLS --
  const isRDMLS = host.includes('rdmls') || host.includes('rdmk') || host.includes('imls') || host.includes('rds') || (host.includes('laserena.cl') && !host.includes('vecinos') && !host.includes('prendes')) || host.includes('prendes-vls') || pathname.includes('/radio') || host.includes('localhost') || window.location.search.includes('rdmls');
  
  const siteUrl = isRDMLS ? "https://www.rdmls.cl" : "https://www.vecinoslaserena.cl";
  const defaultTitle = isRDMLS ? "Radio Digital Municipal La Serena · www.rdmls.cl" : "VLS Network · Ecosistemas Digitales";
  const fullTitle = title ? `${title} | ${isRDMLS ? 'RDMLS' : 'VLS'}` : defaultTitle;
  
  const defaultDescription = isRDMLS 
    ? "Señal oficial de la Ilustre Municipalidad de La Serena. Radio Digital Municipal La Serena (RDMLS). Transmisión 24/7." 
    : "Red de Portales Transmedia. Innovación y Soberanía Digital en La Serena y la Región de Coquimbo.";
    
  const seoDescription = description || defaultDescription;
  const defaultImage = isRDMLS ? "/rdmls_favicon.png" : "/vls-logo-3d.png";
  const seoImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : `${siteUrl}${defaultImage}`;
  
  const siteName = isRDMLS ? "Radio Digital Municipal La Serena www.rdmls.cl" : "Vecinos La Serena";
  
  // Clean pathname for canonical
  const cleanPath = pathname === '/' ? '' : pathname.replace(/\/$/, "");
  const canonicalUrl = `${siteUrl}${cleanPath}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={seoDescription} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />

      {/* Theme Color */}
      <meta name="theme-color" content="#8B1D19" />
      
      {/* Mobile Apps */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content={isRDMLS ? "RDMLS" : "VLS Network"} />
    </Helmet>
  );
};

export default SEO;
