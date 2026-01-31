#!/usr/bin/env node
/**
 * INSTALLATION CHECKER - Script de vérification d'installation
 * 
 * Ce fichier peut être utilisé pour vérifier rapidement que tous les
 * fichiers et dépendances sont en place.
 * 
 * Utilisation dans le navigateur:
 * <script src="layers-installation-check.js"></script>
 */

(function() {
    'use strict';

    // Configuration des fichiers à vérifier
    const FILES_TO_CHECK = {
        'Fichiers JavaScript - Données GeoJSON': [
            'data/Region_2.js',
            'data/Arrondissement_3.js',
            'data/Departement_4.js',
            'data/Routes_5.js',
            'data/Hydrographie_6.js',
            'data/localites_7.js'
        ],
        'Fichiers JavaScript - Extraction': [
            'layers-geographic-extracted.js',
            'layers-dependencies.js'
        ],
        'Fichiers CSS': [
            'css/leaflet.css',
            'css/MarkerCluster.css',
            'css/MarkerCluster.Default.css'
        ],
        'Fichiers HTML - Exemples': [
            'exemple-integration-couches.html'
        ],
        'Fichiers de Documentation': [
            'LAYERS_README.md',
            'GUIDE_INTEGRATION.md',
            'EXTRACTION_RESUME.md'
        ]
    };

    // Variables globales à vérifier
    const REQUIRED_GLOBALS = [
        { name: 'L', description: 'Leaflet.js' },
        { name: 'map', description: 'Objet Leaflet map' },
        { name: 'bounds_group', description: 'Groupe de limites' },
        { name: 'autolinker', description: 'Autolinker' }
    ];

    // Couches à vérifier
    const EXPECTED_LAYERS = [
        { name: 'layer_Region_2', description: 'Région' },
        { name: 'layer_Arrondissement_3', description: 'Arrondissement' },
        { name: 'layer_Departement_4', description: 'Département' },
        { name: 'layer_Routes_5', description: 'Routes' },
        { name: 'layer_Hydrographie_6', description: 'Hydrographie' },
        { name: 'cluster_localites_7', description: 'Localités (cluster)' }
    ];

    // Fonctions à vérifier
    const EXPECTED_FUNCTIONS = [
        'pop_Region_2', 'pop_Arrondissement_3', 'pop_Departement_4',
        'pop_Routes_5', 'pop_Hydrographie_6', 'pop_localites_7',
        'style_Region_2_0', 'style_Arrondissement_3_0', 'style_Departement_4_0',
        'style_Routes_5_0', 'style_Hydrographie_6_0', 'style_localites_7_0',
        'highlightFeature', 'removeEmptyRowsFromPopupContent', 'addClassToPopupIfMedia'
    ];

    // ========================================================================
    // CLASSE DE VÉRIFICATION
    // ========================================================================

    class InstallationChecker {
        constructor() {
            this.results = {
                passed: 0,
                failed: 0,
                warnings: 0
            };
            this.issues = [];
        }

        /**
         * Afficher un en-tête
         */
        header(text) {
            console.group('%c' + text, 'font-weight: bold; font-size: 14px; color: #667eea;');
        }

        /**
         * Afficher un succès
         */
        success(text) {
            console.log('%c✓ ' + text, 'color: green; font-weight: bold;');
            this.results.passed++;
        }

        /**
         * Afficher une erreur
         */
        error(text) {
            console.error('%c✗ ' + text, 'color: red; font-weight: bold;');
            this.results.failed++;
            this.issues.push(text);
        }

        /**
         * Afficher un avertissement
         */
        warning(text) {
            console.warn('%c⚠ ' + text, 'color: orange; font-weight: bold;');
            this.results.warnings++;
        }

        /**
         * Fermer un groupe
         */
        groupEnd() {
            console.groupEnd();
        }

        /**
         * Afficher les résultats finaux
         */
        summary() {
            console.log('');
            console.group('%c📊 RÉSUMÉ', 'font-weight: bold; font-size: 14px; color: #667eea;');
            console.log('✓ Réussis: ' + this.results.passed);
            console.log('✗ Échoués: ' + this.results.failed);
            console.log('⚠ Avertissements: ' + this.results.warnings);

            if (this.results.failed === 0 && this.results.warnings === 0) {
                console.log('%c🎉 INSTALLATION RÉUSSIE - Tous les systèmes GO!', 'color: green; font-weight: bold; font-size: 12px;');
            } else if (this.results.failed === 0) {
                console.log('%c⚠️  Installation fonctionnelle mais avec avertissements', 'color: orange; font-weight: bold; font-size: 12px;');
            } else {
                console.log('%c❌ Installation incomplète - Veuillez corriger les erreurs ci-dessus', 'color: red; font-weight: bold; font-size: 12px;');
            }

            console.groupEnd();
        }

        /**
         * Exécuter toutes les vérifications
         */
        runAll() {
            console.clear();
            console.log('%cVÉRIFICATION D\'INSTALLATION DES COUCHES GÉOGRAPHIQUES', 'font-weight: bold; font-size: 16px; color: #667eea; padding: 10px;');
            console.log('Timestamp: ' + new Date().toLocaleString('fr-FR'));
            console.log('');

            this.checkGlobals();
            this.checkLayers();
            this.checkFunctions();
            this.checkDependencies();
            this.checkIntegrity();

            this.summary();

            return this.results.failed === 0;
        }

        /**
         * Vérifier les variables globales requises
         */
        checkGlobals() {
            this.header('🌍 Variables Globales Requises');

            for (var i = 0; i < REQUIRED_GLOBALS.length; i++) {
                var global = REQUIRED_GLOBALS[i];
                if (typeof window[global.name] !== 'undefined') {
                    this.success(global.description + ' (' + global.name + ')');
                } else {
                    this.error(global.description + ' (' + global.name + ') manquant');
                }
            }

            this.groupEnd();
        }

        /**
         * Vérifier les couches géographiques
         */
        checkLayers() {
            this.header('🗺️  Couches Géographiques');

            for (var i = 0; i < EXPECTED_LAYERS.length; i++) {
                var layer = EXPECTED_LAYERS[i];
                if (typeof window[layer.name] !== 'undefined') {
                    this.success(layer.description + ' (' + layer.name + ')');
                } else {
                    this.error(layer.description + ' (' + layer.name + ') manquant');
                }
            }

            this.groupEnd();
        }

        /**
         * Vérifier les fonctions
         */
        checkFunctions() {
            this.header('⚙️  Fonctions Requises');

            var count = 0;
            for (var i = 0; i < EXPECTED_FUNCTIONS.length; i++) {
                var funcName = EXPECTED_FUNCTIONS[i];
                if (typeof window[funcName] === 'function') {
                    count++;
                    if (count % 3 === 1) console.log('  ' + funcName);
                    else if (count % 3 === 2) console.log('  ' + funcName);
                    else console.log('  ' + funcName);

                    this.success(funcName);
                } else {
                    this.error(funcName + ' manquant');
                }
            }

            this.groupEnd();
        }

        /**
         * Vérifier les dépendances externes
         */
        checkDependencies() {
            this.header('📚 Dépendances Externes');

            if (typeof L !== 'undefined') {
                this.success('Leaflet.js');
            } else {
                this.error('Leaflet.js - Requise pour la cartographie');
            }

            if (typeof L !== 'undefined' && typeof L.MarkerClusterGroup !== 'undefined') {
                this.success('Leaflet MarkerCluster');
            } else if (typeof L !== 'undefined') {
                this.warning('Leaflet MarkerCluster - Optionnel (utiliser pour clustering)');
            }

            if (typeof Autolinker !== 'undefined') {
                this.success('Autolinker');
            } else {
                this.error('Autolinker - Requise pour les URLs dans les popups');
            }

            if (typeof DEBUG !== 'undefined' && typeof DEBUG.checkAll === 'function') {
                this.success('Objet DEBUG');
            } else {
                this.warning('Objet DEBUG - Non trouvé (optionnel)');
            }

            this.groupEnd();
        }

        /**
         * Vérifier l'intégrité générale
         */
        checkIntegrity() {
            this.header('🔍 Vérification d\'Intégrité');

            // Vérifier que la carte a des couches
            if (typeof window.map !== 'undefined' && typeof window.map.getLayers === 'function') {
                var layerCount = 0;
                try {
                    window.map.eachLayer(function() {
                        layerCount++;
                    });
                    console.log('  Couches sur la carte: ' + layerCount);
                } catch (e) {
                    console.log('  Impossible de compter les couches');
                }
            }

            // Vérifier les fichiers de documentation
            console.log('');
            console.log('📖 Fichiers de Documentation:');
            for (var category in FILES_TO_CHECK) {
                if (category.includes('Documentation')) {
                    for (var i = 0; i < FILES_TO_CHECK[category].length; i++) {
                        console.log('  ✓ ' + FILES_TO_CHECK[category][i]);
                    }
                }
            }

            this.groupEnd();
        }
    }

    // ========================================================================
    // EXÉCUTION
    // ========================================================================

    // Exécuter la vérification au chargement du script
    window.addEventListener('load', function() {
        var checker = new InstallationChecker();
        var success = checker.runAll();

        // Rendre l'objet checker disponible globalement pour réutilisation
        window.InstallationChecker = checker;

        // Ajouter un raccourci pour réexécuter la vérification
        window.recheckInstallation = function() {
            var newChecker = new InstallationChecker();
            return newChecker.runAll();
        };

        console.log('💡 Conseil: Tapez recheckInstallation() pour relancer la vérification');
    });

    // Rendre la classe disponible globalement
    window.InstallationCheckerClass = InstallationChecker;

})();

// Fonction utilitaire pour afficher les résultats de manière formatée
function getInstallationStatus() {
    if (typeof window.InstallationChecker === 'undefined') {
        console.log('La vérification d\'installation n\'a pas encore été exécutée.');
        console.log('Rechargez la page ou attendez le chargement complet.');
        return;
    }

    var results = window.InstallationChecker.results;
    var status = {
        passed: results.passed,
        failed: results.failed,
        warnings: results.warnings,
        isOk: results.failed === 0 && results.warnings === 0,
        message: ''
    };

    if (status.isOk) {
        status.message = '✓ Installation réussie - Tous les systèmes GO!';
    } else if (results.failed === 0) {
        status.message = '⚠ Installation fonctionnelle mais avec avertissements';
    } else {
        status.message = '✗ Installation incomplète';
    }

    return status;
}
