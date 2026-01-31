(function(){
  function initGeolocation(map){
    if(!map) return;
    let watchId = null;
    let marker = null;
    let accuracyCircle = null;

    // Button
    const button = document.createElement('button');
    button.id = 'geo-btn';
    button.title = 'Trouver ma position';
    button.innerHTML = '<i class="fa fa-location-arrow"></i>';
    button.className = 'navbar-btn';
    button.style.position = 'absolute';
    button.style.bottom = '90px';
    button.style.left = '20px';
    button.style.zIndex = 1000;
    document.body.appendChild(button);

    let isTracking = false;

    function success(pos){
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      const accuracy = pos.coords.accuracy || 50;
      if(marker) {
        marker.setLatLng([lat,lon]);
        accuracyCircle.setLatLng([lat,lon]).setRadius(accuracy);
      } else {
        marker = L.marker([lat,lon], {title: 'Ma position'}).addTo(map);
        accuracyCircle = L.circle([lat,lon], {radius: accuracy, color: '#27ae60', fillColor: '#27ae60', fillOpacity: 0.12}).addTo(map);
      }
      map.setView([lat,lon], 15);
    }

    function error(err){
      console.warn('Geolocation error', err);
      alert('Géolocalisation indisponible: ' + (err.message || err.code));
    }

    button.addEventListener('click', function(){
      if(isTracking){
        if(watchId) navigator.geolocation.clearWatch(watchId);
        isTracking=false;
        button.classList.remove('active');
      } else {
        if('geolocation' in navigator){
          watchId = navigator.geolocation.watchPosition(success, error, {enableHighAccuracy:true, maximumAge:10000, timeout:10000});
          isTracking=true;
          button.classList.add('active');
        } else alert('Géolocalisation non supportée par votre navigateur.');
      }
    });

    // Stop watching when page is hidden
    document.addEventListener('visibilitychange', function(){ if(document.hidden && watchId) { navigator.geolocation.clearWatch(watchId); isTracking=false; button.classList.remove('active'); } });
  }
  window.initGeolocation = initGeolocation;
})();