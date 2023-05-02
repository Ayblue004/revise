import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {
  bgColour:string = '';
  bgImage:string = '';
  module:string ='';
  category:Array<string> =[
    'Describe', 'Evaluate','Explain',
    'Identify','State','Develop'
  ];
  constructor(
    private route: ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.module = params['class'];
   });
   this.checkBg(this.module);
  }

  checkBg(module:string){
    console.log(this.module)
    switch(module){
      case 'Digital Production':
        this.bgColour = '#231F26';
        this.bgImage = './assets/prog.png'
        break;
      case 'Security':
        this.bgColour = '#0A2F3C';
        this.bgImage = './assets/cyb.png';
        break;
      case 'Business Environments':
        this.bgColour = '#121821';
        this.bgImage = './assets/bse.png';
        break
      case 'Data in Computing':
        this.bgColour = '#232432';
        this.bgImage = './assets/data.png';
        break;
      case 'Legislation':
        this.bgColour = '#675052';
        this.bgImage = './assets/legi.png';
        break;
      default:
        this.bgColour = '#231F26'
        this.bgImage = './assets/prog.png';
    }
  }

  home(){
    window.history.go(-1)
  }

  select(type:any){
    this.router.navigate([`cards/${this.module}/${type}`])
  } 
}
