import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Question } from '../interface/question';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  cardState:boolean = false;
  currentQuestion:string = '';
  currentAnswer:string = '';
  secondDisplay:string = '';
  i:number=0;
  question:Array<Question> = [];
  hint:string = '';
  type:string ='';
  module: string = '';
  bgColour:string = '';
  bgImage:string = '';
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private afs:AngularFirestore
  ) { }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(params => {
      this.module = params['module'];
      this.type = params['type'];
   });
   this.checkBg(this.module);
   this.checkHint(this.type);
   this.question = await this.getModuleQuestions()
  }

  checkBg(module:string){
    switch(module){
      case 'Digital Production':
        this.bgColour = '#231F26';
        this.bgImage = '../assets/prog.png'
        console.log('working')
        break;
      case 'Security':
        this.bgColour = '#0A2F3C';
        this.bgImage = '../assets/cyb.png';
        break;
      case 'Business Environments':
        this.bgColour = '#121821';
        this.bgImage = '../assets/bse.png';
        break
      case 'Data in Computing':
        this.bgColour = '#232432';
        this.bgImage = '../assets/data.png';
        break;
      case 'Legislation':
        this.bgColour = '#675052';
        this.bgImage = '../assets/legi.png';
        break;
      default:
        this.bgColour = '#231F26'
        this.bgImage = '../assets/prog.png';
    }
  }

  checkHint(type:string){
    switch(type){
      case 'Describe':
        this.hint = 'Present two (or more) linked descriptive points characteristics, features uses or processes. Do not need to add a justification or reason'
        break;
      case 'Evaluate':
        this.hint = 'Review information then bring it together to form a conclusion, drawing on evidence including strengths, weaknesses, alternativeactions, relevant data or information. Come to a supported judgementof a subject’s qualities and relation to its context. '
        break;
      case 'Explain':
        this.hint = 'An explanation requires a justification/exemplification of a point. The answer must contain some element of reasoning/justification, this can include mathematical/logical explanations.'
        break
      case 'Identify':
        this.hint = 'Usually requires some key information to be selected from a givenstimulus/resource.'
        break;
      case 'State':
        this.hint = 'A recall of one or more pieces of information.'
        break;
      case 'Develop':
        this.hint = 'Produce a section of code to provide a solution to a problem'
        break;
      default:
        this.hint = 'No hint available :('
    }
  }

  home(){
    window.history.go(-1)
  }

  getModuleQuestions(){
    let db:any = []
    let collection = this.afs.collection(`/Approved/${this.module}/${this.type}`)
    let data = collection.valueChanges()
    data.subscribe(resp=>{
      resp.forEach(resp=>{
        db.push(resp)
        this.currentQuestion = db[0].question
      })
    })
    return db
  }

  changeCardState(){
    this.cardState = !this.cardState;
    this.secondDisplay = 'feedback';
    this.currentAnswer = this.question[this.i].answer;
  }

  next(){
    if(this.i < this.question.length -1){
      this.i +=  1
    }
    else{
      this.i = 0
    }
    this.currentQuestion = this.question[this.i].question;
  }

  skip(index:number){
    this.i = index;
    this.currentQuestion = this.question[this.i].question;
    this.currentAnswer = this.question[this.i].answer;
  }

  displaySec(display: string){
    this.secondDisplay = display;
  }

}