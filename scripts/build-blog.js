const fs = require('fs');
const path = require('path');

// Chemins des fichiers
const dataFile = path.join(__dirname, '../data/articles.json');
const blogTemplate = path.join(__dirname, '../blog/template.html');
const blogOutput = path.join(__dirname, '../blog/index.html');
const articlesJsOutput = path.join(__dirname, '../assets/js/articles.js');
const sitemapOutput = path.join(__dirname, '../sitemap.xml');

// 1. Charger les articles
let articles;
try {
    articles = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
} catch (err) {
    console.error('❌ Erreur lecture data/articles.json :', err);
    process.exit(1);
}

// 2. Trier par date décroissante (du plus récent au plus ancien)
articles.sort((a, b) => new Date(b.date) - new Date(a.date));

// 3. Générer les cartes HTML pour le blog
const cardsHtml = articles.map(article => {
    const dateObj = new Date(article.date);
    const formattedDate = dateObj.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return `
    <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <a href="${article.url}">
            <img src="${article.image}" alt="${article.title}" class="w-full h-48 object-cover">
        </a>
        <div class="p-6">
            <p class="text-sm text-gray-500 mb-2">${formattedDate} • <span class="text-blue-600">${article.category}</span></p>
            <h2 class="text-xl font-bold mb-3">
                <a href="${article.url}" class="text-gray-800 hover:text-blue-600 transition-colors">${article.title}</a>
            </h2>
            <p class="text-gray-600 mb-4">${article.excerpt}</p>
            <a href="${article.url}" class="text-blue-600 font-semibold hover:underline inline-flex items-center">
                Lire l'article <i class="fas fa-arrow-right ml-2 text-sm"></i>
            </a>
        </div>
    </div>
    `;
}).join('');

// 4. Générer le fichier blog/index.html à partir du template
try {
    let template = fs.readFileSync(blogTemplate, 'utf-8');
    
    if (!template.includes('{{ARTICLES}}')) {
        console.error('❌ Le template blog/template.html ne contient pas le placeholder {{ARTICLES}}');
        process.exit(1);
    }
    
    let newIndex = template.replace('{{ARTICLES}}', cardsHtml);
    fs.writeFileSync(blogOutput, newIndex);
    console.log('✅ Blog index généré avec succès');
} catch (err) {
    console.error('❌ Erreur génération blog index :', err);
    process.exit(1);
}

// 5. Générer assets/js/articles.js
const recentArticles = articles.slice(0, 10).map(article => ({
    title: article.title,
    url: article.url,
    category: article.category,
    date: article.date,
    image: article.image
}));

const jsContent = `// Fichier généré automatiquement – ne pas modifier
window.recentArticles = ${JSON.stringify(recentArticles, null, 2)};
`;

try {
    fs.writeFileSync(articlesJsOutput, jsContent);
    console.log('✅ assets/js/articles.js généré avec les 10 derniers articles (image incluse)');
} catch (err) {
    console.error('❌ Erreur génération articles.js :', err);
    process.exit(1);
}

// 6. Générer le sitemap.xml
function generateSitemap(articles) {
    const today = new Date().toISOString().split('T')[0];

    // Liste des pages statiques (inclut toutes les pages du site)
    const staticUrls = [
        { loc: '/', lastmod: today, changefreq: 'weekly', priority: 1.0 },
        { loc: '/condensateurs-electrolytiques-togo.html', lastmod: today, changefreq: 'monthly', priority: 0.8 },
        { loc: '/blog/', lastmod: today, changefreq: 'weekly', priority: 0.9 },
        { loc: '/a-propos.html', lastmod: today, changefreq: 'monthly', priority: 0.5 },
        { loc: '/contact.html', lastmod: today, changefreq: 'monthly', priority: 0.6 },
        { loc: '/conditions-utilisation.html', lastmod: today, changefreq: 'monthly', priority: 0.4 },
        { loc: '/Politique-de-confidentialit%C3%A9-TogoMicroFarad.html', lastmod: today, changefreq: 'monthly', priority: 0.4 }
    ];

    const articleUrls = articles.map(article => ({
        loc: article.url,
        lastmod: article.date,
        changefreq: 'monthly',
        priority: 0.7
    }));

    const allUrls = [...staticUrls, ...articleUrls];

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    allUrls.forEach(url => {
        xml += '  <url>\n';
        xml += `    <loc>https://togomicrofarad.com${url.loc}</loc>\n`;
        xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
        xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
        xml += `    <priority>${url.priority}</priority>\n`;
        xml += '  </url>\n';
    });

    xml += '</urlset>';
    return xml;
}

try {
    const sitemapContent = generateSitemap(articles);
    fs.writeFileSync(sitemapOutput, sitemapContent);
    console.log('✅ sitemap.xml généré avec succès');
} catch (err) {
    console.error('❌ Erreur génération sitemap.xml :', err);
    process.exit(1);
}