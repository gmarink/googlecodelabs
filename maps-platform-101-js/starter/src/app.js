/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import MarkerClusterer from '@google/markerclustererplus';

loadMapsJSAPI();

function loadMapsJSAPI() {
    const googleMapsAPIKey = 'AIzaSyCgOen_atK44OdcXeUqAjdfVEC1-i99eTo';
    const googleMapsAPIURI = `https://maps.googleapis.com/maps/api/js?key=${googleMapsAPIKey}&callback=runApp`;
  
    const script = document.createElement('script');
    script.src = googleMapsAPIURI;
    script.defer = true;
    script.async = true;

    window.runApp = runApp;

    document.head.appendChild(script);

}
  
  function runApp() {
    console.log('Maps JS API loaded'); 
    const map = displayMap(); 
    const markers = addMarkers(map);
    clusterMarkers(map, markers);
    addPanToMarker(map, markers);


  }
  
  function displayMap() {
    const mapOptions = {
      center: { lat: -10.571695709857314, lng: -63.618843372483646 },
      zoom: 16
    };
    const mapDiv = document.getElementById('map');
    return new google.maps.Map(mapDiv, mapOptions);

  }
  
  function addMarkers(map) {
    const locations = {
      operaHouse: { lat: -10.569579083309433, lng: -63.62022936132163 },
      tarongaZoo: { lat: -10.569980437533133, lng: -63.62142868923375 },
      manlyBeach: { lat: -10.56734654086553, lng: -63.616848277314055 },
      hyderPark: { lat: -10.573366842905976, lng: -63.61678448327618 },
      theRocks: { lat: -10.57095873625546, lng: -63.617868981920125 },
      circularQuay: {lat: -10.573028204049724, lng: -63.62409528001709 },
      harbourBridge: { lat: -10.572212960826457, lng:-63.6215052420792 }
    }
  
   
  const markers = [];
  for (const location in locations) {
    const markerOptions = {
      map: map,
      position: locations[location],
      icon: './img/custom_pin.png'
    }
    const marker = new google.maps.Marker(markerOptions);
    markers.push(marker);
  }
  return markers;
}
function clusterMarkers(map, markers) {
  const clustererOptions = { imagePath: './img/m' }
  const markerCluster = new MarkerClusterer(map, markers, clustererOptions);
}

function addPanToMarker(map, markers) {
  let circle;
  markers.map(marker => {
    marker.addListener('click', event => {
      const location = { lat: event.latLng.lat(), lng: event.latLng.lng() };
      map.panTo(location);
      if (circle) {
        circle.setMap(null);
      }
      circle = drawCircle(map, location);
    });
  });
}

function drawCircle(map, location) {
  const circleOptions = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 1,
    map: map,
    center: location,
    radius: 800
  }
  const circle = new google.maps.Circle(circleOptions);
  return circle;
}


