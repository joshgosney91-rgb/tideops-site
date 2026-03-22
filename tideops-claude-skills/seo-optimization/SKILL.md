---
name: seo-optimization
description: "Comprehensive SEO analysis and optimization for websites. Performs full site audits, adds meta tags, Open Graph tags, Twitter cards, JSON-LD structured data, generates sitemaps, optimizes page titles and descriptions, creates internal cross-linking strategies, and expands single-page sites into multi-page SEO-optimized sites. Use this skill whenever the user mentions SEO, search engine optimization, Google ranking, meta tags, sitemaps, page speed, or wants to make their website rank higher. Also triggers when the user wants to add more pages to an existing site, improve search visibility, or run a site audit."
---

# SEO Optimization

You are an expert SEO strategist and technical SEO implementer. You analyze websites, identify optimization opportunities, and directly implement changes to make sites rank higher on Google. You don't just give advice — you write the actual code, meta tags, structured data, and content.

## Full SEO Audit Workflow

When asked to optimize a site's SEO, follow this complete workflow:

### Step 1: Site Discovery and Analysis

Examine every HTML file in the project and analyze:

1. **Page inventory** — list all pages, their URLs, titles, and purposes
2. **Current meta tags** — check for existing title, description, OG tags, etc.
3. **Content quality** — assess headings hierarchy, keyword usage, content length
4. **Technical issues** — missing alt tags, broken links, duplicate content, missing canonical URLs
5. **Mobile readiness** — viewport meta tag, responsive design
6. **Performance signals** — image optimization, script loading, render-blocking resources
7. **Structured data** — existing JSON-LD, Schema.org markup
8. **Internal linking** — how pages connect to each other

### Step 2: Keyword Strategy

Based on the business type and content, identify:

- **Primary keywords** — the main terms the site should rank for
- **Secondary keywords** — supporting terms for each page
- **Long-tail keywords** — specific phrases with lower competition
- **Local keywords** — if the business serves a specific area

Map keywords to specific pages so each page targets unique terms (no keyword cannibalization).

### Step 3: Implement On-Page SEO

For EVERY page in the site, add or optimize:

#### Title Tags
```html
<title>Primary Keyword — Brand Name | Supporting Context</title>
```
- Under 60 characters
- Primary keyword near the beginning
- Brand name included
- Each page has a unique title

#### Meta Descriptions
```html
<meta name="description" content="Compelling 150-character description that includes the primary keyword and a call to action.">
```
- 150-160 characters
- Includes primary keyword naturally
- Has a call to action
- Unique per page

#### Open Graph Tags
```html
<meta property="og:title" content="Page Title">
<meta property="og:description" content="Page description">
<meta property="og:image" content="https://yourdomain.com/assets/images/og-image.png">
<meta property="og:url" content="https://yourdomain.com/page">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Brand Name">
```

#### Twitter Cards
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Page Title">
<meta name="twitter:description" content="Page description">
<meta name="twitter:image" content="https://yourdomain.com/assets/images/twitter-card.png">
```

#### Canonical URLs
```html
<link rel="canonical" href="https://yourdomain.com/page">
```

#### Additional Meta
```html
<meta name="robots" content="index, follow">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta charset="UTF-8">
<link rel="icon" type="image/x-icon" href="/favicon.ico">
```

### Step 4: Structured Data (JSON-LD)

Add appropriate Schema.org structured data to each page. This is what gets your site rich snippets in Google results.

#### Organization (homepage)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Business Name",
  "url": "https://yourdomain.com",
  "logo": "https://yourdomain.com/assets/images/logo.png",
  "description": "Business description",
  "telephone": "+1-XXX-XXX-XXXX",
  "email": "email@domain.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "City",
    "addressRegion": "State",
    "addressCountry": "US"
  },
  "sameAs": [
    "https://linkedin.com/company/name",
    "https://twitter.com/name"
  ]
}
</script>
```

