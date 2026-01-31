/**
 * DÉPENDANCES REQUISES POUR layers-geographic-extracted.js
 * 
 * Ce fichier contient toutes les fonctions et objets requis pour que
 * layers-geographic-extracted.js fonctionne correctement.
 * 
 * À charger AVANT layers-geographic-extracted.js
 */

// ============================================================================
// INITIALISATION DE LA CARTE
// ============================================================================

// Variable globale pour la couche en surbrillance
var highlightLayer;

/**
 * Fonction pour mettre en surbrillance les entités au survol
 */
function highlightFeature(e) {
    highlightLayer = e.target;

    if (e.target.feature.geometry.type === 'LineString' || e.target.feature.geometry.type === 'MultiLineString') {
        highlightLayer.setStyle({
            color: 'rgba(255, 255, 0, 1.00)',
        });
    } else {
        highlightLayer.setStyle({
            fillColor: 'rgba(255, 255, 0, 1.00)',
            fillOpacity: 1
        });
    }
    highlightLayer.openPopup();
}

/**
 * Initialiser la carte Leaflet
 * Note : Cette fonction est généralement appelée après le chargement du DOM
 */
function initializeMap() {
    // Vérifier que l'élément #map existe
    if (!document.getElementById('map')) {
        console.error('Élément #map non trouvé. Impossible d\'initialiser la carte.');
        return;
    }

    // Créer l'objet carte
    window.map = L.map('map', {
        zoomControl: false,
        maxZoom: 28,
        minZoom: 1
    }).fitBounds([[12.12546370303225, -18.87556500957226], [16.803451780511477, -9.859982997465725]]);

    // Créer le groupe de limites pour les entités
    window.bounds_group = new L.featureGroup([]);

    return map;
}

/**
 * Initialiser Autolinker pour la conversion des URLs en liens
 */
function initializeAutolinker() {
    window.autolinker = new Autolinker({
        truncate: { length: 30, location: 'smart' }
    });
    return autolinker;
}

// ============================================================================
// FONCTIONS POUR LA GESTION DES POPUPS
// ============================================================================

/**
 * Supprime les rangées vides des contenus de popups
 * Utilisé pour les propriétés conditionnelles (visible-with-data)
 */
function removeEmptyRowsFromPopupContent(content, feature) {
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    var rows = tempDiv.querySelectorAll('tr');
    
    for (var i = 0; i < rows.length; i++) {
        var td = rows[i].querySelector('td.visible-with-data');
        var key = td ? td.id : '';
        if (td && td.classList.contains('visible-with-data') && feature.properties[key] == null) {
            rows[i].parentNode.removeChild(rows[i]);
        }
    }
    return tempDiv.innerHTML;
}

/**
 * Ajoute des classes CSS aux popups contenant des médias
 * Gère les images, audio et vidéo
 */
function addClassToPopupIfMedia(content, popup) {
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    var imgTd = tempDiv.querySelector('td img');
    
    if (imgTd) {
        var src = imgTd.getAttribute('src');
        
        if (/\.(jpg|jpeg|png|gif|bmp|webp|avif)$/i.test(src)) {
            // Image
            popup._contentNode.classList.add('media');
            setTimeout(function() {
                popup.update();
            }, 10);
        } else if (/\.(mp3|wav|ogg|aac)$/i.test(src)) {
            // Audio
            var audio = document.createElement('audio');
            audio.controls = true;
            audio.src = src;
            imgTd.parentNode.replaceChild(audio, imgTd);
            popup._contentNode.classList.add('media');
            setTimeout(function() {
                popup.setContent(tempDiv.innerHTML);
                popup.update();
            }, 10);
        } else if (/\.(mp4|webm|ogg|mov)$/i.test(src)) {
            // Vidéo
            var video = document.createElement('video');
            video.controls = true;
            video.src = src;
            video.style.width = "400px";
            video.style.height = "300px";
            video.style.maxHeight = "60vh";
            video.style.maxWidth = "60vw";
            imgTd.parentNode.replaceChild(video, imgTd);
            popup._contentNode.classList.add('media');
            
            video.addEventListener('loadedmetadata', function() {
                popup.update();
            });
            
            setTimeout(function() {
                popup.setContent(tempDiv.innerHTML);
                popup.update();
            }, 10);
        } else {
            popup._contentNode.classList.remove('media');
        }
    } else {
        popup._contentNode.classList.remove('media');
    }
}

// ============================================================================
// FONCTION D'INITIALISATION COMPLÈTE
// ============================================================================

/**
 * Fonction principale pour initialiser la carte et tous les objets requis
 * À appeler après le chargement du DOM et des données GeoJSON
 */
