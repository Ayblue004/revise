import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss']
})
export class ModuleComponent implements OnInit {
  currentBg:string = '#232432';
  currentIndex:number = 0;
  modules: Array<any>=[
    {
      bg:'#231F26',
      name:'Digital Production',
      tutor:'SAJ',
      image:'./assets/prog.png'
    },
    {
      bg:'#0A2F3C',
      name:'Security',
      tutor:'SAM',
      image:'./assets/cyb.png'
    },
    {
      bg:'#121821',
      name:'Business Environments',
      tutor:'LIAM',
      image:'./assets/bse.png'
    },
    {
      bg:'#232432',
      name:'Data in Computing',
      tutor:'Trevor',
      image:'./assets/data.png'
    },
    {
      bg:'#675052',
      name:'Legislation',
      tutor:'SAJ',
      image:'./assets/legi.png'
    }
  ];
  currentDisplay:any = this.modules[this.currentIndex];
  constructor(
    private router: Router
  ) { }
  ngOnInit(): void {
  }

  change(){
    if(this.currentIndex < 4){
      this.currentIndex += 1
      this.currentDisplay = this.modules[this.currentIndex]
      console.log(this.currentDisplay, this.currentIndex)
    }else if(this.currentIndex == 4){
      this.currentIndex = 0
      this.currentDisplay = this.modules[this.currentIndex]
    }
  }

  portal(){
    this.router.navigate([`portal/${this.modules[this.currentIndex].name}`])
  }
  
  route(loc:string){
    this.router.navigate([loc])
  }
}
