import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddExercisePage } from '../add-exercise/add-exercise';
import { ChooseExercisePage } from '../choose-exercise/choose-exercise';

@Component({
  selector: 'page-edit-workout',
  templateUrl: 'edit-workout.html'
})
export class EditWorkoutPage {

  /// THIS PAGE WAS NEVER ADDED

  constructor(public navCtrl: NavController) {
  }
  goToAddExercise(params){
    if (!params) params = {};
    this.navCtrl.push(AddExercisePage);
  }goToChooseExercise(params){
    if (!params) params = {};
    this.navCtrl.push(ChooseExercisePage);
  }
}
   