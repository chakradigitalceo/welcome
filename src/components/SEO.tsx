import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
    title: string;
    description: string;
    keywords: string;
    themeColor: string;
}

const SEO = ({ title, description, keywords, themeColor }: SEOProps) => {
    const location = useLocation();

    useEffect(() => {
        // Update title
        document.title = title;

        // Update or create meta tags
        const updateMetaTag = (name: string, content: string, isProperty = false) => {
            const attribute = isProperty ? 'property' : 'name';
            let element = document.querySelector(`meta[${attribute}="${name}"]`);

            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(attribute, name);
                document.head.appendChild(element);
            }

            element.setAttribute('content', content);
        };

        // Basic SEO
        updateMetaTag('description', description);
        updateMetaTag('keywords', keywords);

        // Theme color for mobile browsers
        updateMetaTag('theme-color', themeColor);
        updateMetaTag('msapplication-TileColor', themeColor);

        // Open Graph
        updateMetaTag('og:title', title, true);
        updateMetaTag('og:description', description, true);
        updateMetaTag('og:type', 'website', true);
        updateMetaTag('og:url', `https://chakra.fin${location.pathname}`, true);

        // Twitter Card
        updateMetaTag('twitter:card', 'summary_large_image');
        updateMetaTag('twitter:title', title);
        updateMetaTag('twitter:description', description);

        // Canonical URL
        let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            document.head.appendChild(canonical);
        }
        canonical.setAttribute('href', `https://chakra.fin${location.pathname}`);

    }, [title, description, keywords, themeColor, location]);

    return null;
};

export default SEO;
