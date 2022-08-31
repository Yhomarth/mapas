import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import Mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
 
Mapboxgl.accessToken = 'pk.eyJ1IjoieWhvbWFydGgiLCJhIjoiY2s5eWk1cGQ0MDBzZjNmbmFleDEycDZybSJ9.vPaqzzTbVnMc5yxhxgOfng';


if(!navigator.geolocation){
  alert('No tiene permitido la geolocalizacion');
  throw new Error('No tiene permitido la geolocalizacion');
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
