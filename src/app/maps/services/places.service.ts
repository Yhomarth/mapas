
import { Injectable } from '@angular/core';
import { PlacesApiClient } from '../api';

import { Feature, PlacesResponse } from '../interfaces/places';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation?: [number, number];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  constructor(
    private placesApi: PlacesApiClient,
    private mapService: MapService) {
    this.getUserLocation();
   }

   private cargarDefecto() {
    this.places = [];
    this.isLoadingPlaces = false;
   }

  public async getUserLocation(): Promise<[number, number]>{

    return new Promise( (resolve, reject)=> {

      navigator.geolocation.getCurrentPosition(
        ({coords})=> {
          this.userLocation = [coords.longitude, coords.latitude];
          resolve(  this.userLocation );
        }, (err) => {
            alert('No se pudo tener la geolocalizacion');
            console.log(err);
            reject();
        }
      );

    });

  }


  getPlaceByQuery(query: string = ''){
    // TODO: evaluar estring vacio
    if(query.length === 0) {
      this.cargarDefecto();
      return; 
    }



    this.isLoadingPlaces = true;


    if(!this.userLocation) throw Error('No hay user Location');

    this.placesApi.get<PlacesResponse>(`/${query}.json`, {
      params : {
        proximity : this.userLocation.join(',')
      }
    })
      .subscribe( resp => {
        this.places = resp.features;
        this.isLoadingPlaces = false;
        this.mapService.createMarkersFromPlaces( resp.features, this.userLocation! );
      } );

  }


  deletePlace() {
    this.places = [];
  }


}
