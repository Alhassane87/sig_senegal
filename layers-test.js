/**
 * FICHIER DE TEST - Vérification rapide de l'intégration
 * 
 * À charger APRÈS tous les autres scripts pour tester rapidement
 * l'intégration des couches géographiques.
 * 
 * Exemple d'intégration dans HTML:
 * <script src="layers-test.js"></script>
 */

// ============================================================================
// VÉRIFICATIONS INITIALES
// ============================================================================

console.group('🔍 VÉRIFICATION DE L\'INTÉGRATION DES COUCHES GÉOGRAPHIQUES');

// Test 1 : Vérifier Leaflet
console.group('📚 Bibliothèques requises');
if (typeof L !== 'undefined') {
    console.log('✓ Leaflet.js est chargé');
} else {
    console.error('✗ Leaflet.js n\'est pas chargé');
}

if (typeof L.MarkerClusterGroup !== 'undefined') {
    console.log('✓ Leaflet MarkerCluster est chargé');
} else {
    console.warn('⚠ Leaflet MarkerCluster n\'est pas chargé (optionnel pour routes/hydrographie)');
}

if (typeof Autolinker !== 'undefined') {
    console.log('✓ Autolinker est chargé');
} else {
    console.error('✗ Autolinker n\'est pas chargé');
}
console.groupEnd();

// Test 2 : Vérifier les données GeoJSON
console.group('🗺️  Données GeoJSON');
var geoDataCheck = {
    'Region_2': typeof json_Region_2,
    'Arrondissement_3': typeof json_Arrondissement_3,
    'Departement_4': typeof json_Departement_4,
    'Routes_5': typeof json_Routes_5,
    'Hydrographie_6': typeof json_Hydrographie_6,
    'localites_7': typeof json_localites_7
};

var allDataLoaded = true;
for (var dataName in geoDataCheck) {
    if (geoDataCheck[dataName] === 'object') {
        console.log('✓ json_' + dataName + ' chargé');
    } else {
        console.error('✗ json_' + dataName + ' absent');
        allDataLoaded = false;
    }
}
console.groupEnd();

// Test 3 : Vérifier les objets globaux
console.group('🌍 Objets globaux');
if (typeof window.map !== 'undefined') {
    console.log('✓ Objet map existe');
} else {
    console.error('✗ Objet map introuvable');
}

if (typeof window.bounds_group !== 'undefined') {
    console.log('✓ Objet bounds_group existe');
} else {
    console.error('✗ Objet bounds_group introuvable');
}

if (typeof window.autolinker !== 'undefined') {
    console.log('✓ Objet autolinker existe');
} else {
    console.error('✗ Objet autolinker introuvable');
}
console.groupEnd();

// Test 4 : Vérifier les couches
console.group('🎨 Couches géographiques');
var layersCheck = {
    'layer_Region_2': 'Région',
    'layer_Arrondissement_3': 'Arrondissement',
    'layer_Departement_4': 'Département',
    'layer_Routes_5': 'Routes',
    'layer_Hydrographie_6': 'Hydrographie',
    'cluster_localites_7': 'Localités (cluster)',
    'layer_localites_7': 'Localités (couche)'
};

for (var layerName in layersCheck) {
    if (typeof window[layerName] !== 'undefined') {
        console.log('✓ ' + layersCheck[layerName] + ' (' + layerName + ')');
    } else {
        console.warn('⚠ ' + layersCheck[layerName] + ' (' + layerName + ') non trouvé');
    }
}
console.groupEnd();

// Test 5 : Vérifier les fonctions
console.group('⚙️  Fonctions');
var functionsCheck = {
    'pop_Region_2': 'Popup Region',
    'pop_Arrondissement_3': 'Popup Arrondissement',
    'pop_Departement_4': 'Popup Département',
    'pop_Routes_5': 'Popup Routes',
    'pop_Hydrographie_6': 'Popup Hydrographie',
    'pop_localites_7': 'Popup Localités',
    'style_Region_2_0': 'Style Region',
    'style_Arrondissement_3_0': 'Style Arrondissement',
    'style_Departement_4_0': 'Style Département',
    'style_Routes_5_0': 'Style Routes',
    'style_Hydrographie_6_0': 'Style Hydrographie',
    'style_localites_7_0': 'Style Localités',
    'highlightFeature': 'Surbrillance',
    'removeEmptyRowsFromPopupContent': 'Suppression rangées vides',
    'addClassToPopupIfMedia': 'Gestion des médias'
};

for (var funcName in functionsCheck) {
    if (typeof window[funcName] === 'function') {
        console.log('✓ ' + functionsCheck[funcName] + ' (' + funcName + ')');
    } else {
        console.error('✗ ' + functionsCheck[funcName] + ' (' + funcName + ') manquante');
    }
}
console.groupEnd();

