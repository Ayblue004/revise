import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { RefreshService } from '../refresh.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  email:string = '';
  password:string = '';
  admin:boolean = false;
  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private refresh: RefreshService
  ){}

  ngOnInit(): void {
  }

  route(){
    this.router.navigate(['modules'])
  }

  toggleAdmin(){
    this.admin = !this.admin
  }
  signIn(){
    this.router.navigate(['admin'])
  }

  onSubmit(){
    this.auth.signInWithEmailAndPassword(this.email,this.password)
    .then(resp=>{
      console.log("User logged In")
      this.signIn()
      this.refresh.toggle()
    })
    .catch(resp=>{
      alert("Wrong email or password")
    })
  }
}