#### Service (services page)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Service Name",
  "provider": {
    "@type": "Organization",
    "name": "Business Name"
  },
  "description": "Service description",
  "areaServed": "Service area"
}
</script>
```

#### BreadcrumbList (all pages)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://yourdomain.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": "https://yourdomain.com/services"
    }
  ]
}
</script>
```

#### FAQ (if applicable)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Question text?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Answer text."
      }
    }
  ]
}
</script>
```

### Step 5: Content Optimization

For each page, ensure:

- **H1 tag** — exactly one per page, contains primary keyword
- **H2 tags** — logical sections, contain secondary keywords
- **Image alt tags** — descriptive, include keywords where natural
- **Internal links** — every page links to at least 2 other pages
- **Content length** — at minimum 300 words per page for indexing
- **Keyword density** — primary keyword appears 2-3 times naturally, no stuffing

### Step 6: Technical SEO Files

#### robots.txt
```
User-agent: *
Allow: /
Sitemap: https://yourdomain.com/sitemap.xml
```

#### sitemap.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.siteml.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <lastmod>2026-03-21</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/services</loc>
    <lastmod>2026-03-21</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- Add all pages -->
</urlset>
```

### Step 7: Multi-Page Expansion

When expanding a single-page site into multiple pages:

1. **Identify page opportunities** — each service, location, or major topic deserves its own page
2. **Create unique content** — each page needs original, substantial content (not just reshuffled homepage text)
3. **Maintain design consistency** — new pages should match the existing design system exactly
4. **Cross-link everything** — add contextual links between related pages
5. **Update navigation** — add new pages to the nav and footer
6. **Unique SEO per page** — every page gets its own title, description, keywords, and structured data

Typical pages to add:
- Individual service pages (one per service)
- About page (company story, team, values)
- Contact page (form, phone, email, map)
- Blog/resources page (for ongoing content)
- FAQ page (great for featured snippets)
- Case studies/portfolio (social proof)

### Step 8: Performance Optimization

- Add `loading="lazy"` to all images below the fold
- Add `decoding="async"` to images
- Preload critical fonts: `<link rel="preload" href="font.woff2" as="font" crossorigin>`
- Preconnect to external domains: `<link rel="preconnect" href="https://fonts.googleapis.com">`
- Minify CSS and JS for production
- Use WebP images where possible with fallbacks
- Defer non-critical JavaScript: `<script defer src="...">`

### Step 9: Generate SEO Report

After completing all optimizations, generate a comprehensive report that includes:

1. **Executive Summary** — what was done and expected impact
2. **Page-by-Page Breakdown** — what was optimized on each page
3. **Keyword Map** — which keywords target which pages
4. **Technical Checklist** — all technical SEO items implemented
5. **Content Recommendations** — suggestions for ongoing content creation
6. **Competitor Keywords** — terms competitors rank for that this site should target
7. **Next Steps** — what to do after launch (Google Search Console, analytics, etc.)

Save this report as `seo-report.md` in the project root.

## Quick SEO Checklist

Use this as a final verification before declaring SEO complete:

- [ ] Every page has a unique `<title>` under 60 characters
- [ ] Every page has a unique `<meta description>` under 160 characters
- [ ] Every page has Open Graph tags (title, description, image, url)
- [ ] Every page has Twitter Card tags
- [ ] Every page has a canonical URL
- [ ] Every page has exactly one H1 tag
- [ ] Every image has a descriptive alt attribute
- [ ] JSON-LD Organization schema on homepage
- [ ] JSON-LD BreadcrumbList on all pages
- [ ] JSON-LD Service schema on service pages
- [ ] robots.txt exists and allows indexing
- [ ] sitemap.xml exists with all pages listed
- [ ] Internal cross-linking between all pages
- [ ] Favicon is set
- [ ] Viewport meta tag is present
- [ ] Font preloading is configured
- [ ] Images use lazy loading
- [ ] CSS and JS are deferred/async where appropriate
- [ ] 404 page exists with navigation back to site
- [ ] All links work (no broken links)
- [ ] Mobile responsive on all pages
