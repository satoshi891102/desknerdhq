#!/usr/bin/env node
// DeskNerdHQ — Static Site Generator
// Generates all HTML pages from articles and templates

const fs = require('fs');
const path = require('path');
const { articles } = require('./articles');
const { extraArticles } = require('./articles-extra');
const allArticles = [...articles, ...extraArticles];

const SITE_NAME = 'DeskNerdHQ';
const SITE_URL = 'https://desknerdhq.vercel.app';
const SITE_DESC = 'Expert-tested home office gear reviews. Standing desks, ergonomic chairs, monitors, and accessories — tested for months, not minutes.';

// Categories
const categories = [
  { slug: 'standing-desks', name: 'Standing Desks', icon: '🖥️', desc: 'Electric sit-stand desks tested for stability, motor quality, and daily use.' },
  { slug: 'chairs', name: 'Chairs', icon: '🪑', desc: 'Ergonomic office chairs from $300 budget to $2,000 flagship models.' },
  { slug: 'monitors', name: 'Monitors', icon: '🖥️', desc: 'Monitors for productivity — ultrawide, 4K, and budget picks.' },
  { slug: 'accessories', name: 'Accessories', icon: '⌨️', desc: 'Keyboards, webcams, lighting, docks, and everything else on your desk.' },
  { slug: 'ergonomics', name: 'Ergonomics', icon: '🧘', desc: 'Under-desk treadmills, footrests, and equipment that keeps your body happy.' },
  { slug: 'guides', name: 'Guides', icon: '📚', desc: 'How-to guides for building the perfect home office setup.' },
];

function header(title, description, canonicalPath) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | ${SITE_NAME}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${SITE_URL}${canonicalPath}">
  <meta property="og:title" content="${title} | ${SITE_NAME}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${SITE_URL}${canonicalPath}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${SITE_NAME}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title} | ${SITE_NAME}">
  <meta name="twitter:description" content="${description}">
  <link rel="stylesheet" href="/style.css">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🖥️</text></svg>">
</head>
<body>
  <header class="site-header">
    <div class="header-inner">
      <a href="/" class="site-logo"><span class="icon">🖥️</span> DeskNerdHQ</a>
      <nav>
        <ul class="site-nav">
          <li><a href="/standing-desks/">Desks</a></li>
          <li><a href="/chairs/">Chairs</a></li>
          <li><a href="/monitors/">Monitors</a></li>
          <li><a href="/accessories/">Accessories</a></li>
          <li><a href="/guides/">Guides</a></li>
          <li><a href="/about/">About</a></li>
        </ul>
      </nav>
    </div>
  </header>`;
}

function footer() {
  return `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="/" class="site-logo"><span class="icon">🖥️</span> DeskNerdHQ</a>
          <p>Expert-tested home office gear reviews. We buy products, test them for months, and tell you what's actually worth your money.</p>
        </div>
        <div class="footer-col">
          <h4>Categories</h4>
          <a href="/standing-desks/">Standing Desks</a>
          <a href="/chairs/">Chairs</a>
          <a href="/monitors/">Monitors</a>
          <a href="/accessories/">Accessories</a>
          <a href="/ergonomics/">Ergonomics</a>
          <a href="/guides/">Guides</a>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <a href="/about/">About Us</a>
          <a href="/methodology/">Our Testing Process</a>
          <a href="/contact/">Contact</a>
        </div>
        <div class="footer-col">
          <h4>Legal</h4>
          <a href="/privacy/">Privacy Policy</a>
          <a href="/affiliate-disclosure/">Affiliate Disclosure</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; 2026 DeskNerdHQ. All rights reserved.</span>
        <span>We may earn a commission from links on this page. <a href="/affiliate-disclosure/">Learn more</a>.</span>
      </div>
    </div>
  </footer>
