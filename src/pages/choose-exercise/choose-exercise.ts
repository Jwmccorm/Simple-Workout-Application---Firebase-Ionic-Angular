import { Component } from '@angular/core';
import { NavController , Events} from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'page-choose-exercise',
  templateUrl: 'choose-exercise.html'
})
export class ChooseExercisePage{
  cer : chooseExerciseList ={list:[]}

  constructor(public navCtrl: NavController, db: AngularFirestore, public events: Events) {

    //    Get the data
    var docRef = db.collection('/exercises').doc("/exercise").valueChanges();

    docRef.subscribe(data => {
      var test: any =data
     this.cer = test.Collection
    } )
  
  } 

 
  chosen(item){
    this.events.publish('mm', item);
    this.navCtrl.pop()
  }
    
}
 