import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {
  refresh:boolean = false;
  constructor() { }

  toggle(){
    this.refresh = true;
  }

}
