import { Component } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent  {


  private debounceTimer ?: NodeJS.Timer;
  private busqueda : string = '';

  constructor(private placeServices: PlacesService) { }


  
  onQueryChanged(txtQuery : string = '') {
    
    if( this.debounceTimer ) clearTimeout( this.debounceTimer );

   

    this.debounceTimer = setTimeout( () => {

          

        if(this.busqueda !== txtQuery) {

            this.placeServices.getPlaceByQuery( txtQuery );
            
            this.busqueda = txtQuery;
        }
    }, 500)


  }

}
