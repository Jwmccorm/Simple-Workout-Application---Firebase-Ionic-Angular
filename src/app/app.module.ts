import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CartPage } from '../pages/cart/cart';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { WelcomePage } from '../pages/welcome/welcome';
import { WorkoutCalanderPage } from '../pages/workout-calander/workout-calander';
import { WorkoutPlannerPage } from '../pages/workout-planner/workout-planner';
import { AddWorkoutPage } from '../pages/add-workout/add-workout';
import { EditWorkoutPage } from '../pages/edit-workout/edit-workout';
import { AddExercisePage } from '../pages/add-exercise/add-exercise';
import { ProgressPage } from '../pages/progress/progress';
import { SettingsPage } from '../pages/settings/settings';
import { ChooseExercisePage } from '../pages/choose-exercise/choose-exercise';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { GoogleChartsModule } from 'angular-google-charts';
import { FacebookOriginal, Facebook } from '@ionic-native/facebook'

declare  global { 

  

  type chooseExerciseSingle = {
    name: string
    path: string

  }

  type chooseExerciseList = {
    list: chooseExerciseSingle[]
  }

  type exercise = {
    name: string
    path: string
    repetitions:number
    sets: number
    rest: number
    weight: number
  }

  type workout = {
    day: string
    name: string
    exercises: exercise[]
  }

  type workouts = {
    workouts: workout[]
  }


}

export const firebaseConfig = {
  firebase: {
  // API KEY GOES HERE
  }
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CartPage,
    LoginPage,
    SignupPage, 
    WelcomePage,
    WorkoutCalanderPage,
    WorkoutPlannerPage,
    AddWorkoutPage,
    EditWorkoutPage,
    AddExercisePage,
    ProgressPage,
    SettingsPage,
    ChooseExercisePage,
    
    ],



  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig.firebase),
    AngularFirestoreModule, 
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    GoogleChartsModule,
    
    ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CartPage,
    LoginPage,
    SignupPage,
    WelcomePage,
    WorkoutCalanderPage,
    WorkoutPlannerPage,
    AddWorkoutPage,
    EditWorkoutPage,
    AddExercisePage,
    ProgressPage,
    SettingsPage,
    ChooseExercisePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
  
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}