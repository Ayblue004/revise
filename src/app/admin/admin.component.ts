import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Question } from '../interface/question';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  review:boolean = false;
  revQuestion = {
    answer:'',
    category:'',
    id:'',
    module:'',
    question:'',
    similar:0
  }
  questions:any = [];
  constructor(
    private router:Router,
    private afs: AngularFirestore
  ) { }

  async ngOnInit(): Promise<void> {
    this.questions = await this.getAllQuestions()
  }

  home(){
    this.router.navigate([''])
  }

  openReview(){
    this.review = true;
  }

  closeReview(){
    this.review = false;
  }

  reviewQuestion(data:Question){
    this.revQuestion.question = data.question;
    this.revQuestion.answer = data.answer;
    this.revQuestion.category = data.category;
    this.revQuestion.module = data.module;
  }

  getAllQuestions(): Promise<Question[]>{
    const module = ['Business', 'Data', 'Digital', 'Legislation', 'Security']
    const category = ['Describe', 'Evaluate', 'Identify', 'State', 'Develop','Explain']
    const db:any = []
    module.forEach(module=>{
      category.forEach(category=>{
        let collection= this.afs.collection(`/Pending/${module}/${category}`);
        let data = collection.valueChanges()
        data.subscribe(resp=>{
          resp.forEach(resp=>{
            db.push(resp)
          }) 
        })
      })
    }) 
    return db
  }

 async approve(data:Question){
    this.reviewQuestion(data);
    let id = this.afs.createId();
    this.revQuestion.id = id;
    this.afs.collection(`/Approved/${this.revQuestion.module}/${this.revQuestion.category}`)
    .doc(id).set(this.revQuestion)
    .then((resp)=>{
      console.log(resp)
    })
    this.del(data)
    this.questions = await this.getAllQuestions()
  }

 async del(que:Question){
    this.reviewQuestion(que)
    this.afs.doc(`/Pending/${this.revQuestion.module}/${this.revQuestion.category}/${que.id}`).delete()
    this.questions = await this.getAllQuestions()
  }
  
}
