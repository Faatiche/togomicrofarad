// ============================================
// MENU BURGER - GESTION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOverlay = document.getElementById('menu-overlay');
    const hamburger = document.querySelector('.hamburger');
    const menuLinks = document.querySelectorAll('.mobile-nav-link');
    
    // Fonction pour ouvrir le menu
    function openMenu() {
        mobileMenu.classList.add('active');
        menuOverlay.classList.add('active');
        hamburger.classList.add('active');
        document.body.classList.add('menu-open');
    }
    
    // Fonction pour fermer le menu
    function closeMenu() {
        mobileMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
    
    // Toggle du menu au clic sur le bouton burger
    if (menuBtn) {
        menuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            if (mobileMenu.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }
    
    // Fermer le menu au clic sur l'overlay
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMenu);
    }
    
    // Fermer le menu au clic sur un lien
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });
    
    // Fermer le menu avec la touche Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMenu();
        }
    });
    
    console.log('Menu burger initialisé ✓');
});

// bouton nous contacter de la section contact
function redirectToWhatsApp() {
    const phoneNumber = "22893602926";
    const message = "Bonjour, je suis intéressé par vos condensateurs électrolytiques";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
}

document.addEventListener("DOMContentLoaded", () => {

  // animation container hero
  const hero = document.getElementById("hero");
  if (hero) {
    requestAnimationFrame(() => {
      hero.classList.remove("opacity-0", "translate-y-4");
    });
  }

  // animation text + buttons hero
  const elements = [
    document.getElementById("hero-title"),
    document.getElementById("hero-subtitle"),
    document.getElementById("hero-buttons")
  ];

  elements.forEach((el, index) => {
    if (!el) return;

    setTimeout(() => {
      el.classList.remove("opacity-0", "-translate-x-10");
    }, 500 + index * 250); 
    // délai 500ms pour attendre l'apparition du hero
  });

});

// animation section produit au scroll
document.addEventListener("DOMContentLoaded", () => {
    const featureItems = document.querySelectorAll(".feature-item");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.remove("opacity-0", "translate-y-6");
                observer.unobserve(entry.target); // on l'anime une fois
            }
        });
    }, {
        threshold: 0.2
    });

    featureItems.forEach((item) => observer.observe(item));
});

document.addEventListener("DOMContentLoaded", () => {
    const productCards = document.querySelectorAll(".product-card");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.remove("opacity-0", "translate-y-8");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    productCards.forEach(card => observer.observe(card));
});

// effet au survol des sections contact, application et footer
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  elements.forEach(el => observer.observe(el));
});

// animation NB page produit
document.addEventListener("DOMContentLoaded", () => {
  const title = document.getElementById("hero-title");
  if (!title) return;

  // Forcer le repaint puis supprimer les classes d'état initial
  requestAnimationFrame(() => {
    // retire les classes utilitaires Tailwind si tu les avais ajoutées :
    title.classList.remove("opacity-0", "-translate-x-10");
    // optionnel : si tu veux forcer le rendu final immédiatement
    // title.classList.add("revealed");
  });
});

// ============================================
// GESTION DU PANIER
// ============================================

let panier = [];

// Fonction pour charger le panier depuis sessionStorage
function chargerPanier() {
    const panierSauvegarde = sessionStorage.getItem('togomicrofarad_panier');
    if (panierSauvegarde) {
        try {
            panier = JSON.parse(panierSauvegarde);
            console.log('Panier chargé:', panier.length, 'articles');
        } catch (e) {
            console.error('Erreur chargement panier:', e);
            panier = [];
        }
    } else {
        panier = [];
    }
    mettreAJourCompteur();
}

// Fonction pour sauvegarder le panier dans sessionStorage
function sauvegarderPanier() {
    try {
        sessionStorage.setItem('togomicrofarad_panier', JSON.stringify(panier));
        console.log('Panier sauvegardé:', panier.length, 'articles');
    } catch (e) {
        console.error('Erreur sauvegarde panier:', e);
    }
}