</body>
</html>`;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

// ============ PAGE GENERATORS ============

function buildHomepage() {
  const latestArticles = allArticles.slice(0, 6);
  const articleCards = latestArticles.map(a => `
    <a href="/review/${a.slug}/" class="article-card">
      <div class="card-image">${a.icon}</div>
      <div class="card-body">
        <span class="card-category">${a.category}</span>
        <h3 class="card-title">${a.title}</h3>
        <p class="card-excerpt">${a.excerpt}</p>
        <div class="card-meta">
          <span>⭐ ${a.score}/10</span>
          <span>${a.readTime}</span>
          <span>${a.updated || a.date}</span>
        </div>
      </div>
    </a>`).join('\n');

  const categoryCards = categories.map(c => `
    <a href="/${c.slug}/" class="category-card">
      <div class="icon">${c.icon}</div>
      <h3>${c.name}</h3>
      <p>${c.desc}</p>
    </a>`).join('\n');

  const html = `${header('Expert Home Office Gear Reviews', SITE_DESC, '/')}
  <section class="hero">
    <div class="container">
      <h1>Home Office Gear, Actually Tested</h1>
      <p>We buy products, test them for months, and tell you what's actually worth your money. No sponsored content. No affiliate-first recommendations.</p>
      <a href="/standing-desks/" class="hero-cta">Browse Reviews →</a>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h2 class="section-title">Latest Reviews</h2>
      <p class="section-subtitle">Updated weekly with new tests and product comparisons</p>
      <div class="article-grid">
        ${articleCards}
      </div>
    </div>
  </section>

  <section class="section section-alt">
    <div class="container">
      <h2 class="section-title">Browse by Category</h2>
      <p class="section-subtitle">Find exactly what you need for your setup</p>
      <div class="category-grid">
        ${categoryCards}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="newsletter">
        <h3>Get Our Weekly Setup Newsletter</h3>
        <p>New reviews, deals, and workspace inspiration every Friday. No spam.</p>
        <div class="newsletter-form">
          <input type="email" placeholder="your@email.com">
          <button>Subscribe</button>
        </div>
      </div>
    </div>
  </section>
${footer()}`;

  ensureDir('public');
  fs.writeFileSync('public/index.html', html);
  console.log('✅ Homepage');
}

function buildArticlePages() {
  allArticles.forEach(article => {
    const dir = `public/review/${article.slug}`;
    ensureDir(dir);

    // JSON-LD structured data
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Review",
      "name": article.title,
      "description": article.metaDescription || article.excerpt,
      "datePublished": article.date,
      "dateModified": article.updated || article.date,
      "author": { "@type": "Organization", "name": "DeskNerdHQ" },
      "publisher": { "@type": "Organization", "name": "DeskNerdHQ" },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": article.score,
        "bestRating": 10,
        "worstRating": 1
      }
    };

    const html = `${header(article.title, article.metaDescription || article.excerpt, `/review/${article.slug}/`)}
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>

  <div class="with-sidebar">
    <main>
      <div class="article-header">
        <div class="breadcrumb">
          <a href="/">Home</a> → <a href="/${article.categorySlug}/">${article.category}</a> → ${article.title.split(':')[0]}
        </div>
        <h1>${article.title}</h1>
        <div class="article-meta">
          <span>By DeskNerdHQ Team</span>
          <span>Updated ${article.updated || article.date}</span>
          <span>${article.readTime}</span>
        </div>
      </div>

      <div class="article-content">
        ${article.content}
      </div>

      <div class="ad-slot ad-leaderboard">Ad Placement — Leaderboard</div>
    </main>

    <aside class="sidebar">
      <div class="sidebar-widget">
        <h4>Popular Reviews</h4>
        ${allArticles.slice(0, 5).map(a => `<a href="/review/${a.slug}/">${a.icon} ${a.title.split(':')[0]}</a>`).join('\n')}
      </div>
      <div class="sidebar-widget">
        <h4>Categories</h4>
        ${categories.map(c => `<a href="/${c.slug}/">${c.icon} ${c.name}</a>`).join('\n')}
      </div>
      <div class="ad-slot ad-medium-rect">Ad Placement</div>
    </aside>
  </div>
