# Extraction des Couches Géographiques - SIG Sénégal

## Description
Ce fichier contient l'extraction complète de tout le code JavaScript relatif aux couches géographiques du projet de cartographie administrative du Sénégal.

## Contenu du fichier

Le fichier `layers-geographic-extracted.js` inclut :

### 1. Configuration des Panes (402-407)
- `pane_Region_2` - Régions
- `pane_Arrondissement_3` - Arrondissements  
- `pane_Departement_4` - Départements
- `pane_Routes_5` - Routes
- `pane_Hydrographie_6` - Hydrographie
- `pane_localites_7` - Localités

Chaque pane dispose d'un zIndex unique pour l'ordre d'affichage correct.

### 2. Couche Région (Couche 2)
- **Fonction popup** : `pop_Region_2(feature, layer)`
- **Fonction style** : `style_Region_2_0(feature)`
- **Création** : `L.geoJson(json_Region_2, {...})`
- **Caractéristique** : Coloration différente selon le nom de la région (14 régions)

### 3. Couche Arrondissement (Couche 3)
- **Fonction popup** : `pop_Arrondissement_3(feature, layer)`
- **Fonction style** : `style_Arrondissement_3_0()`
- **Création** : `L.geoJson(json_Arrondissement_3, {...})`
- **Couleur** : Orange-rougeâtre (rgba(231,113,72,1.0))

### 4. Couche Département (Couche 4)
- **Fonction popup** : `pop_Departement_4(feature, layer)`
- **Fonction style** : `style_Departement_4_0()`
- **Création** : `L.geoJson(json_Departement_4, {...})`
- **Couleur** : Orange doré (rgba(255,158,23,1.0))

### 5. Couche Routes (Couche 5)
- **Fonction popup** : `pop_Routes_5(feature, layer)`
- **Fonction style** : `style_Routes_5_0()`
- **Création** : `L.geoJson(json_Routes_5, {...})`
- **Couleur** : Beige-gris (rgba(190,178,151,1.0)) - LineStrings uniquement

### 6. Couche Hydrographie (Couche 6)
- **Fonction popup** : `pop_Hydrographie_6(feature, layer)`
- **Fonction style** : `style_Hydrographie_6_0()`
- **Création** : `L.geoJson(json_Hydrographie_6, {...})`
- **Couleur** : Violet (rgba(141,90,153,1.0)) - LineStrings uniquement

### 7. Couche Localités (Couche 7)
- **Fonction popup** : `pop_localites_7(feature, layer)`
- **Fonction style** : `style_localites_7_0()`
- **Création** : `L.geoJson(json_localites_7, {...})`
- **Clustering** : Utilise MarkerClusterGroup
- **Couleur** : Vert (rgba(114,155,111,1.0))

## Dépendances Requises

### Bibliothèques JavaScript
- **Leaflet.js** - Framework cartographique
- **L.MarkerClusterGroup** - Pour le clustering des localités
- **Autolinker** - Pour la conversion des URLs en liens dans les popups

### Données GeoJSON
Les fichiers de données suivants DOIVENT être chargés AVANT ce script :

```html
<script src="data/Region_2.js"></script>
<script src="data/Arrondissement_3.js"></script>
<script src="data/Departement_4.js"></script>
<script src="data/Routes_5.js"></script>
<script src="data/Hydrographie_6.js"></script>
<script src="data/localites_7.js"></script>
```

Les variables globales suivantes doivent être définies dans ces fichiers :
- `json_Region_2`
- `json_Arrondissement_3`
- `json_Departement_4`
- `json_Routes_5`
- `json_Hydrographie_6`
- `json_localites_7`

### Objets Globales Requises
- `map` - Objet Leaflet.map
- `bounds_group` - Objet L.featureGroup() pour ajouter des limites
- `autolinker` - Instance d'Autolinker pour traiter les URLs
- `highlightFeature` - Fonction pour mettre en surbrillance les entités au survol

