import { Component,  } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-map-screen',
  templateUrl: './map-screen.component.html',
  styleUrls: ['./map-screen.component.css']
})
export class MapScreenComponent  {

  constructor(private placeServices: PlacesService) { }

  get isUserLocationReady() {
    return this.placeServices.isUserLocationReady;
  }

}
