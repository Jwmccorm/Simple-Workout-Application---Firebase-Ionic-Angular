import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EditWorkoutPage } from '../edit-workout/edit-workout';
import { AddExercisePage } from '../add-exercise/add-exercise';
import { ChooseExercisePage } from '../choose-exercise/choose-exercise';
import { AddWorkoutPage } from '../add-workout/add-workout';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-workout-planner',
  templateUrl: 'workout-planner.html'
})
export class WorkoutPlannerPage {

  emptyWorkout: boolean = false 
  loadTimer = false
  upComingWorkouts : [number, workout][] = []
  dayArray = ['Sundary', 'Monday', 'Wednesday','Tuesday', 'Thursday', 'Friday', 'Saturday']

  //  Get all the data from the database to display everything
  constructor(public navCtrl: NavController, public db: AngularFirestore) {
    var docRef = db.collection("users").doc(firebase.auth().currentUser.uid).valueChanges()
    var once = true

    //    Put the data into the upComingWorkouts to display to user
    docRef.subscribe(data => { 
        var test: any =data
        var wk : workouts = test.workouts
        if (once){
          if( wk.workouts != undefined ){
            for(var i = 0 ; i < wk.workouts.length; i++){
                this.upComingWorkouts.push([this.dayArray.indexOf(wk.workouts[i].day), wk.workouts[i]])
            } 
            this.emptyWorkout = false 
          }else{
            this.emptyWorkout = true
          }
          //    Sort based on day, that is why I stored as [number, workout]. Number represents day of week
          this.upComingWorkouts.sort()
          once = false
        }

        this. loadTimer = true
      } )
  }

  //    Go to the DB and delete what ever ITEM sent from the user request
  deleteWorkout(item){
    var docRef = this.db.collection("/users").doc(firebase.auth().currentUser.uid).valueChanges();
    var woPush : workouts = {workouts:[]}
    var once = true
    this.upComingWorkouts = []
    docRef.subscribe(data => {
      var test: any =data
      if (once){


        //    This is if the workouts exist, error catching
      if (test.workouts != undefined){
        var wo : workouts = test.workouts
        for (var i = 0; i < wo.workouts.length; i++){
          //    This is the part that filters out the one we want to delete
          woPush.workouts = wo.workouts.filter(o => o.name != item.name)
        }
      }
      for(var i = 0 ; i < woPush.workouts.length; i++){
          this.upComingWorkouts.push([this.dayArray.indexOf(woPush.workouts[i].day), woPush.workouts[i]])
      }
    } 
    })  

    //    Run once so we only do this operation once since it is writing
    //    Another subscribe since they are done asynronously 
    var runOnce = true 
    docRef.subscribe(data => {
      var daany:any = data
      if (runOnce) {
        this.db.collection('/users').doc(firebase.auth().currentUser.uid).set({
          exercises: daany.exercises,
          workouts: woPush 
        }) 
        runOnce = false
        this.upComingWorkouts = [] 

        for (var i = 0 ; i < woPush.workouts.length; i++){
          this.upComingWorkouts.push([this.dayArray.indexOf(woPush.workouts[i].day), woPush.workouts[i]])

        }
      }

    })
  }

  workoutView = false
  mainView = true

  itemView :workout
  
  //    True falses for what to display on the screen
  viewWorkout(item){
    this.itemView = item
    this.workoutView = true
    this.mainView = false
  }

  returnView(){
    this.workoutView = false
    this.mainView = true
  }


  //    Navigation
  goToEditWorkout(params){
    if (!params) params = {}; 
    this.navCtrl.push(EditWorkoutPage);
  }goToAddExercise(params){
    if (!params) params = {};
    this.navCtrl.push(AddExercisePage);
  }goToChooseExercise(params){
    if (!params) params = {}; 
    this.navCtrl.push(ChooseExercisePage);
  }goToAddWorkout(params){
    if (!params) params = {};
    this.navCtrl.setRoot(AddWorkoutPage);
  }
}
