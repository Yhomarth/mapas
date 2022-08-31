import { Component } from '@angular/core';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.css']
})
export class BtnMyLocationComponent  {

  constructor(
    private mapServices: MapService,
    private placesServices: PlacesService
  ) { }

  irAUbicacion(){
    if(! this.placesServices.isUserLocationReady ) throw Error('No hay unicación de usuario');
    if(! this.mapServices.isMapReady ) throw Error('No hay mapa disponible');
    
    this.mapServices.flyto(this.placesServices.userLocation!);

  }

}