// Fonction pour afficher un toast de notification
function afficherToast(message, type = 'success') {
    let toastContainer = document.getElementById('toast-container');
    
    // Créer le container s'il n'existe pas
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.className = 'fixed bottom-5 right-5 flex flex-col gap-2 z-50';
        document.body.appendChild(toastContainer);
    }
    
    const toast = document.createElement('div');
    toast.className = `toast bg-${type === 'success' ? 'green' : 'red'}-500 text-white px-6 py-3 rounded-lg shadow-lg`;
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease-in-out';
    
    toast.innerHTML = `
        <div class="flex items-center gap-3">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Animation d'entrée
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
    }, 10);
    
    // Retrait automatique après 3 secondes
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 300);
    }, 3000);
}

// Fonction pour mettre à jour le compteur du panier
function mettreAJourCompteur() {
    const cartCount = document.getElementById('cart-count');
    if (!cartCount) return;
    
    const totalArticles = panier.reduce((total, item) => total + item.quantite, 0);
    cartCount.textContent = totalArticles;
}

// Fonction pour calculer le total du panier
function calculerTotal() {
    return panier.reduce((total, item) => total + item.prixTotal, 0);
}

// Fonction pour ajouter un article au panier
function ajouterAuPanier(nom, tension, temperature, quantite, prix) {
    // Vérifier si l'article existe déjà
    const indexExistant = panier.findIndex(item => 
        item.nom === nom && item.tension === tension && item.temperature === temperature
    );
    
    const qte = parseInt(quantite);
    const prixTotal = parseInt(prix);
    
    if (indexExistant !== -1) {
        // Augmenter la quantité si l'article existe déjà
        panier[indexExistant].quantite += qte;
        panier[indexExistant].prixTotal += prixTotal;
    } else {
        // Ajouter un nouvel article
        panier.push({
            nom: nom,
            tension: tension,
            temperature: temperature,
            quantite: qte,
            prixTotal: prixTotal
        });
    }
    
    // Sauvegarder le panier
    sauvegarderPanier();
    
    // Afficher le toast de confirmation
    afficherToast(`✓ ${nom} ajouté au panier (${qte} unité${qte > 1 ? 's' : ''})`, 'success');
    
    mettreAJourCompteur();
    afficherPanier(); // Met à jour l'affichage du dropdown si ouvert
}

// Fonction pour supprimer un article du panier
function supprimerDuPanier(index) {
    if (index < 0 || index >= panier.length) return;
    
    const article = panier[index];
    panier.splice(index, 1);
    
    // Sauvegarder le panier
    sauvegarderPanier();
    
    afficherToast(`${article.nom} supprimé du panier`, 'success');
    
    mettreAJourCompteur();
    afficherPanier();
}

// Fonction pour afficher le contenu du panier
function afficherPanier() {
    let cartDropdown = document.getElementById('cart-dropdown');
    
    // Créer le dropdown s'il n'existe pas (pour produits.html)
    if (!cartDropdown) {
        const cartBtn = document.getElementById('cart-btn');
        if (!cartBtn) return;
        
        cartDropdown = document.createElement('div');
        cartDropdown.id = 'cart-dropdown';
        cartDropdown.className = 'hidden absolute right-0 mt-2 w-80 max-w-sm bg-white text-gray-800 rounded-lg shadow-2xl overflow-hidden border border-gray-200 z-50';
        cartBtn.parentElement.appendChild(cartDropdown);
    }
    
    if (panier.length === 0) {
        cartDropdown.innerHTML = `
            <div class="p-6 text-center text-gray-500">
                <i class="fas fa-shopping-cart text-4xl mb-3 opacity-30"></i>
                <p>Votre panier est vide</p>
            </div>
        `;
        return;
    }
    
    let html = '<div class="max-h-96 overflow-y-auto p-4">';
    
    panier.forEach((item, index) => {
        html += `
            <div class="border-b border-gray-200 pb-3 mb-3 last:border-b-0">
                <div class="flex justify-between items-start mb-2">
                    <div class="flex-1">
                        <h4 class="font-bold text-sm text-gray-800">${item.nom}</h4>
                        <p class="text-xs text-gray-600">Tension: ${item.tension}</p>
                        <p class="text-xs text-gray-600">Temp: ${item.temperature}</p>
                        <p class="text-xs text-gray-600">Quantité: ${item.quantite}</p>
                    </div>
                    <button onclick="supprimerDuPanier(${index})" 
                            class="text-red-500 hover:text-red-700 ml-2 hover:scale-[1.03] transition-all duration-300 ease-in-out "
                            style="cursor: pointer;">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <div class="flex justify-end items-center">
                    <span class="font-bold text-blue-600">${item.prixTotal} FCFA</span>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    
    // Ajouter le total et le bouton WhatsApp
    const total = calculerTotal();
    html += `
        <div class="border-t border-gray-300 p-4 bg-gray-50">
            <div class="flex justify-between items-center mb-3">
                <span class="font-bold text-lg">Total:</span>
                <span class="font-bold text-xl text-blue-600">${total} FCFA</span>
            </div>
            <button onclick="finaliserAchatWhatsApp()" 
                    class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2"
                    style="cursor: pointer;">
                <i class="fab fa-whatsapp text-xl"></i>
                Finaliser via WhatsApp
            </button>
        </div>
    `;
    
    cartDropdown.innerHTML = html;
}

