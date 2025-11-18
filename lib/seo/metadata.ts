import { Metadata } from "next";

export interface PageMetadataConfig {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
  language?: "en" | "fa";
  lastModified?: Date;
  noIndex?: boolean;
}

const SITE_NAME = "Karanova - کارانوا";
const SITE_URL = "https://karanova.io";
const DEFAULT_OG_IMAGE = "/og-default.jpg";

/**
 * Generate comprehensive metadata for a page
 */
export function generatePageMetadata(config: PageMetadataConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    ogImage = DEFAULT_OG_IMAGE,
    canonical,
    language = "en",
    lastModified,
    noIndex = false,
  } = config;

  const fullTitle = `${title} | ${SITE_NAME}`;
  const canonicalUrl = canonical || SITE_URL;

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: keywords.join(", "),
    
    // Open Graph
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: language === "fa" ? "fa_IR" : "en_US",
      alternateLocale: language === "fa" ? "en_US" : "fa_IR",
      type: "website",
    },

    // Twitter Card
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },

    // Canonical and Alternates
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${SITE_URL}/en${canonical?.replace(SITE_URL, "") || ""}`,
        fa: `${SITE_URL}/fa${canonical?.replace(SITE_URL, "") || ""}`,
      },
    },

    // Robots
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };

  // Add last modified if provided
  if (lastModified) {
    metadata.other = {
      "last-modified": lastModified.toISOString(),
    };
  }

  return metadata;
}

/**
 * Generate metadata for blog posts
 */
export function generateBlogMetadata(config: {
  title: string;
  description: string;
  author: string;
  publishedDate: Date;
  modifiedDate?: Date;
  tags?: string[];
  featuredImage?: string;
  canonical?: string;
}): Metadata {
  const {
    title,
    description,
    author,
    publishedDate,
    modifiedDate,
    tags = [],
    featuredImage = DEFAULT_OG_IMAGE,
    canonical,
  } = config;

  const baseMetadata = generatePageMetadata({
    title,
    description,
    keywords: tags,
    ogImage: featuredImage,
    canonical,
    lastModified: modifiedDate || publishedDate,
  });

  return {
    ...baseMetadata,
    authors: [{ name: author }],
    openGraph: {
      ...baseMetadata.openGraph,
      type: "article",
      publishedTime: publishedDate.toISOString(),
      modifiedTime: modifiedDate?.toISOString(),
      authors: [author],
      tags,
    },
  };
}

/**
 * Generate JSON-LD structured data for organization
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Karanova",
    alternateName: "کارانوا",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      "AI-powered business management platform for project management, analytics, and automation",
    sameAs: [
      "https://linkedin.com/company/karanova",
      "https://t.me/karanova",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@karanova.io",
      contactType: "Customer Service",
    },
  };
}

/**
 * Generate JSON-LD structured data for breadcrumbs
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate JSON-LD structured data for FAQ
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate JSON-LD structured data for software product
 */
export function generateProductSchema(config: {
  name: string;
  description: string;
  url: string;
  image?: string;
  category?: string;
  offers?: {
    price?: string;
    priceCurrency?: string;
  };
}) {
  const { name, description, url, image, category, offers } = config;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url,
    image: image || `${SITE_URL}/og-default.jpg`,
    applicationCategory: category || "BusinessApplication",
    operatingSystem: "Web",
    offers: offers
      ? {
          "@type": "Offer",
          price: offers.price || "0",
          priceCurrency: offers.priceCurrency || "IRR",
        }
      : undefined,
    provider: {
      "@type": "Organization",
      name: "Karanova",
      url: SITE_URL,
    },
  };
}

/**
 * Generate JSON-LD structured data for blog article
 */
export function generateArticleSchema(config: {
  title: string;
  description: string;
  url: string;
  image?: string;
  author: string;
  publishedDate: Date;
  modifiedDate?: Date;
}) {
  const { title, description, url, image, author, publishedDate, modifiedDate } = config;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    image: image || `${SITE_URL}/og-default.jpg`,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "Karanova",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    datePublished: publishedDate.toISOString(),
    dateModified: (modifiedDate || publishedDate).toISOString(),
  };
}

/**
 * Generate JSON-LD structured data for job posting
 */
export function generateJobPostingSchema(config: {
  title: string;
  description: string;
  url: string;
  datePosted: Date;
  employmentType: string;
  location: string;
}) {
  const { title, description, url, datePosted, employmentType, location } = config;

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title,
    description,
    url,
    datePosted: datePosted.toISOString(),
    employmentType,
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: location,
        addressCountry: "IR",
      },
    },
    hiringOrganization: {
      "@type": "Organization",
      name: "Karanova",
      sameAs: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
    },
  };
}