// Test 6 : Vérifier les panes
console.group('🎯 Panes (couches de rendu)');
if (typeof window.map !== 'undefined') {
    var panesCheck = [
        'pane_Region_2',
        'pane_Arrondissement_3',
        'pane_Departement_4',
        'pane_Routes_5',
        'pane_Hydrographie_6',
        'pane_localites_7'
    ];

    for (var i = 0; i < panesCheck.length; i++) {
        try {
            var pane = window.map.getPane(panesCheck[i]);
            if (pane) {
                console.log('✓ ' + panesCheck[i] + ' (zIndex: ' + pane.style.zIndex + ')');
            }
        } catch (e) {
            console.warn('⚠ ' + panesCheck[i] + ' introuvable');
        }
    }
} else {
    console.warn('⚠ Impossible de vérifier les panes (map non initialisée)');
}
console.groupEnd();

// ============================================================================
// DIAGNOSTIC GLOBAL
// ============================================================================

console.group('📊 DIAGNOSTIC GLOBAL');

var allOk = true;
var issues = [];

if (typeof L === 'undefined') {
    allOk = false;
    issues.push('Leaflet.js n\'est pas chargé');
}

if (!allDataLoaded) {
    allOk = false;
    issues.push('Toutes les données GeoJSON ne sont pas chargées');
}

if (typeof window.map === 'undefined') {
    allOk = false;
    issues.push('La carte n\'est pas initialisée');
}

if (typeof window.autolinker === 'undefined') {
    allOk = false;
    issues.push('Autolinker n\'est pas initialisé');
}

if (allOk) {
    console.log('%c✓ SUCCÈS - Toutes les vérifications sont passées!', 'color: green; font-weight: bold; font-size: 14px;');
    console.log('Les 6 couches géographiques sont correctement intégrées et prêtes à l\'emploi.');
} else {
    console.error('%c✗ ERREURS DÉTECTÉES', 'color: red; font-weight: bold; font-size: 14px;');
    console.log('Problèmes détectés:');
    for (var i = 0; i < issues.length; i++) {
        console.error('  • ' + issues[i]);
    }
    console.log('Consultez les messages d\'erreur ci-dessus pour les détails.');
}

console.groupEnd();

// ============================================================================
// STATISTIQUES DES COUCHES
// ============================================================================

console.group('📈 Statistiques des couches');

function getLayerStats(layerObj, layerName) {
    if (typeof layerObj === 'undefined') {
        return null;
    }
    
    var count = 0;
    try {
        if (layerObj.eachLayer) {
            layerObj.eachLayer(function() {
                count++;
            });
        }
    } catch (e) {
        return null;
    }
    
    return {
        name: layerName,
        count: count
    };
}

var statsLayers = [
    { obj: window.layer_Region_2, name: 'Région' },
    { obj: window.layer_Arrondissement_3, name: 'Arrondissement' },
    { obj: window.layer_Departement_4, name: 'Département' },
    { obj: window.layer_Routes_5, name: 'Routes' },
    { obj: window.layer_Hydrographie_6, name: 'Hydrographie' },
    { obj: window.layer_localites_7, name: 'Localités' }
];

for (var i = 0; i < statsLayers.length; i++) {
    var stats = getLayerStats(statsLayers[i].obj, statsLayers[i].name);
    if (stats && stats.count > 0) {
        console.log(stats.name + ': ' + stats.count + ' entité(s)');
    }
}

console.groupEnd();

// ============================================================================
// AIDE SUPPLÉMENTAIRE
// ============================================================================

console.group('ℹ️  Aide et Information');
console.log('Pour afficher le diagnostic complet, exécutez:');
console.log('  DEBUG.checkAll()');
console.log('  DEBUG.layerInfo()');

console.log('\nPour des tests supplémentaires:');
console.log('  • Cliquez sur une région pour voir sa popup');
console.log('  • Passez la souris sur les couches pour les mettre en surbrillance');
console.log('  • Zoomez pour voir les différents niveaux de détail');

console.log('\nDocumentation:');
console.log('  • GUIDE_INTEGRATION.md - Guide complet d\'intégration');
console.log('  • LAYERS_README.md - Documentation détaillée des couches');
console.log('  • exemple-integration-couches.html - Exemple de fonctionnement');

console.groupEnd();

console.groupEnd();

// ============================================================================
// AFFICHAGE FORMATÉ
// ============================================================================

console.log('\n' + '='.repeat(50));
console.log('Cliquez sur les groupes ci-dessus pour développer les détails');
console.log('='.repeat(50) + '\n');
