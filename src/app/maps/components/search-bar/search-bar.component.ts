import { Component } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent  {


  private debounceTimer ?: NodeJS.Timer;
  private busqueda : string = '';

  constructor() { }


  
  onQueryChanged(txtQuery : string = '') {
    
    if( this.debounceTimer ) clearTimeout( this.debounceTimer );

    this.debounceTimer = setTimeout( () => {

        if((txtQuery.length > 2) && this.busqueda !== txtQuery) {

            console.log('LLamar esto : ', txtQuery);
            
            this.busqueda = txtQuery;
        }
    }, 500)


  }

}
