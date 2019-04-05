import { Component } from '@angular/core';
import { NavController, AlertController, ModalController, Events } from 'ionic-angular';
import { AddExercisePage } from '../add-exercise/add-exercise';
import { ChooseExercisePage } from '../choose-exercise/choose-exercise';
import { WorkoutPlannerPage } from '../workout-planner/workout-planner';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-add-workout',
  templateUrl: 'add-workout.html'
})
export class AddWorkoutPage {
  workoutName = ""
  exerciseCount = 0
  newExerciseList : exercise[] = []
  workoutGet: workout
  emptyWorkout = true
  code:any
Events

//    Grab all the data from the exercise screen using events
  constructor(public navCtrl: NavController, private alertCtrl:  AlertController, public modalController: ModalController, public events1: Events, public db: AngularFirestore) {
    this.events1.subscribe('my-message', (data) =>{
      this.newExerciseList.push(data); 
      console.log(data)
      this.exerciseCount += 1
    });

  }

  //    Navigation
  goToAddExercise(params){
    if (!params) params = {};
    this.navCtrl.push(AddExercisePage);
    
  }goToChooseExercise(params){
    if (!params) params = {};
    this.navCtrl.push(ChooseExercisePage, {delegate: this});
  }

  goToWorkoutPlannerCancel(params){
    if (!params) params = {};
    this.navCtrl.setRoot(WorkoutPlannerPage);

  }

  //    This is for the form validation to display a msg to the user
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


  //    Travel to workout planner with the new workout we just created
  goToWorkoutPlanner(){
    var verify = false
    
    //validation 
    if (this.workoutName == '' || this.dayOfWeek == "Please Select" || this.newExerciseList.length == 0){
      this.incompleteSubmit("Workout name, day of week and exercises must be completed before submitting")
    }else{
      verify = true
    }

    //    If everything ok get ready to send the data to DB
    if (verify){
      var docRef = this.db.collection("/users").doc(firebase.auth().currentUser.uid).valueChanges();
      var woPush : workouts = {workouts:[]}
  
      //    Get all of the DB information
      docRef.subscribe(data => {
        var test: any =data
        if (test.workouts.workouts != undefined){
          var wo : workouts = test.workouts
  
          for (var i = 0; i < wo.workouts.length; i++){
            woPush.workouts.push({day: wo.workouts[i].day , name: wo.workouts[i].name , exercises: wo.workouts[i].exercises})  
          }
        }
  
      })  

      //    Write to the DB
      var runOnce = true  
      docRef.subscribe(data => {
        if (runOnce) {
          var dataWorkouts:any = data

          woPush.workouts.push({name: this.workoutName, day: this.dayOfWeek, exercises: this.newExerciseList})
          this.db.collection('/users').doc(firebase.auth().currentUser.uid).set({
            exercises: dataWorkouts.exercises,
            workouts: woPush 
          }) 
          runOnce = false 
        }
  
      })

      //    Now navigate
      docRef.subscribe(data => {
        this.navCtrl.setRoot(WorkoutPlannerPage);

      })
    }  
 
  } 

  // Dropdown for the day of the weeks
  dayOfWeek = "Please Select"
  day = ['Sundary', 'Monday', 'Tuesday','Wednesday', 'Thursday', 'Friday', 'Saturday']
  selectDay() {
    let alert = this.alertCtrl.create();
    for (let i = 0; i < this.day.length; i++) {
        alert.addInput({ type: 'radio', label: this.day[i], value: this.day[i]});
    }
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.dayOfWeek = data  
      }
    });
    alert.present();
  }
}