function initializeGeographicLayers() {
    console.log('Initialisation des couches géographiques...');

    // Étape 1 : Initialiser la carte
    var map = initializeMap();
    if (!map) {
        console.error('Erreur lors de l\'initialisation de la carte');
        return false;
    }
    console.log('✓ Carte initialisée');

    // Étape 2 : Initialiser Autolinker
    var autolinker = initializeAutolinker();
    if (!autolinker) {
        console.error('Erreur lors de l\'initialisation d\'Autolinker');
        return false;
    }
    console.log('✓ Autolinker initialisé');

    // Étape 3 : Vérifier que les données GeoJSON sont chargées
    var requiredData = [
        'json_Region_2',
        'json_Arrondissement_3',
        'json_Departement_4',
        'json_Routes_5',
        'json_Hydrographie_6',
        'json_localites_7'
    ];

    for (var i = 0; i < requiredData.length; i++) {
        if (typeof window[requiredData[i]] === 'undefined') {
            console.error('Données GeoJSON manquantes: ' + requiredData[i]);
            console.log('Assurez-vous que ' + requiredData[i].replace('json_', 'data/') + '.js est chargé');
            return false;
        }
    }
    console.log('✓ Toutes les données GeoJSON sont chargées');

    // Étape 4 : Vérifier que les fonctions requises existent
    var requiredFunctions = [
        'removeEmptyRowsFromPopupContent',
        'addClassToPopupIfMedia',
        'highlightFeature'
    ];

    for (var i = 0; i < requiredFunctions.length; i++) {
        if (typeof window[requiredFunctions[i]] !== 'function') {
            console.error('Fonction requise manquante: ' + requiredFunctions[i]);
            return false;
        }
    }
    console.log('✓ Toutes les fonctions requises existent');

    // Étape 5 : Vérifier que Leaflet et ses plugins sont chargés
    if (typeof L === 'undefined') {
        console.error('Leaflet n\'est pas chargé');
        return false;
    }
    console.log('✓ Leaflet est chargé');

    if (typeof L.MarkerClusterGroup === 'undefined') {
        console.error('Leaflet MarkerCluster n\'est pas chargé');
        return false;
    }
    console.log('✓ Leaflet MarkerCluster est chargé');

    if (typeof Autolinker === 'undefined') {
        console.error('Autolinker n\'est pas chargé');
        return false;
    }
    console.log('✓ Autolinker est chargé');

    console.log('✓ Toutes les vérifications sont passées avec succès');
    return true;
}

// ============================================================================
// INITIALISATION AUTOMATIQUE AU CHARGEMENT DU DOCUMENT
// ============================================================================

/**
 * Attendre le chargement complet du DOM avant d'initialiser les couches
 */
document.addEventListener('DOMContentLoaded', function() {
    if (window.autoStartGeographicLayers !== false) {
        // Attendre un court délai pour s'assurer que tous les scripts sont chargés
        setTimeout(function() {
            initializeGeographicLayers();
        }, 100);
    }
}, false);

// ============================================================================
// UTILITÉ : Variables globales de débogage
// ============================================================================

/**
 * Objet de débogage pour vérifier l'état de l'initialisation
 */
var DEBUG = {
    mapReady: function() {
        return typeof window.map !== 'undefined';
    },
    autolinkReady: function() {
        return typeof window.autolinker !== 'undefined';
    },
    boundsGroupReady: function() {
        return typeof window.bounds_group !== 'undefined';
    },
    dataReady: function() {
        return typeof json_Region_2 !== 'undefined' &&
               typeof json_Arrondissement_3 !== 'undefined' &&
               typeof json_Departement_4 !== 'undefined' &&
               typeof json_Routes_5 !== 'undefined' &&
               typeof json_Hydrographie_6 !== 'undefined' &&
               typeof json_localites_7 !== 'undefined';
    },
    checkAll: function() {
        console.log('====== DIAGNOSTIC DES COUCHES GÉOGRAPHIQUES ======');
        console.log('Carte initialisée:', this.mapReady());
        console.log('Autolinker initialisé:', this.autolinkReady());
        console.log('Groupe de limites initialisé:', this.boundsGroupReady());
        console.log('Données GeoJSON chargées:', this.dataReady());
        console.log('Tous les systèmes GO:', this.mapReady() && this.autolinkReady() && this.boundsGroupReady() && this.dataReady());
        console.log('===================================================');
    },
    layerInfo: function() {
        if (!DEBUG.mapReady()) {
            console.error('La carte n\'est pas initialisée');
            return;
        }
        console.log('Couches sur la carte:');
        if (typeof window.layer_Region_2 !== 'undefined') console.log('  ✓ Region_2');
        if (typeof window.layer_Arrondissement_3 !== 'undefined') console.log('  ✓ Arrondissement_3');
        if (typeof window.layer_Departement_4 !== 'undefined') console.log('  ✓ Departement_4');
        if (typeof window.layer_Routes_5 !== 'undefined') console.log('  ✓ Routes_5');
        if (typeof window.layer_Hydrographie_6 !== 'undefined') console.log('  ✓ Hydrographie_6');
        if (typeof window.cluster_localites_7 !== 'undefined') console.log('  ✓ Localites_7 (avec clustering)');
    }
};