// Fonction pour finaliser l'achat via WhatsApp
function finaliserAchatWhatsApp() {
    console.log('Finalisation WhatsApp');
    
    if (panier.length === 0) {
        afficherToast('Votre panier est vide', 'error');
        return;
    }
    
    let message = '🛒 *Commande TogoMicroFarad*\n\n';
    
    panier.forEach((item, index) => {
        message += `${index + 1}. *${item.nom}*\n`;
        message += `   • Tension: ${item.tension}\n`;
        message += `   • Température: ${item.temperature}\n`;
        message += `   • Quantité: ${item.quantite}\n`;
        message += `   • Prix: ${item.prixTotal} FCFA\n\n`;
    });
    
    const total = calculerTotal();
    message += `*TOTAL: ${total} FCFA*\n\n`;
    message += 'Je souhaite finaliser cette commande. Merci !';
    
    const numeroWhatsApp = '22893602926';
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(message)}`;
    
    window.open(urlWhatsApp, '_blank');
}

// Fonction pour vider le panier
function viderPanier() {
    panier = [];
    sessionStorage.removeItem('togomicrofarad_panier');
    mettreAJourCompteur();
}

// Fonction pour initialiser le panier
function initialiserPanier() {
    const cartBtn = document.getElementById('cart-btn');
    const cartContainer = document.getElementById('cart-container');
    
    if (!cartBtn) {
        console.error('Bouton panier non trouvé');
        return;
    }
    
    // Créer le dropdown s'il n'existe pas
    let cartDropdown = document.getElementById('cart-dropdown');
    if (!cartDropdown) {
        cartDropdown = document.createElement('div');
        cartDropdown.id = 'cart-dropdown';
        
        // Classes responsive
        if (window.innerWidth < 640) {
            cartDropdown.className = 'hidden fixed top-16 left-2 right-2 w-auto bg-white text-gray-800 rounded-lg shadow-2xl overflow-hidden border border-gray-200 z-[9999]';
        } else {
            cartDropdown.className = 'hidden absolute right-0 mt-2 w-80 max-w-sm bg-white text-gray-800 rounded-lg shadow-2xl overflow-hidden border border-gray-200 z-50';
        }
        
        if (cartContainer) {
            cartContainer.appendChild(cartDropdown);
        } else {
            const wrapper = document.createElement('div');
            wrapper.className = 'relative';
            cartBtn.parentNode.insertBefore(wrapper, cartBtn);
            wrapper.appendChild(cartBtn);
            wrapper.appendChild(cartDropdown);
        }
    }
    
    // Créer l'overlay pour mobile
    let cartOverlay = document.getElementById('cart-overlay');
    if (!cartOverlay) {
        cartOverlay = document.createElement('div');
        cartOverlay.id = 'cart-overlay';
        cartOverlay.className = 'cart-overlay';
        document.body.appendChild(cartOverlay);
    }
    
    // Fonction pour ouvrir le panier
    function openCart() {
        cartDropdown.classList.remove('hidden');
        
        // Sur mobile, ajouter l'overlay et bloquer le scroll
        if (window.innerWidth < 640) {
            cartOverlay.classList.add('active');
            document.body.classList.add('cart-open');
            cartDropdown.classList.add('show-mobile');
        }
        
        afficherPanier();
    }
    
    // Fonction pour fermer le panier
    function closeCart() {
        cartDropdown.classList.add('hidden');
        
        // Sur mobile, retirer l'overlay et débloquer le scroll
        if (window.innerWidth < 640) {
            cartOverlay.classList.remove('active');
            document.body.classList.remove('cart-open');
            cartDropdown.classList.remove('show-mobile');
        }
    }
    
    // Écouter les clics sur le bouton panier
    cartBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        console.log('Clic sur panier');
        
        const isHidden = cartDropdown.classList.contains('hidden');
        
        if (isHidden) {
            openCart();
        } else {
            closeCart();
        }
    });
    
    // Fermer le panier en cliquant sur l'overlay
    cartOverlay.addEventListener('click', closeCart);
    
    // Empêcher la fermeture du dropdown en cliquant dedans
    cartDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Fermer le dropdown en cliquant ailleurs
    document.addEventListener('click', function(e) {
        if (!cartBtn.contains(e.target) && !cartDropdown.contains(e.target)) {
            closeCart();
        }
    });
    
    // Gérer le redimensionnement de la fenêtre
    window.addEventListener('resize', function() {
        if (!cartDropdown.classList.contains('hidden')) {
            // Réappliquer les classes appropriées
            if (window.innerWidth < 640) {
                cartOverlay.classList.add('active');
                document.body.classList.add('cart-open');
            } else {
                cartOverlay.classList.remove('active');
                document.body.classList.remove('cart-open');
            }
        }
    });
    
    // Fermer avec la touche Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !cartDropdown.classList.contains('hidden')) {
            closeCart();
        }
    });
    
    console.log('Panier initialisé avec support responsive ✓');
}

// ============================================
// MENU DÉROULANT ARTICLES (corrigé pour utiliser window.recentArticles)
// ============================================

// Fonction utilitaire pour formater la date (si non définie ailleurs)
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
}

// Initialisation du dropdown des articles
function initArticlesDropdown() {
    console.log('📌 initArticlesDropdown appelée');
    const dropdown = document.getElementById('articles-dropdown-desktop');
    if (!dropdown) {
        console.log('ℹ️ Pas de dropdown articles sur cette page');
        return;
    }

    // Vérifier que la variable globale 'recentArticles' existe (générée par articles.js)
    if (typeof window.recentArticles === 'undefined' || !Array.isArray(window.recentArticles)) {
        console.warn('⚠️ Liste des articles non disponible pour le dropdown.');
        dropdown.innerHTML = '<div class="p-4 text-center text-gray-500">Aucun article pour le moment</div>';
        return;
    }

    // Trier par date (du plus récent au plus ancien) et garder les 5 premiers
    const recentArticles = [...window.recentArticles]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        // .slice(0, 5);

    if (recentArticles.length === 0) {
        dropdown.innerHTML = '<div class="p-4 text-center text-gray-500">Aucun article pour le moment</div>';
        return;
    }

    // Vider le dropdown
    dropdown.innerHTML = '';

    // Ajouter chaque article
    recentArticles.forEach(article => {
        const link = document.createElement('a');
        link.href = article.url;
        link.className = 'block px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0';
        link.innerHTML = `
            <div class="font-medium text-gray-800 hover:text-blue-600">${article.title}</div>
            <div class="text-xs text-gray-500 mt-1">${article.category} · ${formatDate(article.date)}</div>
        `;
        dropdown.appendChild(link);
    });

    // Ajouter le lien "Tous les articles"
    const viewAll = document.createElement('a');
    viewAll.href = '/blog/'; 
    viewAll.className = 'block px-4 py-3 text-center text-blue-600 font-semibold hover:bg-blue-50 rounded-b-lg';
    viewAll.textContent = 'Tous les articles →';
    dropdown.appendChild(viewAll);
}

// ============================================
// NEWSLETTER - AMÉLIORATIONS UX
// ============================================

document.addEventListener("DOMContentLoaded", function() {
    const submitBtn = document.getElementById("submitBtn");
    const emailInput = document.getElementById("email");
    const messageEl = document.getElementById("message");
    const url = "https://script.google.com/macros/s/AKfycbw-zzFBA3teeCoS7jq9VcBe8cKH38bYO_LhGwl6X95ekGphd-CTOcFx4Mvn8Q70Vpe5/exec";
    
    // Variable pour gérer le timeout des messages
    let messageTimeout = null;

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Fonction principale d'envoi
    async function handleSubmit(e) {
        if (e) e.preventDefault();
        
        const email = emailInput.value.trim();
        
        // Validation de l'email
        if (!email) {
            showMessage("📧 Veuillez entrer votre email.", "text-yellow-500", 3000);
            emailInput.focus();
            return;
        }
        
        if (!isValidEmail(email)) {
            showMessage("❌ Format d'email invalide.", "text-red-500", 3000);
            // Animation de secousse pour l'input
            emailInput.classList.add('shake-animation');
            setTimeout(() => {
                emailInput.classList.remove('shake-animation');
            }, 500);
            emailInput.focus();
            return;
        }

        // Désactivation du bouton et de l'input
        submitBtn.disabled = true;
        emailInput.disabled = true;
        submitBtn.classList.add("opacity-50", "cursor-not-allowed");
        emailInput.classList.add("opacity-75");
        
        // Animation du bouton
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin text-white"></i>';
        
        showMessage("📤 Envoi en cours...", "text-blue-400");

        try {
            const response = await fetch(url + "?email=" + encodeURIComponent(email), {
                method: "GET"
            });
            await response.text();
            
            // Succès
            showMessage("✅ Merci pour votre inscription !", "text-green-500", 4000);
            emailInput.value = "";
            
            // Animation de succès
            submitBtn.innerHTML = '<i class="fas fa-check text-white"></i>';
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-paper-plane text-white"></i>';
            }, 2000);
            
        } catch (err) {
            // Erreur
            showMessage("❌ Une erreur est survenue. Réessayez.", "text-red-500", 4000);
            console.error(err);
            
            // Animation d'erreur
            submitBtn.innerHTML = '<i class="fas fa-times text-white"></i>';
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-paper-plane text-white"></i>';
            }, 2000);
        } finally {
            // Réactivation du bouton et de l'input
            setTimeout(() => {
                submitBtn.disabled = false;
                emailInput.disabled = false;
                submitBtn.classList.remove("opacity-50", "cursor-not-allowed");
                emailInput.classList.remove("opacity-75");
            }, 1000);
        }
    }

    // Événement au clic sur le bouton
    if (submitBtn) {
        submitBtn.addEventListener("click", handleSubmit);
    }

    // Soumission avec la touche Entrée
    if (emailInput) {
        emailInput.addEventListener("keypress", function(e) {
            if (e.key === "Enter") {
                handleSubmit(e);
            }
        });
    }

    // Validation en temps réel pendant la saisie
    if (emailInput) {
        emailInput.addEventListener("input", function() {
            const email = emailInput.value.trim();
            
            // Effacer le message d'erreur pendant la saisie
            if (messageEl && (messageEl.classList.contains('text-red-500') || 
                messageEl.classList.contains('text-yellow-500'))) {
                hideMessage();
            }
            
            // Changer la bordure de l'input selon la validité
            if (email.length > 0) {
                if (isValidEmail(email)) {
                    emailInput.classList.remove('border-red-500');
                    emailInput.classList.add('border-green-500');
                } else {
                    emailInput.classList.remove('border-green-500');
                    emailInput.classList.add('border-red-500');
                }
            } else {
                emailInput.classList.remove('border-green-500', 'border-red-500');
            }
        });
    }

    // Focus sur l'input au clic sur le conteneur
    const newsletterContainer = emailInput ? emailInput.closest('.max-w-md') : null;
    if (newsletterContainer) {
        newsletterContainer.addEventListener('click', function(e) {
            if (e.target === newsletterContainer || e.target.tagName === 'P' || e.target.tagName === 'H3') {
                emailInput.focus();
            }
        });
    }

    // Fonction d'affichage des messages avec timeout automatique
    function showMessage(text, colorClass, duration = null) {
        if (!messageEl) return;
        // Annuler le timeout précédent s'il existe
        if (messageTimeout) {
            clearTimeout(messageTimeout);
        }

        messageEl.textContent = text;
        messageEl.className = `mt-2 text-center ${colorClass} opacity-100 transition-opacity duration-500 font-medium`;
        
        // Si une durée est spécifiée, masquer automatiquement après ce délai
        if (duration) {
            messageTimeout = setTimeout(() => {
                hideMessage();
            }, duration);
        }
    }

    function hideMessage() {
        if (!messageEl) return;
        messageEl.classList.remove("opacity-100");
        messageEl.classList.add("opacity-0");
        
        // Nettoyer le timeout
        if (messageTimeout) {
            clearTimeout(messageTimeout);
            messageTimeout = null;
        }
    }
});

// ============================================
// CAROUSEL
// ============================================
// (géré dans le bloc principal DOMContentLoaded)

// ============================================
// SYSTÈME DE FILTRES (page catalogue)
// ============================================
(function() {
    // Variables pour stocker les filtres actifs
    let filtreCapacite = 'tous';
    let filtreTension = 'tous';

    // Fonction pour extraire la capacité d'un nom de produit
    function extraireCapacite(nom) {
        // Cherche un nombre suivi de µF ou μF
        const match = nom.match(/(\d+\.?\d*)\s*[µμ]F/i);
        if (match) {
            return parseFloat(match[1]);
        }
        return null;
    }

    // Fonction pour extraire la tension d'un élément
    function extraireTension(element) {
        const tensionText = element.querySelector('p')?.textContent || '';
        const match = tensionText.match(/Tension:\s*(\d+)V/i);
        if (match) {
            return parseInt(match[1]);
        }
        return null;
    }

    // Fonction pour filtrer les produits
    function filtrerProduits() {
        const cards = document.querySelectorAll('.product-card');
        let count = 0;

        cards.forEach(card => {
            const nomProduit = card.querySelector('h3')?.textContent || '';
            const capacite = extraireCapacite(nomProduit);
            const tension = extraireTension(card);
            
            let afficherCapacite = false;
            let afficherTension = false;

            // Logique de filtre par capacité
            if (filtreCapacite === 'tous') {
                afficherCapacite = true;
            } else if (filtreCapacite === '0.1') {
                afficherCapacite = capacite >= 0.1 && capacite <= 1;
            } else if (filtreCapacite === '2.2') {
                afficherCapacite = capacite >= 2.2 && capacite <= 10;
            } else if (filtreCapacite === '22') {
                afficherCapacite = capacite >= 22 && capacite <= 47;
            } else if (filtreCapacite === '100') {
                afficherCapacite = capacite >= 100 && capacite <= 470;
            } else if (filtreCapacite === '680') {
                afficherCapacite = capacite >= 680 && capacite <= 1000;
            }

            // Logique de filtre par tension
            if (filtreTension === 'tous') {
                afficherTension = true;
            } else {
                afficherTension = tension === parseInt(filtreTension);
            }

            // Afficher ou cacher la carte avec animation
            if (afficherCapacite && afficherTension) {
                card.style.display = '';
                // Réappliquer l'animation d'apparition
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
                count++;
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });

        // Mettre à jour le compteur
        const resultsCount = document.getElementById('resultsCount');
        if (resultsCount) {
            resultsCount.textContent = count;
        }

        // Afficher le message si aucun résultat
        const noResults = document.getElementById('noResults');
        if (noResults) {
            if (count === 0) {
                noResults.classList.remove('hidden');
            } else {
                noResults.classList.add('hidden');
            }
        }
    }

    // Initialisation quand le DOM est chargé
    document.addEventListener('DOMContentLoaded', function() {
        // Gestion des filtres de capacité
        document.querySelectorAll('.capacite-filter').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.capacite-filter').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                filtreCapacite = this.dataset.capacite;
                filtrerProduits();
            });
        });

        // Gestion des filtres de tension
        document.querySelectorAll('.tension-filter').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.tension-filter').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                filtreTension = this.dataset.tension;
                filtrerProduits();
            });
        });

        // Bouton de réinitialisation
        const resetBtn = document.getElementById('resetFilters');
        if (resetBtn) {
            resetBtn.addEventListener('click', function() {
                filtreCapacite = 'tous';
                filtreTension = 'tous';
                
                document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                const capaciteTous = document.querySelector('[data-capacite="tous"]');
                const tensionTous = document.querySelector('[data-tension="tous"]');
                if (capaciteTous) capaciteTous.classList.add('active');
                if (tensionTous) tensionTous.classList.add('active');
                
                filtrerProduits();
            });
        }

        // Animation d'apparition de la section de filtres
        setTimeout(() => {
            const filterSection = document.querySelector('.filter-section');
            if (filterSection) {
                filterSection.style.opacity = '1';
                filterSection.style.transform = 'translateY(0)';
            }
        }, 100);
    });
})();

// ============================================
// GESTION DES ÉVÉNEMENTS GA4
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Sélectionne tous les boutons
    const boutons = document.querySelectorAll('button');

    boutons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        // Récupérer un identifiant ou texte du bouton
        let btnName = btn.getAttribute('id') || btn.innerText || 'bouton_sans_id';

        // Envoyer l'événement à GA4 (si gtag est défini)
        if (typeof gtag === 'function') {
            gtag('event', 'click_bouton', {
              'nom_bouton': btnName,
              'page': window.location.pathname
            });
        }

        console.log('Événement GA4 envoyé pour :', btnName);
      });
    });
});

// ============================================
// INITIALISATION PRINCIPALE
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script chargé - TogoMicroFarad');
    
    // IMPORTANT: Charger le panier depuis sessionStorage
    chargerPanier();
    
    // Initialiser le panier
    initialiserPanier();
    
    // Ajouter des écouteurs sur tous les boutons "Ajouter"
    const boutonsAjouter = document.querySelectorAll('.btn-shine');
    console.log(`${boutonsAjouter.length} boutons trouvés`);
    
    boutonsAjouter.forEach((button, idx) => {
        const nom = button.getAttribute('data-nom');
        const tension = button.getAttribute('data-tension');
        const temperature = button.getAttribute('data-temperature');
        const quantite = button.getAttribute('data-quantite');
        const prix = button.getAttribute('data-prix');
        
        if (idx < 3) { // Log seulement les 3 premiers
            console.log(`Bouton ${idx}:`, {nom, tension, temperature, quantite, prix});
        }
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (nom && tension && temperature && quantite && prix) {
                ajouterAuPanier(nom, tension, temperature, quantite, prix);
            } else {
                console.error('Données manquantes:', {nom, tension, temperature, quantite, prix});
            }
        });
    });
    
    // Animations au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    // Observer les éléments pour les animations
    document.querySelectorAll('.feature-item, .product-card, .reveal').forEach(el => {
        observer.observe(el);
    });
    
    // Animation du hero au chargement (seulement si les éléments existent)
    setTimeout(() => {
        const hero = document.getElementById('hero');
        const heroTitle = document.getElementById('hero-title');
        const heroSubtitle = document.getElementById('hero-subtitle');
        const heroButtons = document.getElementById('hero-buttons');
        
        if (hero) {
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }
        
        setTimeout(() => {
            if (heroTitle) {
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'translateX(0)';
            }
        }, 200);
        
        setTimeout(() => {
            if (heroSubtitle) {
                heroSubtitle.style.opacity = '1';
                heroSubtitle.style.transform = 'translateX(0)';
            }
        }, 400);
        
        setTimeout(() => {
            if (heroButtons) {
                heroButtons.style.opacity = '1';
                heroButtons.style.transform = 'translateX(0)';
            }
        }, 600);
    }, 100);
    
    // Carousel (seulement sur index.html)
    const carousel = document.querySelector('.carousel-inner');
    const indicators = document.querySelectorAll('.carousel-indicator');
    const carouselItems = document.querySelectorAll('.carousel-item');
    
    if (carousel && indicators.length > 0 && carouselItems.length > 0) {
        let currentSlide = 0;
        const totalSlides = carouselItems.length;
        
        console.log(`Carousel: ${totalSlides} slides trouvés`);
        
        function goToSlide(index) {
            currentSlide = index;
            carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            indicators.forEach((indicator, i) => {
                if (i === currentSlide) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            goToSlide(currentSlide);
        }
        
        // Auto-play
        let autoplayInterval = setInterval(nextSlide, 3000);
        
        // Indicateurs cliquables
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                clearInterval(autoplayInterval);
                goToSlide(index);
                autoplayInterval = setInterval(nextSlide, 3000);
            });
        });
    }
    
    // Animation attention-pulse
    const attentionElements = document.querySelectorAll('.attention-pulse');
    attentionElements.forEach(el => {
        setInterval(() => {
            el.style.transform = 'scale(1.05)';
            setTimeout(() => {
                el.style.transform = 'scale(1)';
            }, 300);
        }, 2000);
    });

    // Initialisation du dropdown articles
    initArticlesDropdown();
});