${footer()}`;

    fs.writeFileSync(`${dir}/index.html`, html);
    console.log(`✅ Review: ${article.slug}`);
  });
}

function buildCategoryPages() {
  categories.forEach(cat => {
    const dir = `public/${cat.slug}`;
    ensureDir(dir);

    const catArticles = allArticles.filter(a => a.categorySlug === cat.slug);
    const catArts = catArticles.length > 0 ? catArticles : allArticles.slice(0, 3);

    const articleCards = catArts.map(a => `
      <a href="/review/${a.slug}/" class="article-card">
        <div class="card-image">${a.icon}</div>
        <div class="card-body">
          <span class="card-category">${a.category}</span>
          <h3 class="card-title">${a.title}</h3>
          <p class="card-excerpt">${a.excerpt}</p>
          <div class="card-meta">
            <span>⭐ ${a.score}/10</span>
            <span>${a.readTime}</span>
          </div>
        </div>
      </a>`).join('\n');

    const html = `${header(`${cat.name} Reviews`, `${cat.desc} Expert-tested reviews from DeskNerdHQ.`, `/${cat.slug}/`)}
  <section class="section">
    <div class="container">
      <h1 class="section-title">${cat.icon} ${cat.name}</h1>
      <p class="section-subtitle">${cat.desc}</p>
      <div class="article-grid">
        ${articleCards}
      </div>
    </div>
  </section>
${footer()}`;

    fs.writeFileSync(`${dir}/index.html`, html);
    console.log(`✅ Category: ${cat.slug}`);
  });
}

function buildStaticPages() {
  // About
  ensureDir('public/about');
  fs.writeFileSync('public/about/index.html', `${header('About Us', 'DeskNerdHQ is an independent home office gear review site. We buy, test, and review products for months before recommending them.', '/about/')}
  <section class="section">
    <div class="content-container">
      <h1 class="section-title">About DeskNerdHQ</h1>
      <p>We're a small team obsessed with home office ergonomics and productivity. After spending hundreds of hours researching products for our own setups, we realized the information that actually matters — long-term durability, real-world noise levels, thermal behavior, ergonomic impact after months of use — doesn't exist in most reviews.</p>
      <p>Most review sites test products for a few days, write their impressions, and move on. We test products for months. Every standing desk goes through 500+ motor cycles. Every chair gets sat in for hundreds of hours. Every monitor stays on our desk for at least two weeks of real work.</p>
      <h2>Our Testing Philosophy</h2>
      <p><strong>We buy what we test.</strong> No manufacturer loans that get returned after a glowing review. We purchase products at retail price, use them in our actual work environments, and report honestly.</p>
      <p><strong>Time is the test.</strong> Day-one impressions are marketing. Month-three impressions are reviews. A standing desk motor that's smooth on day one but grinding on day forty-five would pass a short review. It won't pass ours.</p>
      <p><strong>We measure, not just feel.</strong> Decibel meters for noise. Digital levels for wobble. Colorimeters for monitors. Thermometers for docking stations. Subjective impressions are valuable, but they're supplemented with objective data wherever possible.</p>
      <h2>How We Make Money</h2>
      <p>We earn commissions from affiliate links. When you buy a product through our links, we receive a small percentage of the sale at no extra cost to you. This never affects our rankings — the product we recommend is the product that tested best, period. Our full policy is on our <a href="/affiliate-disclosure/">affiliate disclosure page</a>.</p>
      <p>We don't accept sponsored reviews. We don't accept payment for placement. We don't accept free products in exchange for coverage. If a company wants to send us a product, we buy our own instead.</p>
    </div>
  </section>
