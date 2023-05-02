import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Question } from '../interface/question';


@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.component.html',
  styleUrls: ['./contribute.component.scss']
})

export class ContributeComponent implements OnInit {
  private dbCollection: AngularFirestoreCollection<Question>;
  private searchDbCollection: AngularFirestoreCollection<Question>;
  searchDb: Observable<Question[]>;
  suggestion: Array<string> = [];
  newQuestion:Question ={
    answer:'',
    category:'',
    id:'',
    module:'',
    question:''
  }
  constructor(
    private router:Router,
    private afs:AngularFirestore
  ) { }


  question: Observable<Question[]>;
  searchEngineDb:any;
  async ngOnInit(): Promise<void> {
    this.searchEngineDb = await this.getAllQuestions()
  }

  getAllQuestions(): Promise<Question[]>{
    const module = ['Business', 'Data', 'Digital', 'Legislation', 'Security']
    const category = ['Describe', 'Evaluate', 'Identify', 'State', 'Develop']
    const db:any = []
    module.forEach(module=>{
      category.forEach(category=>{
        let collection= this.afs.collection(`/Approved/${module}/${category}`);
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



  filterSuggest(){
  this.searchEngineDb.forEach((element:any) => {
      if(element.question.toLowerCase().includes(`${this.newQuestion.question.toLocaleLowerCase()}`)){
        this.suggestion.push(element.question)
      }
    });
  }

 
  reset(){
    this.newQuestion = {
      answer:'',
      category:'',
      id:'',
      module:'',
      question:''
    }
  }

  home(){
    this.router.navigate([''])
  }

contribute(){
  let id = this.afs.createId();
  this.newQuestion.id = id;
  this.afs.collection(`/Pending/${this.newQuestion.module}/${this.newQuestion.category}`)
  .doc(id).set(this.newQuestion)
  .then((resp)=>{
    console.log(resp)
  })
  this.reset()
}

}
