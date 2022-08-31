import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Map } from 'mapbox-gl';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit {


  @ViewChild('mapDiv') 
  mapDiv !: ElementRef;

  constructor(private placeService: PlacesService) { }

  ngAfterViewInit(): void {

    if(!this.placeService.userLocation)
        throw new Error('No hay placeService.userLocation');

    const map = new Map({
      container: this.mapDiv.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.placeService.userLocation, // starting position [lng, lat]
      zoom: 14, // starting zoom
      });
    
  }

}
