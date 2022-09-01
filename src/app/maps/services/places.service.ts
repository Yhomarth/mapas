import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  constructor(private http: HttpClient) {
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

    // TODO: evaluar estring vacio
    this.isLoadingPlaces = true;

    this.http.get<PlacesResponse>(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?country=do&proximity=-69.90428181730165%2C18.468428500220156&types=place%2Cpostcode%2Caddress&language=es&access_token=pk.eyJ1IjoieWhvbWFydGgiLCJhIjoiY2s5eWk1cGQ0MDBzZjNmbmFleDEycDZybSJ9.vPaqzzTbVnMc5yxhxgOfng`)
      .subscribe( resp => {


        this.places = resp.features;
        this.isLoadingPlaces = false;
      } );

  }


}
