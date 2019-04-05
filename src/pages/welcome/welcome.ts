import { Component, Testability } from '@angular/core';
import { NavController, Events, AlertController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { WorkoutPlannerPage } from '../workout-planner/workout-planner';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})

//    Page that shows the workouts and allows you to start and finish a workout if it is the right day.
export class WelcomePage {
  interval = 30
  workouts: workouts
  dayArray = ['Sundary', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  loader = false
  todayName = this.dayArray[(new Date()).getDay()]
  comingUpDb: workout[] = []
  todayWorkouts: workout[] = []
  upComingWorkouts: [number, workout][] = []
  emptyWorkout = false


  //    Constructor gets all the data from the DB and gets ready to be displayed to the user
  constructor(public navCtrl: NavController, public db: AngularFirestore, public events: Events, private alertCtrl: AlertController) {
    var docRef = db.collection("users").doc(firebase.auth().currentUser.uid).valueChanges()  // .doc(firebase.auth().currentUser.uid).valueChanges() 
    docRef.subscribe(data => {

      {
        var test: any = data
        this.workouts = test.workouts
      }
      if (this.workouts.workouts == undefined) {
        this.emptyWorkout = true
      } else {


        var pusher = true
        for (var i = 0; i < this.workouts.workouts.length; i++) {
          pusher = true
          if (this.workouts.workouts[i].day == this.todayName && this.todayWorkouts.map(o => o.name == this.workouts.workouts[i].name).indexOf(true) == -1) {
            this.todayWorkouts.push(this.workouts.workouts[i])
          } else if (this.upComingWorkouts.map(o => o[1].name == this.workouts.workouts[i].name).indexOf(true) == -1) {
            this.upComingWorkouts.push([this.dayArray.indexOf(this.workouts.workouts[i].day), this.workouts.workouts[i]])
          }
        }
        this.upComingWorkouts.sort()

      } this.loader = true
    })
  }

  //    Navigation
  goToWorkoutPlanner(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(WorkoutPlannerPage);
  }

  welcome = true
  headerText = "Welcome"
  started = false
  startedWorkout: workout

  //    This is to stop the workout and go to the base welcome screen
  cancelWorkoutStart() {
    this.started = false
    this.welcome = true
  }


  //    This is the conditionals to change the view of the page
  goToStartWorkout(item) {
    this.startedWorkout = item
    this.headerText = this.startedWorkout.name
    this.started = true
    this.welcome = false

  }
  maxtime: any = 30

  //    Rest timer for the exercises
  startRestTimer(item) {
    let audio = new Audio();

    var intervalVar = setInterval(function () {
      audio.src = "../assets/sounds/over.wav";
      audio.load();
      audio.play();
      clearInterval(intervalVar)
    }, item * 1000)
  }

  completed = false

  //    Once finished change the bools to show different ionic elements
  finishWorkout() {
    this.started = false
    this.welcome = false
    this.completed = true
  }
  runOnce = true
  pastWeight: [String, number][] = []


  //    This is for once you are complete
  listFinish: { name: String, weight: number[] }[] = []
  arrayExample: (string | number | boolean)[] = []
  done: workout

  //    This means we have an invalid user entry for the new weight/rest/reps
  incompleteSubmit(msg) {
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
          text: 'Buy',
          handler: () => {
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }
  workoutPush: workouts

  //    Function writes all the new data to the DB. 
  //    This is for updating the weight in the workout and writing down the weight you complete for the stats page
  submitWorkout() {

    var invalidEntry = false

    for (var i = 0; i < this.startedWorkout.exercises.length; i++) {
      if (isNaN(this.startedWorkout.exercises[i].weight) || isNaN(this.startedWorkout.exercises[i].rest) || isNaN(this.startedWorkout.exercises[i].sets)) {
        invalidEntry = true
      }

    }

    if (invalidEntry) {
      this.incompleteSubmit("All changes must be numbers")

    } else {



      var docRef = this.db.collection("users").doc(firebase.auth().currentUser.uid).valueChanges();


      docRef.subscribe(data => {
        var datas: any = data
        this.listFinish = datas.exercises
        for (var i = 0; i < this.listFinish.length; i++) {
          for (var j = 0; j < this.startedWorkout.exercises.length; j++) {
            if (this.startedWorkout.exercises[j].name == this.listFinish[i].name) {
              this.listFinish[i].weight.push(this.startedWorkout.exercises[j].weight)
            }
          }
        }
      })
      docRef.subscribe(data => {
        if (this.runOnce) {
          var an: any = data
          this.workoutPush = an.workouts
          var nameList = this.listFinish.map(o => o.name)


          //    This is complicated

          //    Find the workout the user just completed and update the new weights they have entered
          for (var i = 0; i < this.workoutPush.workouts.length; i++) {
            var found = true
            for (var j = 0; j < nameList.length; j++) {
              if (this.workoutPush.workouts[i].exercises.map(o => o.name.toString).indexOf(nameList[j].toString) == -1) {
                found = false
              }
              if (found) {
                for (var k = 0; k < this.workoutPush.workouts[i].exercises.length; k++) {
                  for (var l = 0; l < this.listFinish.length; l++) {
                    if (this.workoutPush.workouts[i].exercises[k].name == this.listFinish[l].name) {
                      this.workoutPush.workouts[i].exercises[k].weight = this.listFinish[l].weight[this.listFinish[l].weight.length - 1]
                    }
                  }
                }
                break;
              }
            }
          }


          this.runOnce = false
        }

      })
      var runOnce2 = true

      //    Write all the information to the DB
      docRef.subscribe(data => {
        if (runOnce2) {
          var dataWorkouts: any = data
          this.db.collection('/users').doc(firebase.auth().currentUser.uid).set({
            workouts: dataWorkouts.workouts,
            exercises: this.listFinish
          })
          runOnce2 = false
        }

      })

      //    Change the view of the page
      this.started = false
      this.welcome = true
      this.completed = false

    }
  }
}
 