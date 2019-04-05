import { Component } from '@angular/core';
import { NavController, AlertController,Events } from 'ionic-angular';
import { ChooseExercisePage } from '../choose-exercise/choose-exercise';

@Component({
  selector: 'page-add-exercise',
  templateUrl: 'add-exercise.html'
})
export class AddExercisePage {
  name = "Please Select Workout"
  weight : number
  reps: number 
  chosen: chooseExerciseSingle
  sets: number
  

  //    Grab all the information sent from choose exercise in constructors
  constructor(public navCtrl: NavController, private alertCtrl:  AlertController, public events: Events) {
    this.events.subscribe('mm', (data) =>{
      this.chosen = data; 
      this.name = this.chosen.name
    });
  }
  goToChooseExercise(params){
    if (!params) params = {};
    this.navCtrl.push(ChooseExercisePage);
  }


  // This is the drop down for the rest time.
  rest = 0 
  selection = " "
  restTimeArray = ["00:15","00:30","00:45","01:00","01:15","01:30","01:45","02:00","02:15","03:30","03:45","04:00","04:15","04:30","04:45","05:00","06:00","07:00","08:00","09:00","10:00"]
  restTime() { 
    let alert = this.alertCtrl.create({title: "Select Rest Time M:S"});
    for (let i = 0; i < this.restTimeArray.length; i++) {
        alert.addInput({ type: 'radio', label: this.restTimeArray[i], value: this.restTimeArray[i]});
    }
    alert.addButton({
      text: 'OK', 
      handler: data => {
        this.selection = data
        var str: string = data
        var splitter = str.split(":")
       this.rest = parseInt(splitter[0]) * 60 + parseInt(splitter[1])
      }
    });
    alert.present();
  }

  //    This is form validation for the incomplete form.
  incompleteSubmit(msg){
    let alert = this.alertCtrl.create({
      title: 'Error Submiting',
      message: msg,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            console.log('Buy clicked');
          } 
        }
      ]
    });
    alert.present(); 
  } 

  //    If everything is good pass an event to the add workout screen with the new exercise
  goToAddWorkout(){
    var verify = false
    if (this.name == "" || this.chosen == undefined ||this.weight == undefined || this.reps == undefined  || this.sets == undefined || this.rest == 0){
      this.incompleteSubmit("Unable to submit : Name, Weight, Sets, Repetition, Rest Time, Select Weight Exercise must all be completed before you can submit")
    }
    else if (isNaN(this.weight) || isNaN(this.reps)  || isNaN(this.sets)){
      this.incompleteSubmit("Unable to submit : Invalid number in Reps, Sets or Weight")

    }
    else{
      verify = true 
    }

    if (verify){
    var exercise = {name:this.name, path: this.chosen.path, repetitions : this.reps, sets: this.sets, rest: this.rest, weight:this.weight}
    this.events.publish('my-message', exercise);

    this.navCtrl.pop();
    }
  } 
  goToAddWorkoutCancel(){
    this.navCtrl.pop();
  }
}