### Fonctions Requises
- `removeEmptyRowsFromPopupContent(content, feature)` - Supprime les lignes vides des popups
- `addClassToPopupIfMedia(content, popup)` - Ajoute des styles pour les médias dans les popups

## Installation

### Étape 1 : Charger les données GeoJSON
```html
<script src="data/Region_2.js"></script>
<script src="data/Arrondissement_3.js"></script>
<script src="data/Departement_4.js"></script>
<script src="data/Routes_5.js"></script>
<script src="data/Hydrographie_6.js"></script>
<script src="data/localites_7.js"></script>
```

### Étape 2 : Définir les objets et fonctions requises
```javascript
// Initialiser la carte
var map = L.map('map', {
    zoomControl: false, 
    maxZoom: 28, 
    minZoom: 1
}).fitBounds([[12.12546370303225,-18.87556500957226],[16.803451780511477,-9.859982997465725]]);

// Initialiser le groupe de limites
var bounds_group = new L.featureGroup([]);

// Initialiser Autolinker
var autolinker = new Autolinker({truncate: {length: 30, location: 'smart'}});

// Définir la fonction de surbrillance
var highlightLayer;
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

// Définir la fonction de suppression des rangées vides
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

// Définir la fonction d'ajout de classe pour les médias
function addClassToPopupIfMedia(content, popup) {
    // ... (voir le fichier index_backup.html pour l'implémentation complète)
}
```

### Étape 3 : Charger le fichier des couches
```html
<script src="layers-geographic-extracted.js"></script>
```

## Exemple de HTML minimal

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="css/leaflet.css">
    <style>
        body { margin: 0; padding: 0; }
        #map { position: absolute; top: 0; bottom: 0; width: 100%; }
    </style>
</head>
<body>
    <div id="map"></div>

    <!-- Charger Leaflet et les plugins -->
    <script src="js/leaflet.js"></script>
    <script src="js/leaflet.markercluster.js"></script>
    <script src="js/Autolinker.min.js"></script>

    <!-- Charger les données GeoJSON -->
    <script src="data/Region_2.js"></script>
    <script src="data/Arrondissement_3.js"></script>
    <script src="data/Departement_4.js"></script>
    <script src="data/Routes_5.js"></script>
    <script src="data/Hydrographie_6.js"></script>
    <script src="data/localites_7.js"></script>

    <!-- Initialiser la carte et les fonctions requises -->
    <script>
        // [Voir Étape 2 ci-dessus]
    </script>

    <!-- Charger les couches géographiques -->
    <script src="layers-geographic-extracted.js"></script>
</body>
</html>
```

## Points Importants

1. **Pas de doublons** : Le code est nettoyé et n'a pas de répétition du même code deux fois.

2. **Ordre des includes** : Les fichiers de données DOIVENT être chargés avant le fichier des couches.

3. **Dépendances externes** : Assurez-vous que toutes les fonctions et objets globales requis sont définis avant de charger ce script.

4. **Événements souris** : Les popups s'affichent au survol et se ferment quand la souris quitte l'entité.

5. **Clustering** : Seule la couche des localités utilise le clustering automatique via MarkerClusterGroup.

6. **Styles dynamiques** : La couche Région applique automatiquement la couleur appropriée selon le nom de la région.

## Modification des styles

Pour modifier les couleurs et les styles, éditez les fonctions `style_*_0()` correspondantes.

Exemple pour modifier la couleur d'une région :
```javascript
case 'DAKAR':
    return {
        fillColor: 'rgba(211,14,30,1.0)',  // À modifier
        // ... autres propriétés
    }
```

## Intégration dans le fichier index.html

Il suffit d'ajouter avant la balise fermante `</body>` :

```html
<script src="data/Region_2.js"></script>
<script src="data/Arrondissement_3.js"></script>
<script src="data/Departement_4.js"></script>
<script src="data/Routes_5.js"></script>
<script src="data/Hydrographie_6.js"></script>
<script src="data/localites_7.js"></script>
<script src="layers-geographic-extracted.js"></script>
```

Et dans la section script de la page (après la création de la carte), ajouter les fonctions et objets requis du fichier index_backup.html.
