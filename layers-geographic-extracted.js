/**
 * EXTRACTION DES COUCHES GÉOGRAPHIQUES
 * Fichier contenant toutes les fonctions et configuration des couches géographiques
 * pour la cartographie administrative du Sénégal
 * 
 * Inclus:
 * - Configuration des panes
 * - Fonctions de popup (pop_*)
 * - Fonctions de style (style_*)
 * - Création des couches L.geoJson
 * - Ajout des couches à la carte
 * 
 * Dépendances: Leaflet, json_Region_2, json_Arrondissement_3, json_Departement_4, 
 *              json_Routes_5, json_Hydrographie_6, json_localites_7
 */

// ============================================================================
// CONFIGURATION DES PANES (couches de rendu)
// ============================================================================

map.createPane('pane_Region_2');
map.getPane('pane_Region_2').style.zIndex = 402;
map.getPane('pane_Region_2').style['mix-blend-mode'] = 'normal';

map.createPane('pane_Arrondissement_3');
map.getPane('pane_Arrondissement_3').style.zIndex = 403;
map.getPane('pane_Arrondissement_3').style['mix-blend-mode'] = 'normal';

map.createPane('pane_Departement_4');
map.getPane('pane_Departement_4').style.zIndex = 404;
map.getPane('pane_Departement_4').style['mix-blend-mode'] = 'normal';

map.createPane('pane_Routes_5');
map.getPane('pane_Routes_5').style.zIndex = 405;
map.getPane('pane_Routes_5').style['mix-blend-mode'] = 'normal';

map.createPane('pane_Hydrographie_6');
map.getPane('pane_Hydrographie_6').style.zIndex = 406;
map.getPane('pane_Hydrographie_6').style['mix-blend-mode'] = 'normal';

map.createPane('pane_localites_7');
map.getPane('pane_localites_7').style.zIndex = 407;
map.getPane('pane_localites_7').style['mix-blend-mode'] = 'normal';

// ============================================================================
// RÉGION - Couche 2
// ============================================================================

/**
 * Fonction de popup pour la couche Région
 */