${footer()}`);
  console.log('✅ About');

  // Methodology
  ensureDir('public/methodology');
  fs.writeFileSync('public/methodology/index.html', `${header('Our Testing Process', 'How DeskNerdHQ tests home office products. Months of use, objective measurements, and honest reporting.', '/methodology/')}
  <section class="section">
    <div class="content-container">
      <h1 class="section-title">How We Test</h1>
      <p>Every product on DeskNerdHQ goes through a standardized testing protocol designed to reveal what short-term reviews miss.</p>
      <h2>Standing Desks</h2>
      <ul>
        <li><strong>Wobble test:</strong> 40 lbs of equipment at max height, measured lateral sway with digital level</li>
        <li><strong>Motor endurance:</strong> 500+ full-range cycles over 3 months</li>
        <li><strong>Noise measurement:</strong> Calibrated decibel meter at 3 feet during transition</li>
        <li><strong>Surface durability:</strong> 3 months of normal use — stains, scratches, heat marks</li>
        <li><strong>Assembly timing:</strong> Box-open to functional, noting confusing steps</li>
      </ul>
      <h2>Ergonomic Chairs</h2>
      <ul>
        <li><strong>Comfort assessment:</strong> 8+ hour daily sessions for minimum 2 weeks</li>
        <li><strong>Adjustment range:</strong> Every control tested, range measured</li>
        <li><strong>Build quality:</strong> Materials, hardware, cushion compression over time</li>
        <li><strong>Support effectiveness:</strong> Back, neck, and arm fatigue compared to baseline</li>
      </ul>
      <h2>Monitors</h2>
      <ul>
        <li><strong>Color accuracy:</strong> Colorimeter measurement (Delta E)</li>
        <li><strong>Brightness uniformity:</strong> 9-point measurement across panel</li>
        <li><strong>Text clarity:</strong> Subpixel rendering assessment at typical viewing distance</li>
        <li><strong>Eye comfort:</strong> Extended reading sessions (4+ hours) noting fatigue</li>
      </ul>
      <h2>Accessories</h2>
      <ul>
        <li><strong>Keyboards:</strong> Decibel measurement, key feel assessment over 100K+ keystrokes</li>
        <li><strong>Webcams:</strong> Image quality in good, average, and poor lighting</li>
        <li><strong>Docking stations:</strong> Thermal measurement, sleep/wake reliability, multi-monitor support</li>
      </ul>
      <p>All measurements are taken with calibrated instruments. All subjective assessments involve multiple team members to control for personal preference.</p>
    </div>
  </section>
${footer()}`);
  console.log('✅ Methodology');

  // Contact
  ensureDir('public/contact');
  fs.writeFileSync('public/contact/index.html', `${header('Contact Us', 'Get in touch with the DeskNerdHQ team.', '/contact/')}
  <section class="section">
    <div class="content-container">
      <h1 class="section-title">Contact Us</h1>
      <p>Have a question about a product? Want to suggest something for us to test? Found an error in a review? We'd love to hear from you.</p>
      <p><strong>Email:</strong> hello@desknerdhq.com</p>
      <p><strong>Response time:</strong> We aim to respond within 48 hours. Review-related questions get priority.</p>
      <h2>For Manufacturers</h2>
      <p>We don't accept sponsored reviews or payment for coverage. If you'd like us to consider your product for testing, we'll purchase it at retail price. You can send product information to the email above, and we'll evaluate whether it fits our testing pipeline.</p>
      <h2>Corrections</h2>
      <p>If you've found an error in any of our reviews — pricing, specifications, broken links — please email us. We take accuracy seriously and will correct verified errors within 24 hours.</p>
    </div>
  </section>
${footer()}`);
  console.log('✅ Contact');

  // Privacy
  ensureDir('public/privacy');
  fs.writeFileSync('public/privacy/index.html', `${header('Privacy Policy', 'DeskNerdHQ privacy policy. How we handle your data.', '/privacy/')}
  <section class="section">
    <div class="content-container">
      <h1 class="section-title">Privacy Policy</h1>
      <p><em>Last updated: February 13, 2026</em></p>
      <h2>What We Collect</h2>
      <p>We use privacy-respecting analytics to understand how visitors use our site. We collect: pages visited, approximate location (country-level), device type, and referral source. We do not collect personally identifiable information unless you voluntarily provide it (e.g., newsletter signup).</p>
      <h2>Cookies</h2>
      <p>We use essential cookies for site functionality and analytics cookies to understand traffic patterns. We do not use tracking cookies for advertising purposes.</p>
      <h2>Affiliate Links</h2>
      <p>When you click an affiliate link, the destination site (Amazon, manufacturer, etc.) may set their own cookies. Their privacy policies apply to those interactions, not ours. We receive only: that a purchase was made through our link, the product category, and the commission amount. We never receive your name, address, or payment information.</p>
      <h2>Newsletter</h2>
      <p>If you subscribe to our newsletter, we store your email address to send you content. You can unsubscribe at any time via the link in every email. We never sell or share email addresses.</p>
      <h2>Contact</h2>
      <p>Questions about this policy? Email hello@desknerdhq.com.</p>
    </div>
  </section>
