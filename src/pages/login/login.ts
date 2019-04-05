import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { WelcomePage } from '../welcome/welcome';
import { SignupPage } from '../signup/signup';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})



export class LoginPage {

  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth,public  db: AngularFirestore,  private menu: MenuController) {
  }


/*
  Login functions add new users to the DB and to fiirebase.
  Not overly complicated just simple DB calls. 
  Mainly using firebase's angular code to make my life easier

*/
 
doGoogleLogin(){
  return new Promise<any>((resolve, reject) => {
      
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile'); 
    provider.addScope('email'); 
    this.afAuth.auth 
    .signInWithPopup(provider) 
    .then(res => {
      resolve(res);
      
      this.db.collection('/users').doc(firebase.auth().currentUser.uid).get().subscribe(doc => {

        //    IF NEW USER -> Make a table in the database
        if(!doc.exists){ 
          this.db.collection('/users').doc(firebase.auth().currentUser.uid).set({
            workouts: [],
            exercises:[{name:"Back Squat",weight:[]},{name:"Bench Press",weight:[]},{name:"Bent Over Rows",weight:[]},{name:"Bicep Curl",weight:[]},{name:"Calf Raise",weight:[]},{name:"Crunches",weight:[]},
          {name:"Dead Lift",weight:[]},{name:"Dips",weight:[]},{name:"Dumbbell Flys",weight:[]},{name:"Front Squat",weight:[]},{name:"Lat Pulldown",weight:[]},{name:"Lateral Raises", weight:[]},{name:"Leg Curl",weight:[]},
          {name:"Leg Extensions", weight:[]},{name:"Leg Press",weight:[]},{name:"Leg Raises",weight:[]},{name:"Pullover",weight:[]},{name:"Pushdown",weight:[]},{name:"Seated Calf Raise", weight:[]},{name:"Should Press",weight:[]},
          {name:"Shrug",weight:[]},{name:"Triceps Extension", weight:[]},{name:"Upright Row",weight:[]},{name:"Upright Rows",weight:[]},{name:"Walking Lunges", weight:[]}]
          })
        } 
        this.navCtrl.setRoot(WelcomePage);
      })
    })
  }) 
} 
ionViewDidEnter() {
  this.menu.swipeEnable(false);
}

ionViewWillLeave() {
  this.menu.swipeEnable(true); 
 }
doFacebookLogin(){
  return new Promise<any>((resolve, reject) => {
    let provider = new firebase.auth.FacebookAuthProvider();
    this.afAuth.auth
    .signInWithPopup(provider)
    .then(res => {
      resolve(res);
      this.db.collection('/users').doc(firebase.auth().currentUser.uid).get().subscribe(doc => {
        //    IF NEW USER -> Make a table in the database

        if(!doc.exists){ 
          this.db.collection('/users').doc(firebase.auth().currentUser.uid).set({
            workouts: [],
            exercises:[{name:"Back Squat",weight:[]},{name:"Bench Press",weight:[]},{name:"Bent Over Rows",weight:[]},{name:"Bicep Curl",weight:[]},{name:"Calf Raise",weight:[]},{name:"Crunches",weight:[]},
          {name:"Dead Lift",weight:[]},{name:"Dips",weight:[]},{name:"Dumbbell Flys",weight:[]},{name:"Front Squat",weight:[]},{name:"Lat Pulldown",weight:[]},{name:"Lateral Raises", weight:[]},{name:"Leg Curl",weight:[]},
          {name:"Leg Extensions", weight:[]},{name:"Leg Press",weight:[]},{name:"Leg Raises",weight:[]},{name:"Pullover",weight:[]},{name:"Pushdown",weight:[]},{name:"Seated Calf Raise", weight:[]},{name:"Should Press",weight:[]},
          {name:"Shrug",weight:[]},{name:"Triceps Extension", weight:[]},{name:"Upright Row",weight:[]},{name:"Upright Rows",weight:[]},{name:"Walking Lunges", weight:[]}]
          })
        } 
        this.navCtrl.setRoot(WelcomePage);
      })
    }, err => {
      console.log(err);
      reject(err);
    })
  })
}


  goToWelcome(params){
    if (!params) params = {};
    this.navCtrl.setRoot(WelcomePage);
  }goToSignup(params){ 
    if (!params) params = {};
    this.navCtrl.push(SignupPage);
  }goToLogin(params){
    if (!params) params = {};
    this.navCtrl.push(LoginPage);
  }
}