function pop_Region_2(feature, layer) {
    layer.on({
        mouseout: function(e) {
            for (var i in e.target._eventParents) {
                if (typeof e.target._eventParents[i].resetStyle === 'function') {
                    e.target._eventParents[i].resetStyle(e.target);
                }
            }
            if (typeof layer.closePopup == 'function') {
                layer.closePopup();
            } else {
                layer.eachLayer(function(feature){
                    feature.closePopup()
                });
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table>\
            <tr>\
                <td colspan="2"><strong>Code</strong><br />' + (feature.properties['Code'] !== null ? autolinker.link(String(feature.properties['Code']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2"><strong>Région</strong><br />' + (feature.properties['Région'] !== null ? autolinker.link(String(feature.properties['Région']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
        </table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function(e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, { maxHeight: 400 });
}

/**
 * Fonction de style pour la couche Région
 * Applique des couleurs différentes selon le nom de la région
 */
function style_Region_2_0(feature) {
    switch(String(feature.properties['Région'])) {
        case 'DAKAR':
            return {
                pane: 'pane_Region_2',
                opacity: 1,
                color: 'rgba(35,35,35,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fill: true,
                fillOpacity: 1,
                fillColor: 'rgba(211,14,30,1.0)',
                interactive: true,
            }
            break;
        case 'DIOURBEL':
            return {
                pane: 'pane_Region_2',
                opacity: 1,
                color: 'rgba(35,35,35,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fill: true,
                fillOpacity: 1,
                fillColor: 'rgba(145,235,137,1.0)',
                interactive: true,
            }
            break;
        case 'FATICK':
            return {
                pane: 'pane_Region_2',
                opacity: 1,
                color: 'rgba(35,35,35,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fill: true,
                fillOpacity: 1,
                fillColor: 'rgba(107,163,220,1.0)',
                interactive: true,
            }
            break;
        case 'KAFFRINE':
            return {
                pane: 'pane_Region_2',
                opacity: 1,
                color: 'rgba(35,35,35,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fill: true,
                fillOpacity: 1,
                fillColor: 'rgba(201,174,107,1.0)',
                interactive: true,
            }
            break;
        case 'KAOLACK':
            return {
                pane: 'pane_Region_2',
                opacity: 1,
                color: 'rgba(35,35,35,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fill: true,
                fillOpacity: 1,
                fillColor: 'rgba(110,211,15,1.0)',
                interactive: true,
            }
            break;
        case 'KEDOUGOU':
            return {
                pane: 'pane_Region_2',
                opacity: 1,
                color: 'rgba(35,35,35,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fill: true,
                fillOpacity: 1,
                fillColor: 'rgba(115,223,237,1.0)',
                interactive: true,
            }
            break;
        case 'KOLDA':
            return {
                pane: 'pane_Region_2',
                opacity: 1,
                color: 'rgba(35,35,35,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fill: true,
                fillOpacity: 1,
                fillColor: 'rgba(31,204,86,1.0)',
                interactive: true,
            }
            break;
        case 'LOUGA':
            return {
                pane: 'pane_Region_2',
                opacity: 1,
                color: 'rgba(35,35,35,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fill: true,
                fillOpacity: 1,
                fillColor: 'rgba(209,227,74,1.0)',
                interactive: true,
            }
            break;
        case 'MATAM':
            return {
                pane: 'pane_Region_2',
                opacity: 1,
                color: 'rgba(35,35,35,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fill: true,
                fillOpacity: 1,
                fillColor: 'rgba(120,229,198,1.0)',
                interactive: true,
            }
            break;
        case 'SAINT-LOUIS':
            return {
                pane: 'pane_Region_2',
                opacity: 1,
                color: 'rgba(35,35,35,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fill: true,
                fillOpacity: 1,
                fillColor: 'rgba(202,93,42,1.0)',
                interactive: true,
            }
            break;
        case 'SEDHIOU':
            return {
                pane: 'pane_Region_2',
                opacity: 1,
                color: 'rgba(35,35,35,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fill: true,
                fillOpacity: 1,
                fillColor: 'rgba(151,112,235,1.0)',
                interactive: true,
            }
            break;
        case 'TAMBACOUNDA':
            return {
                pane: 'pane_Region_2',
                opacity: 1,
                color: 'rgba(35,35,35,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fill: true,
                fillOpacity: 1,
                fillColor: 'rgba(200,107,237,1.0)',
                interactive: true,
            }
            break;
        case 'THIES':
            return {
                pane: 'pane_Region_2',
                opacity: 1,
                color: 'rgba(35,35,35,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fill: true,
                fillOpacity: 1,
                fillColor: 'rgba(231,126,177,1.0)',
                interactive: true,
            }
            break;
        case 'ZIGUINCHOR':
            return {
                pane: 'pane_Region_2',
                opacity: 1,
                color: 'rgba(35,35,35,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fill: true,
                fillOpacity: 1,
                fillColor: 'rgba(22,38,222,1.0)',
                interactive: true,
            }
            break;
    }
}

/**
 * Création et ajout de la couche Région à la carte
 */
var layer_Region_2 = new L.geoJson(json_Region_2, {
    attribution: '',
    interactive: true,
    dataVar: 'json_Region_2',
    layerName: 'layer_Region_2',
    pane: 'pane_Region_2',
    onEachFeature: pop_Region_2,
    style: style_Region_2_0,
});
bounds_group.addLayer(layer_Region_2);
map.addLayer(layer_Region_2);

// ============================================================================
// ARRONDISSEMENT - Couche 3
// ============================================================================

/**
 * Fonction de popup pour la couche Arrondissement
 */
function pop_Arrondissement_3(feature, layer) {
    layer.on({
        mouseout: function(e) {
            for (var i in e.target._eventParents) {
                if (typeof e.target._eventParents[i].resetStyle === 'function') {
                    e.target._eventParents[i].resetStyle(e.target);
                }
            }
            if (typeof layer.closePopup == 'function') {
                layer.closePopup();
            } else {
                layer.eachLayer(function(feature){
                    feature.closePopup()
                });
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table>\
            <tr>\
                <td colspan="2"><strong>reg</strong><br />' + (feature.properties['reg'] !== null ? autolinker.link(String(feature.properties['reg']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2"><strong>dept</strong><br />' + (feature.properties['dept'] !== null ? autolinker.link(String(feature.properties['dept']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td class="visible-with-data" id="cav" colspan="2"><strong>cav</strong><br />' + (feature.properties['cav'] !== null ? autolinker.link(String(feature.properties['cav']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
        </table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function(e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, { maxHeight: 400 });
}

/**
 * Fonction de style pour la couche Arrondissement
 */
function style_Arrondissement_3_0() {
    return {
        pane: 'pane_Arrondissement_3',
        opacity: 1,
        color: 'rgba(35,35,35,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 1.0, 
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(231,113,72,1.0)',
        interactive: true,
    }
}

/**
 * Création et ajout de la couche Arrondissement à la carte
 */
var layer_Arrondissement_3 = new L.geoJson(json_Arrondissement_3, {
    attribution: '',
    interactive: true,
    dataVar: 'json_Arrondissement_3',
    layerName: 'layer_Arrondissement_3',
    pane: 'pane_Arrondissement_3',
    onEachFeature: pop_Arrondissement_3,
    style: style_Arrondissement_3_0,
});
bounds_group.addLayer(layer_Arrondissement_3);
map.addLayer(layer_Arrondissement_3);

// ============================================================================
// DÉPARTEMENT - Couche 4
// ============================================================================

/**
 * Fonction de popup pour la couche Département
 */
function pop_Departement_4(feature, layer) {
    layer.on({
        mouseout: function(e) {
            for (var i in e.target._eventParents) {
                if (typeof e.target._eventParents[i].resetStyle === 'function') {
                    e.target._eventParents[i].resetStyle(e.target);
                }
            }
            if (typeof layer.closePopup == 'function') {
                layer.closePopup();
            } else {
                layer.eachLayer(function(feature){
                    feature.closePopup()
                });
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table>\
            <tr>\
                <td colspan="2"><strong>Région</strong><br />' + (feature.properties['Région'] !== null ? autolinker.link(String(feature.properties['Région']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2"><strong>Dept</strong><br />' + (feature.properties['Dept'] !== null ? autolinker.link(String(feature.properties['Dept']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['shape_leng'] !== null ? autolinker.link(String(feature.properties['shape_leng']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['Shape_Le_1'] !== null ? autolinker.link(String(feature.properties['Shape_Le_1']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['Shape_Area'] !== null ? autolinker.link(String(feature.properties['Shape_Area']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
        </table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function(e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, { maxHeight: 400 });
}

/**
 * Fonction de style pour la couche Département
 */
function style_Departement_4_0() {
    return {
        pane: 'pane_Departement_4',
        opacity: 1,
        color: 'rgba(35,35,35,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 1.0, 
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(255,158,23,1.0)',
        interactive: true,
    }
}

/**
 * Création et ajout de la couche Département à la carte
 */
var layer_Departement_4 = new L.geoJson(json_Departement_4, {
    attribution: '',
    interactive: true,
    dataVar: 'json_Departement_4',
    layerName: 'layer_Departement_4',
    pane: 'pane_Departement_4',
    onEachFeature: pop_Departement_4,
    style: style_Departement_4_0,
});
bounds_group.addLayer(layer_Departement_4);
map.addLayer(layer_Departement_4);

// ============================================================================
// ROUTES - Couche 5
// ============================================================================

/**
 * Fonction de popup pour la couche Routes
 */
function pop_Routes_5(feature, layer) {
    layer.on({
        mouseout: function(e) {
            for (var i in e.target._eventParents) {
                if (typeof e.target._eventParents[i].resetStyle === 'function') {
                    e.target._eventParents[i].resetStyle(e.target);
                }
            }
            if (typeof layer.closePopup == 'function') {
                layer.closePopup();
            } else {
                layer.eachLayer(function(feature){
                    feature.closePopup()
                });
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table>\
            <tr>\
                <td colspan="2"><strong>LONGUEUR</strong><br />' + (feature.properties['LONGUEUR'] !== null ? autolinker.link(String(feature.properties['LONGUEUR']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2"><strong>ROUTESA3_</strong><br />' + (feature.properties['ROUTESA3_'] !== null ? autolinker.link(String(feature.properties['ROUTESA3_']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2"><strong>ROUTESA3_I</strong><br />' + (feature.properties['ROUTESA3_I'] !== null ? autolinker.link(String(feature.properties['ROUTESA3_I']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
        </table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function(e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, { maxHeight: 400 });
}

/**
 * Fonction de style pour la couche Routes
 */
function style_Routes_5_0() {
    return {
        pane: 'pane_Routes_5',
        opacity: 1,
        color: 'rgba(190,178,151,1.0)',
        dashArray: '',
        lineCap: 'square',
        lineJoin: 'bevel',
        weight: 1.0,
        fillOpacity: 0,
        interactive: true,
    }
}

/**
 * Création et ajout de la couche Routes à la carte
 */
var layer_Routes_5 = new L.geoJson(json_Routes_5, {
    attribution: '',
    interactive: true,
    dataVar: 'json_Routes_5',
    layerName: 'layer_Routes_5',
    pane: 'pane_Routes_5',
    onEachFeature: pop_Routes_5,
    style: style_Routes_5_0,
});
bounds_group.addLayer(layer_Routes_5);
map.addLayer(layer_Routes_5);

// ============================================================================
// HYDROGRAPHIE - Couche 6
// ============================================================================

/**
 * Fonction de popup pour la couche Hydrographie
 */
function pop_Hydrographie_6(feature, layer) {
    layer.on({
        mouseout: function(e) {
            for (var i in e.target._eventParents) {
                if (typeof e.target._eventParents[i].resetStyle === 'function') {
                    e.target._eventParents[i].resetStyle(e.target);
                }
            }
            if (typeof layer.closePopup == 'function') {
                layer.closePopup();
            } else {
                layer.eachLayer(function(feature){
                    feature.closePopup()
                });
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table>\
            <tr>\
                <td colspan="2"><strong>LENGTH</strong><br />' + (feature.properties['LENGTH'] !== null ? autolinker.link(String(feature.properties['LENGTH']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2"><strong>HYDROLA3_</strong><br />' + (feature.properties['HYDROLA3_'] !== null ? autolinker.link(String(feature.properties['HYDROLA3_']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2"><strong>HYDROLA3_I</strong><br />' + (feature.properties['HYDROLA3_I'] !== null ? autolinker.link(String(feature.properties['HYDROLA3_I']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2"><strong>NOM</strong><br />' + (feature.properties['NOM'] !== null ? autolinker.link(String(feature.properties['NOM']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['LIBELLE'] !== null ? autolinker.link(String(feature.properties['LIBELLE']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
        </table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function(e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, { maxHeight: 400 });
}

/**
 * Fonction de style pour la couche Hydrographie
 */
function style_Hydrographie_6_0() {
    return {
        pane: 'pane_Hydrographie_6',
        opacity: 1,
        color: 'rgba(141,90,153,1.0)',
        dashArray: '',
        lineCap: 'square',
        lineJoin: 'bevel',
        weight: 1.0,
        fillOpacity: 0,
        interactive: true,
    }
}

/**
 * Création et ajout de la couche Hydrographie à la carte
 */
var layer_Hydrographie_6 = new L.geoJson(json_Hydrographie_6, {
    attribution: '',
    interactive: true,
    dataVar: 'json_Hydrographie_6',
    layerName: 'layer_Hydrographie_6',
    pane: 'pane_Hydrographie_6',
    onEachFeature: pop_Hydrographie_6,
    style: style_Hydrographie_6_0,
});
bounds_group.addLayer(layer_Hydrographie_6);
map.addLayer(layer_Hydrographie_6);

// ============================================================================
// LOCALITÉS - Couche 7
// ============================================================================

/**
 * Fonction de popup pour la couche Localités
 */
function pop_localites_7(feature, layer) {
    layer.on({
        mouseout: function(e) {
            for (var i in e.target._eventParents) {
                if (typeof e.target._eventParents[i].resetStyle === 'function') {
                    e.target._eventParents[i].resetStyle(e.target);
                }
            }
            if (typeof layer.closePopup == 'function') {
                layer.closePopup();
            } else {
                layer.eachLayer(function(feature){
                    feature.closePopup()
                });
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table>\
            <tr>\
                <td colspan="2"><strong>ENTITY</strong><br />' + (feature.properties['ENTITY'] !== null ? autolinker.link(String(feature.properties['ENTITY']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2"><strong>LAYER</strong><br />' + (feature.properties['LAYER'] !== null ? autolinker.link(String(feature.properties['LAYER']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2"><strong>ELEVATION</strong><br />' + (feature.properties['ELEVATION'] !== null ? autolinker.link(String(feature.properties['ELEVATION']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2"><strong>THICKNESS</strong><br />' + (feature.properties['THICKNESS'] !== null ? autolinker.link(String(feature.properties['THICKNESS']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2"><strong>COLOR</strong><br />' + (feature.properties['COLOR'] !== null ? autolinker.link(String(feature.properties['COLOR']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2"><strong>NOM</strong><br />' + (feature.properties['NOM'] !== null ? autolinker.link(String(feature.properties['NOM']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2"><strong>NUM_VILLAG</strong><br />' + (feature.properties['NUM_VILLAG'] !== null ? autolinker.link(String(feature.properties['NUM_VILLAG']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
        </table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function(e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, { maxHeight: 400 });
}

/**
 * Fonction de style pour la couche Localités
 */
function style_localites_7_0() {
    return {
        pane: 'pane_localites_7',
        radius: 4.0,
        opacity: 1,
        color: 'rgba(35,35,35,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 1,
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(114,155,111,1.0)',
        interactive: true,
    }
}

/**
 * Création et ajout de la couche Localités à la carte
 */
var layer_localites_7 = new L.geoJson(json_localites_7, {
    attribution: '',
    interactive: true,
    dataVar: 'json_localites_7',
    layerName: 'layer_localites_7',
    pane: 'pane_localites_7',
    onEachFeature: pop_localites_7,
    pointToLayer: function (feature, latlng) {
        var context = {
            feature: feature,
            variables: {}
        };
        return L.circleMarker(latlng, style_localites_7_0(feature));
    },
});
var cluster_localites_7 = new L.MarkerClusterGroup({showCoverageOnHover: false,
    spiderfyDistanceMultiplier: 2});
cluster_localites_7.addLayer(layer_localites_7);

bounds_group.addLayer(layer_localites_7);
cluster_localites_7.addTo(map);