${footer()}`);
  console.log('✅ Privacy');

  // Affiliate Disclosure
  ensureDir('public/affiliate-disclosure');
  fs.writeFileSync('public/affiliate-disclosure/index.html', `${header('Affiliate Disclosure', 'How DeskNerdHQ earns money through affiliate partnerships.', '/affiliate-disclosure/')}
  <section class="section">
    <div class="content-container">
      <h1 class="section-title">Affiliate Disclosure</h1>
      <p>DeskNerdHQ is reader-supported. When you buy through links on our site, we may earn an affiliate commission at no additional cost to you.</p>
      <h2>How It Works</h2>
      <p>We partner with retailers like Amazon, FlexiSpot, Autonomous, Secretlab, and others. When you click a product link on our site and make a purchase, the retailer pays us a small commission (typically 3-8% of the purchase price). This cost is absorbed by the retailer — you pay the same price whether you use our link or go directly to the store.</p>
      <h2>Our Promise</h2>
      <p><strong>Affiliate partnerships never influence our rankings.</strong> Our top pick is always the product that performed best in our testing. We've recommended products that have lower affiliate commissions over products with higher commissions because the lower-commission product was genuinely better. Revenue is important to sustain this site, but trust is more important.</p>
      <p><strong>We disclose all affiliate relationships.</strong> Every page with affiliate links includes a notice. We believe in full transparency about how we make money.</p>
      <p><strong>We buy our own test products.</strong> Even when manufacturers offer to send free review units, we purchase at retail price. This ensures our testing is independent from the start.</p>
      <h2>FTC Compliance</h2>
      <p>This disclosure is provided in accordance with the Federal Trade Commission's guidelines on endorsements and testimonials. If you have questions, contact us at hello@desknerdhq.com.</p>
    </div>
  </section>
${footer()}`);
  console.log('✅ Affiliate Disclosure');
}

function buildSitemap() {
  const urls = [
    { loc: '/', priority: '1.0', changefreq: 'daily' },
    { loc: '/about/', priority: '0.5', changefreq: 'monthly' },
    { loc: '/methodology/', priority: '0.5', changefreq: 'monthly' },
    { loc: '/contact/', priority: '0.3', changefreq: 'yearly' },
    { loc: '/privacy/', priority: '0.2', changefreq: 'yearly' },
    { loc: '/affiliate-disclosure/', priority: '0.2', changefreq: 'yearly' },
  ];

  categories.forEach(c => {
    urls.push({ loc: `/${c.slug}/`, priority: '0.8', changefreq: 'weekly' });
  });

  allArticles.forEach(a => {
    urls.push({ loc: `/review/${a.slug}/`, priority: '0.9', changefreq: 'weekly' });
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${SITE_URL}${u.loc}</loc>
    <lastmod>2026-02-13</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync('public/sitemap.xml', xml);
  console.log('✅ Sitemap');

  fs.writeFileSync('public/robots.txt', `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml`);
  console.log('✅ Robots.txt');
}

// ============ BUILD ============

console.log('🏗️  Building DeskNerdHQ...\n');

buildHomepage();
buildArticlePages();
buildCategoryPages();
buildStaticPages();
buildSitemap();

// Count pages
const countFiles = (dir) => {
  let count = 0;
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    if (item.isDirectory()) count += countFiles(path.join(dir, item.name));
    else if (item.name.endsWith('.html')) count++;
  }
  return count;
};

const totalPages = countFiles('public');
const totalSize = (() => {
  let size = 0;
  const walk = (dir) => {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const p = path.join(dir, item.name);
      if (item.isDirectory()) walk(p);
      else size += fs.statSync(p).size;
    }
  };
  walk('public');
  return size;
})();

console.log(`\n✅ Build complete!`);
console.log(`📄 ${totalPages} HTML pages`);
console.log(`📦 ${(totalSize / 1024).toFixed(0)}KB total`);
console.log(`🌐 ${allArticles.length} review articles`);
console.log(`📂 ${categories.length} category pages`);
