// Configuration Personnalisable pour SIG Sénégal Modernisé
// Modifiez ce fichier pour adapter l'application à vos besoins

// ========================================
// CONFIGURATION DE COULEURS
// ========================================

const CONFIG = {
    // Thème de couleurs
    theme: {
        primaryColor: '#667eea',      // Bleu principal (navbar)
        secondaryColor: '#764ba2',    // Violet secondaire
        accentColor: '#FF6B6B',       // Couleur d'accentuation
        textColor: '#333333',         // Texte principal
        backgroundColor: '#f5f5f5',   // Fond général
        white: '#ffffff',
    },

    // ========================================
    // CONFIGURATION DE LA CARTE
    // ========================================
    map: {
        // Centre initial
        center: [14.5, -14.5],
        zoom: 6,
        minZoom: 1,
        maxZoom: 28,
        
        // Limites de zoom pour certains éléments
        zoomLayerSwitch: {
            regions: 5,        // Afficher régions à partir du zoom 5
            departments: 7,    // Afficher départements à partir du zoom 7
            arrondissements: 9, // Afficher arrondissements à partir du zoom 9
        }
    },

    // ========================================
    // FONDS DE CARTE (BASEMAPS)
    // ========================================
    basemaps: {
        default: 'cartodb',
        options: {
            cartodb: {
                url: 'http://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
                name: 'CartoDB Dark Matter',
                attribution: '© CartoDB',
                maxZoom: 20,
            },
            satellite: {
                url: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
                name: 'Google Satellite Hybrid',
                attribution: '© Google',
                maxZoom: 19,
            },
            osm: {
                url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                name: 'OpenStreetMap',
                attribution: '© OpenStreetMap contributors',
                maxZoom: 19,
            }
        }
    },

    // ========================================
    // CONFIGURATION DES COUCHES
    // ========================================
    layers: {
        // Régions - 14 régions du Sénégal
        regions: {
            visible: true,
            zIndex: 402,
            colors: {
                'DAKAR': 'rgba(211, 14, 30, 1.0)',
                'DIOURBEL': 'rgba(145, 235, 137, 1.0)',
                'FATICK': 'rgba(107, 163, 220, 1.0)',
                'KAFFRINE': 'rgba(201, 174, 107, 1.0)',
                'KAOLACK': 'rgba(110, 211, 15, 1.0)',
                'KEDOUGOU': 'rgba(115, 223, 237, 1.0)',
                'KOLDA': 'rgba(31, 204, 86, 1.0)',
                'LOUGA': 'rgba(209, 227, 74, 1.0)',
                'MATAM': 'rgba(120, 229, 198, 1.0)',
                'SAINT-LOUIS': 'rgba(202, 93, 42, 1.0)',
                'SEDHIOU': 'rgba(151, 112, 235, 1.0)',
                'TAMBACOUNDA': 'rgba(200, 107, 237, 1.0)',
                'THIES': 'rgba(231, 126, 177, 1.0)',
                'ZIGUINCHOR': 'rgba(22, 38, 222, 1.0)',
            },
            popup: {
                maxHeight: 400,
                showProperties: ['Code', 'Région']
            }
        },
        
        // Départements
        departments: {
            visible: true,
            zIndex: 404,
            color: 'rgba(255, 158, 23, 1.0)',
            popup: {
                maxHeight: 400,
                showProperties: ['Région', 'Dept']
            }
        },
        
        // Arrondissements
        arrondissements: {
            visible: true,
            zIndex: 403,
            color: 'rgba(231, 113, 72, 1.0)',
            popup: {
                maxHeight: 400,
                showProperties: ['reg', 'dept']
            }
        },
        
        // Routes
        routes: {
            visible: true,
            zIndex: 405,
            color: 'rgba(190, 178, 151, 1.0)',
            weight: 1.0,
            popup: {
                maxHeight: 400,
                showProperties: ['LONGUEUR']
            }
        },
        
        // Hydrographie
        hydrography: {
            visible: true,
            zIndex: 406,
            color: 'rgba(141, 90, 153, 1.0)',
            weight: 1.0,
            popup: {
                maxHeight: 400,
                showProperties: ['NOM', 'LIBELLE']
            }
        },
        
        // Localités
        localities: {
            visible: true,
            zIndex: 407,
            color: 'rgba(114, 155, 111, 1.0)',
            markerSize: 4.0,
            clustering: true,
            clusterOptions: {
                showCoverageOnHover: false,
                spiderfyDistanceMultiplier: 2,
                maxClusterRadius: 80,
            },
            popup: {
                maxHeight: 400,
                showProperties: ['NOM', 'ELEVATION']
            }
        }
    },

    // ========================================
    // CONFIGURATION DE L'INTERFACE
    // ========================================
    ui: {
        // Panneaux latéraux
        sidebar: {
            width: '300px',  // Largeur du panneau gauche
            rightWidth: '280px', // Largeur du panneau droit
            animation: '0.3s ease', // Transition
        },
        
        // Légende
        legend: {
            visible: true,
            position: 'right',
            compact: false,
        },
        
        // Coordonnées
        coordinates: {
            visible: true,
            precision: 6,  // Nombre de décimales
            position: 'bottom-left',
            updateFrequency: 100, // ms
        },
        
        // Échelle
        scale: {
            visible: true,
            position: 'bottom-right',
            metric: true,  // Afficher en mètres/km
        },
        
        // Navbar
        navbar: {
            visible: true,
            height: '60px',
            sticky: true,  // Reste en haut au scroll
        },
        
        // Modales
        modals: {
            showOnLoad: false,
            animationDuration: '0.3s',
        }
    },

    // ========================================
    // CONFIGURATION DES CONTRÔLES
    // ========================================
    controls: {
        // Zoom
        zoom: {
            visible: true,
            position: 'bottom-right',
            showLabel: true,
        },
        
        // Localisation
        locate: {
            visible: true,
            position: 'bottom-right',
            maxZoom: 19,
        },
        
        // Mesure
        measure: {
            visible: true,
            position: 'bottom-right',
            primaryLengthUnit: 'meters',
            secondaryLengthUnit: 'kilometers',
            primaryAreaUnit: 'sqmeters',
            secondaryAreaUnit: 'hectares',
        },
        
        // Recherche
        search: {
            visible: true,
            position: 'top-left',
            provider: 'nominatim', // nominatim, google, etc.
        }
    },

    // ========================================
    // CONFIGURATION DES DONNÉES
    // ========================================
    data: {
        // Sources GeoJSON
        geojsonSources: {
            regions: 'data/Region_2.js',
            departments: 'data/Departement_4.js',
            arrondissements: 'data/Arrondissement_3.js',
            routes: 'data/Routes_5.js',
            hydrography: 'data/Hydrographie_6.js',
            localities: 'data/localites_7.js',
        },
        
        // Légendes
        legends: {
            regions: 'legend/Region_2_*.png',
            departments: 'legend/Departement_4.png',
            arrondissements: 'legend/Arrondissement_3.png',
            routes: 'legend/Routes_5.png',
            hydrography: 'legend/Hydrographie_6.png',
            localities: 'legend/localites_7.png',
        }
    },

    // ========================================
    // MESSAGES ET TEXTES
    // ========================================
    texts: {
        appTitle: 'SIG Sénégal - Cartographie Administrative',
        appSubtitle: 'Système d\'Information Géographique du Sénégal',
        
        navbar: {
            home: 'Accueil',
            queries: 'Requêtes',
            measure: 'Mesure',
            download: 'Télécharger',
            about: 'À propos',
        },
        
        sidebar: {
            layers: 'Couches',
            basemaps: 'Fonds de Carte',
            legend: 'Légende',
        },
        
        messages: {
            spatialQuery: 'Mode requête spatiale: cliquez sur une zone pour l\'interroger',
            attributeQuery: 'Mode requête attributaire: consultez les propriétés des objets',
            measureActive: 'L\'outil de mesure est activé. Utilisez le bouton de règle en bas à droite.',
            downloadReady: 'Les données sont disponibles pour téléchargement. Sélectionnez les couches désirées.',
        }
    },

    // ========================================
    // CONFIGURATION AVANCÉE
    // ========================================
    advanced: {
        // Performance
        enableClusteringAboveZoom: 15,
        maxMarkersWithoutClustering: 100,
        
        // Caching
        enableCache: true,
        cacheExpiration: 3600, // secondes
        
        // Popups
        popupDelay: 500, // ms avant affichage
        popupMaxWidth: 400, // px
        
        // Labels
        showLabelsAboveZoom: 8,
        labelZIndex: 500,
        
        // Highlight
        highlightColor: 'rgba(255, 255, 0, 1.00)',
        highlightWeight: 2,
        
        // Attribution
        showAttribution: true,
        customAttribution: 'SIG Sénégal 2026',
    }
};

// ========================================
// FONCTION D'INITIALISATION
// ========================================
function applyConfig() {
    // Cette fonction sera appelée au chargement
    console.log('Configuration appliquée:', CONFIG);
    
    // Appliquer les thèmes
    const root = document.documentElement;
    root.style.setProperty('--primary-color', CONFIG.theme.primaryColor);
    root.style.setProperty('--secondary-color', CONFIG.theme.secondaryColor);
    root.style.setProperty('--accent-color', CONFIG.theme.accentColor);
}

// ========================================
// EXPORTS
// ========================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
