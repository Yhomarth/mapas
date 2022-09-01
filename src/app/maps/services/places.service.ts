
import { Injectable } from '@angular/core';
import { PlacesApiClient } from '../api';

import { Feature, PlacesResponse } from '../interfaces/places';

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

  constructor(private placesApi: PlacesApiClient) {
    this.getUserLocation();
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

    if(!this.userLocation) throw Error('No hay user Location');

    // TODO: evaluar estring vacio
    this.isLoadingPlaces = true;

    this.placesApi.get<PlacesResponse>(`/${query}.json`, {
      params : {
        proximity : this.userLocation.join(',')
      }
    })
      .subscribe( resp => {
        this.places = resp.features;
        this.isLoadingPlaces = false;
      } );

  }


}
