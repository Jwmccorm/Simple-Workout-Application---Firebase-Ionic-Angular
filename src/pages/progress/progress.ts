import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-progress',
  templateUrl: 'progress.html'
})
export class ProgressPage {

  gStats : {title:String, type:string, data:[number,number][], options:{hAxis: {title: string},vAxis:{title: string}}}[] = []


  constructor(public navCtrl: NavController , public db: AngularFirestore ) {
    var docRef = this.db.collection("users").doc(firebase.auth().currentUser.uid).valueChanges();

    //    This for getting the information on the users weights to be displayed using google charts
    docRef.subscribe(data => {  
      var datas: any = data
      for (var  i = 0 ; i < datas.exercises.length;i++){
        var numberList:[number,number][] = []
        var numberCount = 0 
        var nameGet: string = datas.exercises[i].name 
        for(var j = 0 ; j < datas.exercises[i].weight.length; j++){
          numberList.push([numberCount++, +datas.exercises[i].weight[j]])
        }
        if (numberCount != 0 ){
          this.gStats.push({title:nameGet, type:"LineChart", data:numberList, options:{hAxis: {title: 'Workout #'},vAxis:{title: 'Weight (Pounds)'}}})

        } 

      } 
    })
  }
  
}
