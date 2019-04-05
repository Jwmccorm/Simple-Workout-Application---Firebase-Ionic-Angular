import { Component, ViewChild, Input } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { WorkoutPlannerPage } from '../pages/workout-planner/workout-planner';
import { EditWorkoutPage } from '../pages/edit-workout/edit-workout';
import { AddExercisePage } from '../pages/add-exercise/add-exercise';
import { ChooseExercisePage } from '../pages/choose-exercise/choose-exercise';
import { AddWorkoutPage } from '../pages/add-workout/add-workout';
import { SettingsPage } from '../pages/settings/settings';
import { ProgressPage } from '../pages/progress/progress';
import { WelcomePage } from '../pages/welcome/welcome';

import { HomePage } from '../pages/home/home';  
  

  
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
    rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => { 
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  //    All navigation for the side tab
  goToWorkoutPlanner(params){
    if (!params) params = {};
    this.navCtrl.setRoot(WorkoutPlannerPage);
  }goToEditWorkout(params){
    if (!params) params = {};
    this.navCtrl.setRoot(EditWorkoutPage);
  }goToAddExercise(params){
    if (!params) params = {};
    this.navCtrl.setRoot(AddExercisePage);
  }goToChooseExercise(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ChooseExercisePage);
  }goToAddWorkout(params){
    if (!params) params = {};
    this.navCtrl.setRoot(AddWorkoutPage);
  }goToSettings(params){
    if (!params) params = {};
    this.navCtrl.setRoot(SettingsPage);
  }goToProgress(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ProgressPage);
  }goToWelcome(params){
    if (!params) params = {};
    this.navCtrl.setRoot(WelcomePage);
  }
}
