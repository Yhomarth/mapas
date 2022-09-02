import { Component } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { Feature } from '../../interfaces/places';


@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent  {

  selectedID : string = ''

  constructor(
    private placesService: PlacesService,
    private mapService: MapService
              ) { }

  get isLoadingPlaces() : boolean {
    return this.placesService.isLoadingPlaces;
  }


  get places() : Feature [] {
    return this.placesService.places;
  }

  flyTo(place: Feature){
    this.selectedID = place.id;
    
    const [lng, lat] = place.center;
    this.mapService.flyto( [lng, lat] );
  }

  getDirections(place: Feature){

    if(!this.placesService.userLocation) throw Error('No hay userLocation');

    this.placesService.deletePlace();
     
    const start = this.placesService.userLocation;
    const end = place.center as [number, number];

    this.mapService.getRoutesBetweenPoints(start!, end);
  }





}
